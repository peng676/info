import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ limit: '20mb' }));

const root = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(root, 'public', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('🔍 调试信息:');
console.log('- SUPABASE_URL 是否设置:', !!supabaseUrl);
console.log('- SUPABASE_SERVICE_ROLE_KEY 是否设置:', !!supabaseKey);
console.log('- URL:', supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : '未设置');

const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/api/upload/works/:idx', (req, res) => {
  try {
    const idx = Number(req.params.idx);
    const dataUrl: string = req.body?.dataUrl;
    if (!Number.isFinite(idx) || idx < 0) {
      return res.status(400).json({ ok: false, error: 'Invalid index' });
    }
    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ ok: false, error: 'Missing dataUrl' });
    }
    const match = /^data:(image\/(png|jpeg|jpg|webp));base64,(.+)$/.exec(dataUrl);
    if (!match) {
      return res.status(400).json({ ok: false, error: 'Invalid dataUrl format' });
    }
    const mime = match[1];
    const subtype = match[2];
    const b64 = match[3];
    const ext = subtype === 'jpeg' ? 'jpg' : subtype;

    const buffer = Buffer.from(b64, 'base64');
    const filename = `works-${idx}.${ext}`;
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);

    return res.json({ ok: true, path: `/uploads/${filename}`, mime });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

app.get('/api/ping', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/messages', async (_req, res) => {
  try {
    console.log('📥 收到获取留言请求');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ 环境变量未设置');
      return res.json({ 
        ok: false, 
        error: '环境变量未设置',
        fallback: [
          { id: 1, name: "设计同行", content: "喜欢这种粗野主义的风格，排版很大胆，学习了！", created_at: "2026-03-21" },
          { id: 2, name: "访客A", content: "网站设计得很酷，音乐也很好听~", created_at: "2026-03-22" }
        ]
      });
    }

    const { data, error } = await supabase
      .from('messages')
      .select('id, name, content, created_at')
      .order('created_at_full', { ascending: false });

    if (error) {
      console.error('❌ Supabase 查询错误:', error);
      return res.json({ 
        ok: false, 
        error: error.message,
        fallback: [
          { id: 1, name: "设计同行", content: "喜欢这种粗野主义的风格，排版很大胆，学习了！", created_at: "2026-03-21" },
          { id: 2, name: "访客A", content: "网站设计得很酷，音乐也很好听~", created_at: "2026-03-22" }
        ]
      });
    }

    console.log('✅ 查询成功，返回', data?.length, '条留言');
    res.json({ ok: true, data });
  } catch (error) {
    console.error('❌ 获取留言异常:', error);
    res.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : '未知错误',
      fallback: [
        { id: 1, name: "设计同行", content: "喜欢这种粗野主义的风格，排版很大胆，学习了！", created_at: "2026-03-21" },
        { id: 2, name: "访客A", content: "网站设计得很酷，音乐也很好听~", created_at: "2026-03-22" }
      ]
    });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { name, content } = req.body;

    if (!name || !name.trim() || !content || !content.trim()) {
      return res.status(400).json({ ok: false, error: 'Name and content are required' });
    }

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('messages')
      .insert([
        { name: name.trim(), content: content.trim(), created_at: today }
      ])
      .select('id, name, content, created_at');

    if (error) {
      console.error('Error creating message:', error);
      return res.status(500).json({ ok: false, error: 'Failed to create message' });
    }

    res.json({ ok: true, data: data[0] });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ ok: false, error: 'Failed to create message' });
  }
});

app.use('/uploads', express.static(uploadsDir));

const port = Number(process.env.PORT || 3002);

if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Upload server listening on http://localhost:${port}`);
  });
}

export default app;
