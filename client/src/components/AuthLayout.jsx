import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.jpeg';
import './AuthLayout.css';

// Kerangka halaman Daftar & Login: logo, kolom kiri (teks), kartu putih (formulir), footer
export default function AuthLayout({ kiri, children }) {
  return (
    <div className="au">
      <header className="au-brand">
        <Link to="/" aria-label="Kembali ke beranda">
          <img src={logo} alt="" />
          <span><strong>SMAS AL-BIRRU</strong>Parepare</span>
        </Link>
      </header>

      <div className="au-isi">
        <section className="au-kiri">{kiri}</section>
        <section className="au-kartu">{children}</section>
      </div>

      <footer className="au-kaki">
        <Leaf size={18} /> Berilmu • Berakhlak • Berprestasi
      </footer>
    </div>
  );
}

// Satu kolom formulir: label berikon + kotak isian berikon (+ tombol lihat/sembunyikan password)
export function Kolom({ id, label, Icon, toggle = false, type = 'text', ...sisa }) {
  const [lihat, setLihat] = useState(false);
  return (
    <div className="au-kolom">
      <label htmlFor={id}><Icon size={14} /> {label}</label>
      <div className="au-input">
        <Icon size={18} className="au-ikon" aria-hidden="true" />
        <input id={id} name={id} type={toggle ? (lihat ? 'text' : 'password') : type} {...sisa} />
        {toggle && (
          <button
            type="button"
            className="au-mata"
            onClick={() => setLihat(!lihat)}
            aria-label={lihat ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            {lihat ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}