// cli/migrate.js
import fs from 'fs';
import path from 'path';
import db from '../server/db.js';

const __dirname = path.resolve();

async function runMigrations() {
  const sqlDir = path.join(__dirname, 'cli', 'sql');
  const files = fs
    .readdirSync(sqlDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const filePath = path.join(sqlDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    try {
      console.log(`🛠  ${file} çalıştırılıyor...`);
      await db.execute(sql);
      console.log(`✅  ${file} tamamlandı.`);
    } catch (err) {
      console.error(`❌ Hata: ${file}`, err.message);
    }
  }

  process.exit(0);
}

runMigrations();
