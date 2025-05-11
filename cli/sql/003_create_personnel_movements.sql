CREATE TABLE IF NOT EXISTS personnel_movements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personnel_id INT NOT NULL,
  type ENUM('giriş', 'çıkış') NOT NULL,
  date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
