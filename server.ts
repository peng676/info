import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ limit: '20mb' }));

const root = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(root, 'public', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

let db: mysql.Connection | null = null;
let dbInitialized = false;

async function initDatabase() {
  if (dbInitialized) return;
  
  try {
    const tempDb = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD,
      charset: 'utf8mb4',
    });
    
    const dbName = process.env.MYSQL_DATABASE || 'guestbook';
    await tempDb.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await tempDb.end();
    
    db = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD,
      database: dbName,
      charset: 'utf8mb4',
    });
    console.log('✅ MySQL数据库连接成功');
    
    await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        content VARCHAR(500) NOT NULL,
        created_at DATE NOT NULL,
        created_at_full DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at DESC)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM messages');
    if ((rows as any)[0].count === 0) {
      await db.execute(`
        INSERT INTO messages (name, content, created_at) VALUES
        ('设计同行', '喜欢这种粗野主义的风格，排版很大胆，学习了！', '2026-03-21'),
        ('访客A', '网站设计得很酷，音乐也很好听~', '2026-03-22')
      `);
      console.log('✅ 初始化留言数据成功');
    }
    
    dbInitialized = true;
  } catch (error) {
    console.error('❌ MySQL数据库连接失败:', error);
    db = null;
  }
}

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
    await initDatabase();
    
    if (!db) {
      return res.json({ 
        ok: false, 
        fallback: [
          { id: 1, name: "设计同行", content: "喜欢这种粗野主义的风格，排版很大胆，学习了！", created_at: "2026-03-21" },
          { id: 2, name: "访客A", content: "网站设计得很酷，音乐也很好听~", created_at: "2026-03-22" }
        ]
      });
    }
    
    const [rows] = await db.execute('SELECT id, name, content, created_at FROM messages ORDER BY created_at_full DESC');
    res.json({ ok: true, data: rows });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.json({ 
      ok: false, 
      fallback: [
        { id: 1, name: "设计同行", content: "喜欢这种粗野主义的风格，排版很大胆，学习了！", created_at: "2026-03-21" },
        { id: 2, name: "访客A", content: "网站设计得很酷，音乐也很好听~", created_at: "2026-03-22" }
      ]
    });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    await initDatabase();
    
    if (!db) {
      return res.status(500).json({ ok: false, error: 'Database not connected' });
    }
    
    const { name, content } = req.body;
    
    if (!name || !name.trim() || !content || !content.trim()) {
      return res.status(400).json({ ok: false, error: 'Name and content are required' });
    }
    
    const today = new Date().toISOString().split('T')[0];
    const [result] = await db.execute(
      'INSERT INTO messages (name, content, created_at) VALUES (?, ?, ?)',
      [name.trim(), content.trim(), today]
    );
    
    const insertResult = result as any;
    const [newMessage] = await db.execute(
      'SELECT id, name, content, created_at FROM messages WHERE id = ?',
      [insertResult.insertId]
    );
    
    res.json({ ok: true, data: (newMessage as any)[0] });
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
