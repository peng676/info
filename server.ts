import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
app.use(express.json({ limit: '20mb' }));

const root = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(root, 'public', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

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

app.use('/uploads', express.static(uploadsDir));

const port = Number(process.env.PORT || 3002);
app.listen(port, () => {
  console.log(`Upload server listening on http://localhost:${port}`);
});
