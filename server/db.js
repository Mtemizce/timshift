// server/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '127.0.0.1',         // veya 'localhost' yerine 'host.docker.internal'
  port: 3307,  
  user: 'root',           // kendi kullanıcı adını yaz
  password: 'rootpassword',           // kendi şifreni yaz
  database: 'tim_shift',  // veritabanı adını sen belirle
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
