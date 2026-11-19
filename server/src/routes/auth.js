import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const router = Router();

router.post('/daftar', async (req, res) => {
  try {
    const nama = req.body.nama?.trim();
    const nis_niy = req.body.nis_niy?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const no_hp = req.body.no_hp?.trim();
    const { password } = req.body;

    if (!nama || !nis_niy || !email || !no_hp || !password || password.length < 6)
      return res.status(400).json({ pesan: 'Isi semua kolom. Password minimal 6 karakter.' });

    const [ada] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR nis_niy = ?',
      [email, nis_niy]
    );
    if (ada.length)
      return res.status(409).json({ pesan: 'Email atau NIS/NIY sudah terdaftar.' });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (nama, nis_niy, email, no_hp, password_hash) VALUES (?,?,?,?,?)',
      [nama, nis_niy, email, no_hp, hash]
    );
    res.status(201).json({
      pesan: 'Pendaftaran berhasil. Akun Anda menunggu persetujuan admin sekolah.',
    });
  } catch (err) {
    console.error('ERROR /daftar:', err);
    res.status(500).json({ pesan: 'Kesalahan server: ' + err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const akun = req.body.akun?.trim().toLowerCase();
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR nis_niy = ?',
      [akun, akun]
    );
    const u = rows[0];

    if (!u || !(await bcrypt.compare(req.body.password || '', u.password_hash)))
      return res.status(401).json({ pesan: 'NIS/NIY/email atau password salah.' });

    if (u.status !== 'aktif')
      return res.status(403).json({
        pesan:
          u.status === 'menunggu'
            ? 'Akun Anda belum disetujui admin sekolah.'
            : 'Akun Anda dinonaktifkan.',
      });

    await pool.query('UPDATE users SET terakhir_login = NOW() WHERE id = ?', [u.id]);
    const token = jwt.sign(
      { id: u.id, nama: u.nama, role: u.role },
      process.env.JWT_SECRET,
      { expiresIn: req.body.ingat ? '30d' : '8h' }
    );
    res.json({ token, user: { id: u.id, nama: u.nama, role: u.role } });
  } catch (err) {
    console.error('ERROR /login:', err);
    res.status(500).json({ pesan: 'Kesalahan server: ' + err.message });
  }
});

export default router;