import { Router } from 'express';
import { pool } from '../db.js';
import { wajibLogin, wajibAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM lokasi');
  res.json(rows);
});

router.put('/:id', wajibLogin, wajibAdmin, async (req, res) => {
  const { nama, alamat, latitude, longitude, keterangan } = req.body;
  if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180)
    return res.status(400).json({ pesan: 'Koordinat tidak valid.' });
  await pool.query(
    'UPDATE lokasi SET nama=?, alamat=?, latitude=?, longitude=?, keterangan=? WHERE id=?',
    [nama, alamat, latitude, longitude, keterangan, req.params.id]
  );
  res.json({ pesan: 'Lokasi diperbarui.' });
});

export default router;
