import { put } from '@vercel/blob';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }
  const idx = Number(req.query.idx);
  const dataUrl: string = req.body?.dataUrl;
  if (!Number.isFinite(idx) || idx < 0) {
    res.status(400).json({ ok: false, error: 'Invalid index' });
    return;
  }
  if (!dataUrl || typeof dataUrl !== 'string') {
    res.status(400).json({ ok: false, error: 'Missing dataUrl' });
    return;
  }
  const match = /^data:(image\/(png|jpeg|jpg|webp));base64,(.+)$/.exec(dataUrl);
  if (!match) {
    res.status(400).json({ ok: false, error: 'Invalid dataUrl format' });
    return;
  }
  const mime = match[1];
  const subtype = match[2];
  const b64 = match[3];
  const ext = subtype === 'jpeg' ? 'jpg' : subtype;
  const buffer = Buffer.from(b64, 'base64');
  const filename = `works-${idx}-${Date.now()}.${ext}`;
  try {
    const blob = await put(`uploads/${filename}`, buffer, {
      access: 'public',
      contentType: mime,
    });
    res.status(200).json({ ok: true, path: blob.url, mime });
  } catch (e) {
    res.status(500).json({ ok: false, error: 'Upload failed' });
  }
}

