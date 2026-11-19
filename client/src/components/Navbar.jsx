import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Home, Landmark, BookOpen, Folder, MapPin, Newspaper, Phone, Search, User, Lock,
  ChevronDown, Menu, X,
} from 'lucide-react';
import { useAuth } from '../auth.jsx';
import logo from '../assets/logo.jpeg';
import './Navbar.css';

// Di bawah lebar ini menu berubah menjadi hamburger (samakan dengan Navbar.css)
const BATAS_HAMBURGER = 1360;

const menu = [
  { to: '/', label: 'Beranda', Icon: Home, end: true },
  {
    to: '/profil', label: 'Profil', Icon: Landmark,
    anak: [
      { to: '/profil', label: 'Profil Sekolah', end: true },
      { to: '/profil/VisiMisi', label: 'Visi & Misi' },
      { to: '/profil/Struktur', label: 'Struktur Organisasi' },
      { to: '/profil/Sarana', label: 'Sarana & Prasarana' },
      { to: '/profil/Sejarah', label: 'Sejarah' },
    ],
  },
  // Akademik: link biasa (tujuan ditentukan oleh peran, lihat App.jsx)
  { to: '/akademik', label: 'Akademik', Icon: BookOpen, kunci: true },
  {
    to: '/dokumen', label: 'Dokumen', Icon: Folder, kunci: true,
    anak: [
      { to: '/dokumen', label: 'Semua Dokumen', end: true },
      { to: '/dokumen/akademik', label: 'Akademik' },
      { to: '/dokumen/peserta-didik', label: 'Peserta Didik' },
      { to: '/dokumen/akreditasi', label: 'Akreditasi' },
      { to: '/dokumen/surat', label: 'Surat' },
    ],
  },
  { to: '/informasi', label: 'Informasi', Icon: MapPin },
  { to: '/berita', label: 'Berita', Icon: Newspaper },
  { to: '/kontak', label: 'Kontak', Icon: Phone },
];

const bisaHover = () => window.matchMedia('(hover: hover)').matches;

function Dropdown({ item }) {
  const [buka, setBuka] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const { Icon } = item;
  const aktif = pathname.startsWith(item.to);

  // tutup dropdown setiap pindah halaman
  useEffect(() => {
    setBuka(false);
  }, [pathname]);

  useEffect(() => {
    const klikLuar = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setBuka(false);
    };
    const esc = (e) => {
      if (e.key === 'Escape') setBuka(false);
    };
    document.addEventListener('mousedown', klikLuar);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', klikLuar);
      document.removeEventListener('keydown', esc);
    };
  }, []);

  return (
    <div
      className="dd"
      ref={ref}
      onMouseEnter={() => bisaHover() && setBuka(true)}
      onMouseLeave={() => bisaHover() && setBuka(false)}
    >
      <button
        type="button"
        className={'menu-item' + (aktif ? ' aktif' : '')}
        aria-haspopup="true"
        aria-expanded={buka}
        onClick={() => setBuka((b) => (bisaHover() ? true : !b))}
      >
        <Icon size={16} />
        {item.label}
        <ChevronDown size={14} className={'dd-panah' + (buka ? ' buka' : '')} />
      </button>

      {buka && (
        <ul className="dd-daftar">
          {item.anak.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={({ isActive }) => (isActive ? 'aktif' : '')}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const { user, keluar } = useAuth();
  const [panelBuka, setPanelBuka] = useState(false);
  const { pathname } = useLocation();

  // tutup panel setiap pindah halaman
  useEffect(() => {
    setPanelBuka(false);
  }, [pathname]);

  // saat panel terbuka: kunci scroll halaman, Esc menutup, layar lebar menutup otomatis
  useEffect(() => {
    if (!panelBuka) return undefined;

    const esc = (e) => {
      if (e.key === 'Escape') setPanelBuka(false);
    };
    const ukuran = () => {
      if (window.innerWidth >= BATAS_HAMBURGER) setPanelBuka(false);
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', esc);
    window.addEventListener('resize', ukuran);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.removeEventListener('keydown', esc);
      window.removeEventListener('resize', ukuran);
    };
  }, [panelBuka]);

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <img src={logo} alt="Logo SMAS Al-Birru" />
        <span>SMAS AL-BIRRU Parepare</span>
      </Link>

      <button
        type="button"
        className="hamburger"
        aria-label="Buka menu"
        aria-expanded={panelBuka}
        onClick={() => setPanelBuka(true)}
      >
        <Menu size={26} />
      </button>

      {/* latar gelap di belakang panel samping (hanya layar kecil) */}
      {panelBuka && (
        <div className="panel-latar" onClick={() => setPanelBuka(false)} aria-hidden="true" />
      )}

      <div className={'panel' + (panelBuka ? ' buka' : '')}>
        {/* kepala panel: hanya tampil di layar kecil */}
        <div className="panel-kepala">
          <span>Menu</span>
          <button
            type="button"
            className="panel-tutup"
            aria-label="Tutup menu"
            onClick={() => setPanelBuka(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="menu" aria-label="Menu utama">
          {menu.map((item) => {
            // Menu terkunci + belum login: tombol bergembok menuju halaman pilih peran
            if (item.kunci && !user) {
              return (
                <Link
                  key={item.to}
                  to="/akses"
                  state={{ dari: item.to }}
                  className={'menu-item' + (pathname.startsWith(item.to) ? ' aktif' : '')}
                >
                  <item.Icon size={16} />
                  {item.label}
                  <Lock size={12} className="gembok" />
                </Link>
              );
            }

            // Menu dengan submenu (Profil, atau Dokumen setelah login)
            if (item.anak) {
              return <Dropdown key={item.to} item={item} />;
            }

            // Menu biasa (termasuk Akademik setelah login)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => 'menu-item' + (isActive ? ' aktif' : '')}
              >
                <item.Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <label className="cari">
          <Search size={16} />
          <input type="search" placeholder="Cari informasi..." aria-label="Cari informasi" />
        </label>

        <div className="aksi">
          {user ? (
            <button className="btn btn-isi" onClick={keluar}><User size={16} /> Keluar</button>
          ) : (
            <>
              <Link to="/daftar" className="btn btn-garis"><User size={16} /> Daftar</Link>
              <Link to="/login" className="btn btn-isi"><User size={16} /> Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}