import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();
const SUBJEK = ['Informasi Umum', 'Pendaftaran Siswa Baru', 'Akademik', 'Kerja Sama', 'Saran dan Masukan', 'Lainnya'];

router.post('/', async (req, res) => {
  try {
    const nama = req.body.nama?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const subjek = req.body.subjek;
    const pesan = req.body.pesan?.trim();

    if (!nama || !email || !subjek || !pesan)
      return res.status(400).json({ pesan: 'Isi semua kolom yang bertanda bintang.' });
    if (!/^\S+@\S+\.\S+$/.test(email) || !SUBJEK.includes(subjek))
      return res.status(400).json({ pesan: 'Data yang dikirim tidak valid.' });
    if (nama.length > 100 || email.length > 100 || pesan.length > 2000)
      return res.status(400).json({ pesan: 'Teks terlalu panjang.' });

    await pool.query(
      'INSERT INTO pesan_kontak (nama, email, subjek, pesan) VALUES (?,?,?,?)',
      [nama, email, subjek, pesan]
    );
    res.status(201).json({ pesan: 'Pesan terkirim. Kami akan membalas secepatnya.' });
  } catch (err) {
    console.error('ERROR /kontak:', err);
    res.status(500).json({ pesan: 'Pesan gagal dikirim. Coba lagi nanti.' });
  }
});

export default router;