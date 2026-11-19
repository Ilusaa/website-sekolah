import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Landmark, UserRound, Users, Building2, Search, ArrowRight, ChevronRight } from 'lucide-react';
import { ambilGuru, inisial } from './DataAkademik';
import './Akademik.css';
import './Akademik-tambahan.css';

const TAB = [
  { kunci: 'Semua', Icon: Landmark },
  { kunci: 'Guru', Icon: UserRound },
  { kunci: 'Tenaga Kependidikan', Icon: Users },
  { kunci: 'Struktural', Icon: Building2 },
];

// Label tunggal di kartu: Kepala Sekolah, Tenaga Kependidikan, atau Guru
const jenis = (d) =>
  d.jabatan.includes('Kepala Sekolah') ? 'Kepala Sekolah'
  : d.kategori === 'Tenaga Kependidikan' ? 'Tenaga Kependidikan'
  : 'Guru';

export default function GuruTendik() {
  const [tab, setTab] = useState('Semua');
  const [cari, setCari] = useState('');
  const [jabatan, setJabatan] = useState('');

  // Data diambil dari DataAkademik.js (sudah termasuk hasil edit dari halaman profil)
  const DATA = useMemo(() => ambilGuru(), []);

  const daftarJabatan = useMemo(
    () => [...new Set(DATA.flatMap((d) => d.jabatan))].sort((a, b) => a.localeCompare(b)),
    [DATA]
  );
  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return DATA.filter((d) =>
      (tab === 'Semua' || d.kategori === tab) &&
      (!jabatan || d.jabatan.includes(jabatan)) &&
      (!q || [d.nama, ...d.jabatan, d.mapel, d.niy, d.status].some((t) => (t || '').toLowerCase().includes(q)))
    );
  }, [DATA, tab, cari, jabatan]);

  return (
    <div className="ak">
      <section className="ak-hero">
        <div className="ak-wrap">
          <nav className="ak-remah" aria-label="Breadcrumb">
            <Home size={16} /><Link to="/">Beranda</Link><ChevronRight size={14} /><strong>Guru & Tenaga Kependidikan</strong>
          </nav>
          <h1>Guru & Tenaga Kependidikan</h1>
          <p>SMAS AL-BIRRU Parepare didukung oleh tenaga pendidik dan kependidikan yang profesional, berkompeten, dan berdedikasi tinggi dalam mencetak generasi berilmu, berakhlak mulia, dan siap menghadapi masa depan.</p>
        </div>
      </section>

      <main className="ak-wrap ak-isi">
        <div className="ak-tab" role="tablist">
          {TAB.map(({ kunci, Icon }) => (
            <button key={kunci} role="tab" aria-selected={tab === kunci}
                    className={tab === kunci ? 'aktif' : ''} onClick={() => setTab(kunci)}>
              <Icon size={18} /> {kunci}
            </button>
          ))}
        </div>

        <div className="ak-alat">
          <label className="ak-cari">
            <Search size={16} />
            <input type="search" value={cari} onChange={(e) => setCari(e.target.value)}
                   placeholder="Cari nama, jabatan, mata pelajaran, NIY, atau status..." />
          </label>
          <select className="ak-pilih" value={jabatan} onChange={(e) => setJabatan(e.target.value)} aria-label="Filter jabatan">
            <option value="">Semua Jabatan</option>
            {daftarJabatan.map((j) => <option key={j}>{j}</option>)}
          </select>
        </div>

        {tampil.length === 0 ? (
          <p className="ak-kosong">Tidak ada data yang cocok. Coba ubah kata kunci atau filter.</p>
        ) : (
          <div className="gt-grid">
            {tampil.map((d) => (
              <article className="gt-kartu" key={d.id}>
                <Link className="gt-tautan" to={`/akademik/guru/${d.id}`} aria-label={`Buka profil ${d.nama}`} />
                <div className="ak-avatar" style={{ width: 76, height: 76, fontSize: 24 }}>
                  {d.foto ? <img src={d.foto} alt={d.nama} /> : inisial(d.nama)}
                </div>
                <h3>{d.nama}</h3>
                <div className="gt-jabatan">
                  <span className={`gt-lencana ${jenis(d) === 'Kepala Sekolah' ? 'kepsek' : ''}`}>{jenis(d)}</span>
                </div>
                <span className="gt-panah"><ArrowRight size={16} /></span>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}