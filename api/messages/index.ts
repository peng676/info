import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

let db: mysql.Connection | null = null;

async function initDatabase() {
  if (db) return db;
  
  try {
    db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      charset: 'utf8mb4',
      ssl: {
        rejectUnauthorized: true,
      },
    });
    
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
    
    return db;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const connection = await initDatabase();
      const [rows] = await connection.execute(
        'SELECT id, name, content, created_at FROM messages ORDER BY created_at_full DESC'
      );
      return res.json({ ok: true, data: rows });
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ 
        ok: false, 
        error: 'Failed to fetch messages',
        fallback: [
          { id: 1, name: "设计同行", content: "喜欢这种粗野主义的风格，排版很大胆，学习了！", created_at: "2026-03-21" },
          { id: 2, name: "访客A", content: "网站设计得很酷，音乐也很好听~", created_at: "2026-03-22" }
        ]
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, content } = req.body;
      
      if (!name || !name.trim() || !content || !content.trim()) {
        return res.status(400).json({ ok: false, error: 'Name and content are required' });
      }

      const connection = await initDatabase();
      const today = new Date().toISOString().split('T')[0];
      
      const [result] = await connection.execute(
        'INSERT INTO messages (name, content, created_at) VALUES (?, ?, ?)',
        [name.trim(), content.trim(), today]
      );
      
      const insertResult = result as any;
      const [newMessage] = await connection.execute(
        'SELECT id, name, content, created_at FROM messages WHERE id = ?',
        [insertResult.insertId]
      );
      
      return res.json({ ok: true, data: (newMessage as any)[0] });
    } catch (error) {
      console.error('Error creating message:', error);
      return res.status(500).json({ ok: false, error: 'Failed to create message' });
    }
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
