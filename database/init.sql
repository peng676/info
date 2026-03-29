CREATE DATABASE IF NOT EXISTS guestbook DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE guestbook;

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    content VARCHAR(500) NOT NULL,
    created_at DATE NOT NULL,
    created_at_full DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO messages (name, content, created_at) VALUES
('设计同行', '喜欢这种粗野主义的风格，排版很大胆，学习了！', '2026-03-21'),
('访客A', '网站设计得很酷，音乐也很好听~', '2026-03-22');
