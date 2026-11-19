import { Router } from 'express';
import { pool } from '../db.js';
import { wajibLogin, wajibAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const [rows] = await pool.query('SELECT id, judul, LEFT(isi, 200) AS ringkas, gambar, created_at FROM berita ORDER BY created_at DESC LIMIT 20');
  res.json(rows);
});

router.post('/', wajibLogin, wajibAdmin, async (req, res) => {
  const { judul, isi, gambar } = req.body;
  if (!judul || !isi) return res.status(400).json({ pesan: 'Judul dan isi wajib diisi.' });
  await pool.query('INSERT INTO berita (judul, isi, gambar) VALUES (?,?,?)', [judul, isi, gambar || null]);
  res.status(201).json({ pesan: 'Berita dipublikasikan.' });
});

export default router;
