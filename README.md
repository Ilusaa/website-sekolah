# Website SMAS AL-BIRRU Parepare

React (Vite) + Express (Node.js) + MySQL. Peta memakai Leaflet + OpenStreetMap (gratis, tanpa API key).

## Persiapan
Butuh Node.js 18+ dan MySQL 8.

1. Database: `mysql -u root -p < server/sql/schema.sql`
2. Backend:
   ```
   cd server
   cp .env.example .env      # isi password DB dan JWT_SECRET (teks acak panjang)
   npm install
   npm run dev
   node src/buatAdmin.js "Nama Admin" admin@email.com PasswordKuat123
   ```
3. Frontend (terminal lain):
   ```
   cd client
   npm install
   npm run dev               # buka http://localhost:5173
   ```

## Mengubah titik peta
Koordinat awal di `schema.sql` hanya sementara. Isi titik sekolah yang tepat dengan
klik kanan lokasi sekolah di Google Maps (koordinat akan tersalin), lalu:
```
UPDATE lokasi SET latitude=-4.xxxxxx, longitude=119.xxxxxx WHERE id=1;
```

## Rilis
`cd client && npm run build` menghasilkan folder `dist` (file statis). Jalankan backend dengan
`npm start` (disarankan memakai pm2) di belakang Nginx + HTTPS. Backup database rutin dengan `mysqldump`.

## Status
Selesai: Beranda sesuai desain, navbar (gembok Akademik/Dokumen sebelum login), login/daftar (JWT, bcrypt),
Informasi dengan peta, API berita dan lokasi.
Belum: halaman Profil, Berita, Kontak, Akademik, Dokumen, dan panel admin.
