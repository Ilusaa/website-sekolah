import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Home, ChevronRight, ChevronLeft, Calendar, Eye, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../auth.jsx';
import FormBerita from '../components/FormBerita.jsx';
import { useBerita, hapusBerita, tambahDilihat, tgl, warna } from '../beritaStore.js';
import { Gambarnya } from './Berita.jsx';
import './Berita.css';

export default function BeritaDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const admin = user?.role === 'admin';
  const nav = useNavigate();
  const b = useBerita().find((x) => String(x.id) === id);
  const [ubah, setUbah] = useState(false);
  const sudah = useRef(false);

  useEffect(() => {
    if (b && !sudah.current) { sudah.current = true; tambahDilihat(b.id); }
  }, [b]);

  if (!b) {
    return (
      <div className="br"><div className="br-wrap">
        <p className="br-kosong">Berita tidak ditemukan. <Link to="/berita">Kembali ke daftar berita</Link></p>
      </div></div>
    );
  }

  return (
    <div className="br">
      <div className="br-wrap br-sempit">
        <nav className="br-remah" aria-label="Breadcrumb">
          <Home size={16} /><Link to="/">Beranda</Link><ChevronRight size={14} /><Link to="/berita">Berita</Link>
          <ChevronRight size={14} /><strong>{b.kategori}</strong>
        </nav>
        <article className="br-kartu br-artikel">
          <span className={`br-lencana statis ${warna(b.kategori)}`}>{b.kategori}</span>
          <h1>{b.judul}</h1>
          <div className="br-meta">
            <span><Calendar size={14} /> {tgl(b.tanggal)}</span>
            <span><Eye size={14} /> {b.dilihat} Dilihat</span>
          </div>
          <Gambarnya b={b} kelas="besar" />
          <div className="br-teks">{b.isi.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)}</div>
          <div className="br-bawah">
            <Link to="/berita" className="br-kembali"><ChevronLeft size={16} /> Kembali ke berita</Link>
            {admin && (
              <span className="br-admin tetap">
                <button onClick={() => setUbah(true)}><Pencil size={15} /> Ubah</button>
                <button className="hapus" onClick={() => { if (window.confirm('Hapus berita ini?')) { hapusBerita(b.id); nav('/berita'); } }}><Trash2 size={15} /> Hapus</button>
              </span>
            )}
          </div>
        </article>
      </div>
      {ubah && <FormBerita berita={b} tutup={() => setUbah(false)} />}
    </div>
  );
}