// Pemakaian: node src/buatAdmin.js "Nama Admin" admin@sekolah.sch.id PasswordKuat123
import bcrypt from 'bcryptjs';
import { pool } from './db.js';

const [nama, email, password] = process.argv.slice(2);
if (!nama || !email || !password || password.length < 8) {
  console.log('Pemakaian: node src/buatAdmin.js "Nama" email password(min 8 karakter)');
  process.exit(1);
}
const hash = await bcrypt.hash(password, 10);
await pool.query("INSERT INTO users (nama, email, password_hash, role) VALUES (?,?,?,'admin')", [nama, email, hash]);
console.log('Admin dibuat:', email);
process.exit(0);
