// cli/make-admin.js
import readline from 'readline';
import bcrypt from 'bcrypt';
import db from '../server/db.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(q) {
  return new Promise(resolve => rl.question(q, resolve));
}

async function main() {
  try {
    const name = await question('Ad Soyad: ');
    const username = await question('Kullanıcı adı: ');
    const email = await question('E-posta (opsiyonel): ');
    const password = await question('Şifre: ');

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO admins (name, username, email, password) VALUES (?, ?, ?, ?)`,
      [name, username, email, hashedPassword]
    );

    console.log(`✅ Yönetici başarıyla oluşturuldu (ID: ${result.insertId})`);
  } catch (err) {
    console.error('❌ Hata:', err);
  } finally {
    rl.close();
    process.exit(0);
  }
}

main();
