CREATE TABLE IF NOT EXISTS personnel_leave_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personnel_id INT NOT NULL,
  leave_type_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  used_days INT NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
