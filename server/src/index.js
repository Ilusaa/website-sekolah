import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import lokasiRoutes from './routes/lokasi.js';
import beritaRoutes from './routes/berita.js';
import kontakRoutes from './routes/Kontak.js';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

// Batasi percobaan login/daftar agar tidak mudah ditebak
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 30 }), authRoutes);
app.use('/api/lokasi', lokasiRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/Kontak', kontakRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ pesan: 'Terjadi kesalahan pada server.' });
});

app.listen(process.env.PORT || 5000, () => console.log('Server berjalan'));