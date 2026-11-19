import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Beranda from './pages/Beranda.jsx';
import Informasi from './pages/Informasi.jsx';
import Login from './pages/Login.jsx';
import Daftar from './pages/Daftar.jsx';
import Segera from './pages/Segera.jsx';

import GuruTendik from './pages/Gurutendik.jsx';
import GuruProfil from './pages/GuruProfil.jsx';
import Siswa from './pages/Siswa.jsx';

import Dokumen from './pages/Dokumen.jsx';
import Berita from './pages/Berita.jsx';
import BeritaDetail from './pages/BeritaDetail.jsx';
import Kontak from './pages/Kontak.jsx';

import PilihPeran from './pages/PilihPeran.jsx';
import ProfilLayout from './pages/profil/ProfilLayout.jsx';
import ProfilSekolah from './pages/profil/ProfilSekolah.jsx';
import VisiMisi from './pages/profil/VisiMisi.jsx';
import Struktur from './pages/profil/Struktur.jsx';
import Sarana from './pages/profil/Sarana.jsx';
import Sejarah from './pages/profil/Sejarah.jsx';
import { useAuth } from './auth.jsx';

// Halaman terkunci: pengunjung yang belum login diminta memilih peran dulu
function Terkunci({ children }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  return user ? children : <Navigate to="/akses" state={{ dari: pathname }} replace />;
}

// /akademik: arahkan sesuai peran (siswa -> halaman siswa, lainnya -> halaman guru)
function AkademikArah() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  if (!user) return <Navigate to="/akses" state={{ dari: pathname }} replace />;
  // sesuaikan nama field jika di auth.jsx bukan "peran"
  const tujuan = user.peran === 'siswa' ? '/akademik/siswa' : '/akademik/guru';
  return <Navigate to={tujuan} replace />;
}

export default function App() {
  const { pathname } = useLocation();
  const layarPenuh = pathname === '/login' || pathname === '/daftar';

  return (
    <div className="app">
      {!layarPenuh && <Navbar />}
      <main>
        <Routes>
          {/* Halaman publik */}
          <Route path="/" element={<Beranda />} />
          <Route path="/informasi" element={<Informasi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/akses" element={<PilihPeran />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<BeritaDetail />} />
          <Route path="/kontak" element={<Kontak />} />

          {/* Profil: ProfilLayout membungkus lima halaman lewat <Outlet /> */}
          <Route path="/profil" element={<ProfilLayout />}>
            <Route index element={<ProfilSekolah />} />
            <Route path="VisiMisi" element={<VisiMisi />} />
            <Route path="Struktur" element={<Struktur />} />
            <Route path="Sarana" element={<Sarana />} />
            <Route path="Sejarah" element={<Sejarah />} />
          </Route>

          {/* Akademik (wajib login) */}
          <Route path="/akademik" element={<AkademikArah />} />
          <Route path="/akademik/guru" element={<Terkunci><GuruTendik /></Terkunci>} />
          <Route path="/akademik/guru/:id" element={<Terkunci><GuruProfil /></Terkunci>} />
          <Route path="/akademik/siswa" element={<Terkunci><Siswa /></Terkunci>} />

          {/* Dokumen (wajib login) */}
          <Route path="/dokumen" element={<Terkunci><Dokumen /></Terkunci>} />
          <Route path="/dokumen/akademik" element={<Terkunci><Dokumen kategori="akademik" /></Terkunci>} />
          <Route path="/dokumen/peserta-didik" element={<Terkunci><Dokumen kategori="peserta-didik" /></Terkunci>} />
          <Route path="/dokumen/akreditasi" element={<Terkunci><Dokumen kategori="akreditasi" /></Terkunci>} />
          <Route path="/dokumen/surat" element={<Terkunci><Dokumen kategori="surat" /></Terkunci>} />

          <Route path="*" element={<Segera judul="Halaman tidak ditemukan" />} />
        </Routes>
      </main>
      {!layarPenuh && <Footer />}
    </div>
  );
}