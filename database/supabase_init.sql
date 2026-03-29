-- Supabase 数据库初始化脚本
-- 在 Supabase Dashboard 的 SQL Editor 中执行此脚本

-- 创建 messages 表
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  content VARCHAR(500) NOT NULL,
  created_at DATE NOT NULL,
  created_at_full TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以优化查询
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- 插入示例数据（可选）
INSERT INTO messages (name, content, created_at) 
VALUES 
  ('设计同行', '喜欢这种粗野主义的风格，排版很大胆，学习了！', CURRENT_DATE),
  ('访客A', '网站设计得很酷，音乐也很好听~', CURRENT_DATE)
ON CONFLICT DO NOTHING;

-- 启用行级安全策略（RLS）- 允许公开读取和写入
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 创建允许公开读取的策略
CREATE POLICY "允许公开读取" ON messages
  FOR SELECT USING (true);

-- 创建允许公开写入的策略
CREATE POLICY "允许公开写入" ON messages
  FOR INSERT WITH CHECK (true);
