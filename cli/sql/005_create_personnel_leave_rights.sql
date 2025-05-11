CREATE TABLE IF NOT EXISTS personnel_leave_rights (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personnel_id INT NOT NULL,
  leave_type_id INT NOT NULL,
  year INT NOT NULL,
  entitled_days INT NOT NULL,
  source ENUM('manuel', 'hakediş', 'mesai') DEFAULT 'manuel',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
