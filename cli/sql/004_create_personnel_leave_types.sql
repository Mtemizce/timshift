CREATE TABLE IF NOT EXISTS personnel_leave_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  default_days INT
);
