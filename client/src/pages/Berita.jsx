import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, ChevronRight, ChevronLeft, Newspaper, Search, Calendar, Eye, ArrowRight, Megaphone, Bell, Send,
  Plus, Pencil, Trash2, Image as Gambar,
} from 'lucide-react';
import { useAuth } from '../auth.jsx';
import FormBerita from '../components/FormBerita.jsx';
import { useBerita, hapusBerita, KATEGORI, tgl, warna } from '../beritaStore.js';
import './Berita.css';

const PER_HALAMAN = 6;

export function Gambarnya({ b, kelas = '' }) {
  return b.gambar
    ? <img className={`br-gambar ${kelas}`} src={b.gambar} alt="" loading="lazy" />
    : <div className={`br-gambar kosong ${warna(b.kategori)} ${kelas}`}><Gambar size={34} /></div>;
}

export default function Berita() {
  const { user } = useAuth();
  const admin = user?.role === 'admin';
  const semua = useBerita();
  const [tab, setTab] = useState('Semua');
  const [cari, setCari] = useState('');
  const [hal, setHal] = useState(1);
  const [form, setForm] = useState(null); // null = tutup, {} = baru, objek = ubah
  const [email, setEmail] = useState('');
  const [langganan, setLangganan] = useState('');

  const urut = useMemo(() => [...semua].sort((a, b) => b.tanggal.localeCompare(a.tanggal) || b.id - a.id), [semua]);
  const daftar = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return urut.filter((b) => (tab === 'Semua' || b.kategori === tab) && (!q || b.judul.toLowerCase().includes(q)));
  }, [urut, tab, cari]);

  const jumlahHal = Math.max(1, Math.ceil(daftar.length / PER_HALAMAN));
  const halAktif = Math.min(hal, jumlahHal);
  const tampil = daftar.slice((halAktif - 1) * PER_HALAMAN, halAktif * PER_HALAMAN);

  function hapus(b) { if (window.confirm(`Hapus berita "${b.judul}"?`)) hapusBerita(b.id); }
  function kirimLangganan(e) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setLangganan('Masukkan email yang valid.');
    setLangganan('Terima kasih! Email Anda sudah tercatat.'); setEmail('');
  }

  return (
    <div className="br">
      <div className="br-wrap">
        <nav className="br-remah" aria-label="Breadcrumb">
          <Home size={16} /><Link to="/">Beranda</Link><ChevronRight size={14} /><strong>Berita</strong>
        </nav>
        <header className="br-judul">
          <div className="br-lingkar"><Newspaper size={44} /></div>
          <div><h1>Berita</h1><p>Informasi terbaru seputar kegiatan dan perkembangan di SMAS AL-BIRRU, Parepare.</p></div>
        </header>

        <section className="br-kartu">
          <div className="br-alat">
            <div className="br-tab" role="tablist">
              {['Semua', ...KATEGORI].map((k) => (
                <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'aktif' : ''}
                        onClick={() => { setTab(k); setHal(1); }}>{k}</button>
              ))}
            </div>
            <label className="br-cari">
              <Search size={18} />
              <input type="search" value={cari} onChange={(e) => { setCari(e.target.value); setHal(1); }} placeholder="Cari berita..." />
            </label>
            {admin && <button className="br-tulis" onClick={() => setForm({})}><Plus size={18} /> Tulis Berita</button>}
          </div>

          <div className="br-isi">
            <div>
              {tampil.length === 0 ? (
                <p className="br-kosong">Belum ada berita yang cocok. Coba kata kunci atau kategori lain.</p>
              ) : (
                <div className="br-grid">
                  {tampil.map((b) => (
                    <article className="br-item" key={b.id}>
                      <Link to={`/berita/${b.id}`} className="br-gambarwrap" aria-label={b.judul}>
                        <Gambarnya b={b} />
                        <span className={`br-lencana ${warna(b.kategori)}`}>{b.kategori}</span>
                      </Link>
                      <h2><Link to={`/berita/${b.id}`}>{b.judul}</Link></h2>
                      <div className="br-meta">
                        <span><Calendar size={14} /> {tgl(b.tanggal)}</span>
                        <span><Eye size={14} /> {b.dilihat} Dilihat</span>
                        <Link to={`/berita/${b.id}`} className="br-panah" aria-label="Baca selengkapnya"><ArrowRight size={16} /></Link>
                      </div>
                      {admin && (
                        <div className="br-admin">
                          <button onClick={() => setForm(b)} aria-label={`Ubah ${b.judul}`}><Pencil size={15} /></button>
                          <button className="hapus" onClick={() => hapus(b)} aria-label={`Hapus ${b.judul}`}><Trash2 size={15} /></button>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}

              <div className="br-halaman">
                <button aria-label="Sebelumnya" disabled={halAktif === 1} onClick={() => setHal(halAktif - 1)}><ChevronLeft size={16} /></button>
                {Array.from({ length: jumlahHal }, (_, i) => i + 1).map((n) => (
                  <button key={n} className={n === halAktif ? 'aktif' : ''} aria-current={n === halAktif ? 'page' : undefined} onClick={() => setHal(n)}>{n}</button>
                ))}
                <button aria-label="Berikutnya" disabled={halAktif === jumlahHal} onClick={() => setHal(halAktif + 1)}><ChevronRight size={16} /></button>
              </div>
            </div>

            <aside className="br-samping">
              <section className="br-terbaru">
                <h3><Megaphone size={20} /> Berita Terbaru</h3>
                <ul>
                  {urut.slice(0, 4).map((b) => (
                    <li key={b.id}>
                      <Link to={`/berita/${b.id}`}>
                        <Gambarnya b={b} kelas="kecil" />
                        <span><b>{b.judul}</b><small><Calendar size={12} /> {tgl(b.tanggal)}</small></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="br-langgan">
                <h3><Bell size={18} /> Langganan Berita</h3>
                <p>Dapatkan informasi terbaru langsung ke email Anda.</p>
                <form onSubmit={kirimLangganan}>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email..." aria-label="Email langganan" />
                  <button aria-label="Berlangganan"><Send size={16} /></button>
                </form>
                {langganan && <small role="status">{langganan}</small>}
              </section>
            </aside>
          </div>
        </section>
      </div>
      {form && <FormBerita berita={form.id ? form : null} tutup={() => setForm(null)} />}
    </div>
  );
}