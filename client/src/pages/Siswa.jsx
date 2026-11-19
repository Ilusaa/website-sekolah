import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, ChevronRight, Users, GraduationCap, Search, ArrowUpDown, ArrowRight, ChevronLeft,
  User, Trophy, LayoutGrid, Printer, BookOpen,
} from 'lucide-react';
import './Akademik.css';

const PER_HALAMAN = 9;
const TAHUN = '2026/2027';

// Format baris: [nama, jk, nis]  -> jk: 'L' atau 'P'
// Data lain (NISN, tempat/tanggal lahir, agama, alamat, HP) bisa ditambahkan nanti.
// Ganti dengan fetch('/api/siswa') setelah database siap.
const DAFTAR = {
  'X MIPA': [
    ['SAHRUL', 'L', '240090'],
    ['WAHYUDI', 'L', '240092'],
    ['ANNISA', 'P', '260101'],
    ['ARIL SAPUTRA', 'L', '260102'],
    ['MUH. FURQAN', 'L', '260103'],
    ['MUH HABIL', 'L', '260104'],
    ['NAUFAL ZHULHILMI', 'L', '260105'],
    ['NURWAKIA', 'P', '260106'],
    ['RENO IRWANSYAH', 'L', '260107'],
    ['RIDWAN', 'L', '260108'],
    ['RISMAYANTI', 'P', '260109'],
    ['SITI STAURAH', 'P', '260110'],
    ['ULFA UMAIRAH', 'P', '260111'],
    ['MUHAMMAD YUSRIL', 'L', '260112'],
  ],
  'XI MIPA': [
    ['M. TAUFIK', 'L', '23006505'],
    ['RISKA YANTI', 'P', '23006909'],
    ['SYARIR SABAR', 'L', '240091'],
    ['RAHAT IBNU MUBARAK', 'L', '2200627'],
    ['ALBIYANDRA BAHARUDDIN', 'L', '250095'],
    ['ANDIKA', 'L', '250094'],
    ['HAMISAH', 'P', '250096'],
    ['IHWANA', 'P', '250097'],
    ['ILHAMUN FURQAN', 'L', '250101'],
    ['SUNARTIA', 'P', '250099'],
    ['ZAKI AL ISLAM', 'L', '250100'],
  ],
  'XII MIPA': [
    ['MUH HASIQ', 'L', '240085'],
    ['MUH. ALIF', 'L', '240087'],
    ['MUHAMMAD HAIRUL WAWAN', 'L', '240088'],
  ],
};

const buatSiswa = (kelas, baris) =>
  baris.map(([nama, jk, nis = ''], i) => ({
    id: `${kelas}-${i}`, nama, kelas, nis,
    jk: String(jk).trim().toUpperCase().startsWith('L') ? 'L' : 'P', // aman untuk 'L'/'P' maupun 'Laki-laki'/'Perempuan'
    nisn: '', tempat: '', lahir: '', agama: '', alamat: '', hp: '', foto: '',
  }));

const SISWA = Object.fromEntries(Object.entries(DAFTAR).map(([k, baris]) => [k, buatSiswa(k, baris)]));
const KELAS = Object.keys(SISWA);

const SUB = [
  { kunci: 'diri', label: 'Data Diri', Icon: User },
  { kunci: 'ortu', label: 'Orang Tua', Icon: Users },
  { kunci: 'pendidikan', label: 'Riwayat Pendidikan', Icon: BookOpen },
  { kunci: 'prestasi', label: 'Prestasi', Icon: Trophy },
  { kunci: 'lain', label: 'Lainnya', Icon: LayoutGrid },
];

const v = (x) => x || '-';
const namaJk = (jk) => (jk === 'L' ? 'Laki-laki' : 'Perempuan');
const inisial = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0]).join('');
const Avatar = ({ s, ukuran, besar }) => (
  <div className="ak-avatar" style={{ width: ukuran, height: ukuran, fontSize: besar ? 26 : 20 }}>
    {s.foto ? <img src={s.foto} alt={s.nama} /> : inisial(s.nama)}
  </div>
);
const Baris = ({ data }) => (
  <dl>{data.map(([k, val]) => (<Fragment key={k}><dt>{k}</dt><dd>: {val}</dd></Fragment>))}</dl>
);

export default function Siswa() {
  const [kelas, setKelas] = useState(KELAS[0]);
  const [cari, setCari] = useState('');
  const [urut, setUrut] = useState('asc');
  const [hal, setHal] = useState(1);
  const [pilih, setPilih] = useState(null);
  const [sub, setSub] = useState('diri');

  const daftar = useMemo(() => {
    const q = cari.trim().toLowerCase();
    const hasil = SISWA[kelas].filter((s) => !q || s.nama.toLowerCase().includes(q) || s.nis.includes(q) || s.nisn.includes(q));
    return [...hasil].sort((a, b) => (urut === 'asc' ? a.nama.localeCompare(b.nama) : b.nama.localeCompare(a.nama)));
  }, [kelas, cari, urut]);

  const jumlahHal = Math.max(1, Math.ceil(daftar.length / PER_HALAMAN));
  const awal = (hal - 1) * PER_HALAMAN;
  const tampil = daftar.slice(awal, awal + PER_HALAMAN);

  const gantiKelas = (k) => { setKelas(k); setHal(1); setPilih(null); setCari(''); };
  const pilihSiswa = (s) => { setPilih(s); setSub('diri'); };
  const gantiUrut = () => { setUrut(urut === 'asc' ? 'desc' : 'asc'); setHal(1); };

  return (
    <div className="ak">
      <section className="ak-hero">
        <div className="ak-wrap">
          <nav className="ak-remah" aria-label="Breadcrumb">
            <Home size={16} /><Link to="/">Beranda</Link><ChevronRight size={14} /><strong>Peserta Didik</strong>
          </nav>
          <h1>Peserta Didik</h1>
          <p>Data peserta didik SMAS AL-BIRRU Parepare dapat dilihat berdasarkan kelas dan informasi lengkap setiap siswa.</p>
        </div>
      </section>

      <main className="ak-wrap ak-isi">
        <div className={`sw ${pilih ? '' : 'tanpa-detail'}`}>
          <aside className="sw-panel sw-kelas" aria-label="Daftar kelas">
            <h2><Users size={26} /> Daftar Kelas</h2>
            <ul>
              {KELAS.map((nama) => (
                <li key={nama}>
                  <button className={kelas === nama ? 'aktif' : ''} onClick={() => gantiKelas(nama)}>
                    <GraduationCap size={16} /> {nama} <span>{SISWA[nama].length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <section className="sw-panel" aria-label={`Siswa ${kelas}`}>
            <div className="sw-kepala">
              <div className="ak-avatar" style={{ width: 48, height: 48 }}><Users size={24} /></div>
              <div><h2>{kelas}</h2><small>Tahun Ajaran {TAHUN}</small></div>
              <div className="sw-jumlah">Jumlah Siswa<strong>{SISWA[kelas].length} Siswa</strong></div>
            </div>

            <div className="ak-alat" style={{ marginBottom: 0 }}>
              <label className="ak-cari">
                <Search size={16} />
                <input type="search" value={cari} onChange={(e) => { setCari(e.target.value); setHal(1); }} placeholder="Cari nama, NIS, atau NISN..." />
              </label>
              <button className="ak-pilih" onClick={gantiUrut} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <ArrowUpDown size={15} /> Urutkan {urut === 'asc' ? 'A-Z' : 'Z-A'}
              </button>
            </div>

            {tampil.length === 0 ? (
              <p className="ak-kosong" style={{ marginTop: 16 }}>
                {SISWA[kelas].length === 0 ? 'Data siswa kelas ini belum tersedia.' : 'Tidak ada siswa dengan kata kunci tersebut.'}
              </p>
            ) : (
              <div className="sw-grid">
                {tampil.map((s) => (
                  <button key={s.id} className={`sw-kartu ${pilih?.id === s.id ? 'aktif' : ''}`} onClick={() => pilihSiswa(s)}>
                    <Avatar s={s} ukuran={64} />
                    <div>
                      <b>{s.nama}</b>
                      <small>NIS {v(s.nis)}</small>
                      {s.nisn && <small>NISN {s.nisn}</small>}
                      <small>L/P {s.jk}</small>
                    </div>
                    <span className="gt-panah"><ArrowRight size={13} /></span>
                  </button>
                ))}
              </div>
            )}

            <div className="sw-halaman">
              <button aria-label="Halaman sebelumnya" disabled={hal === 1} onClick={() => setHal(hal - 1)}><ChevronLeft size={16} /></button>
              {Array.from({ length: jumlahHal }, (_, i) => i + 1).map((n) => (
                <button key={n} className={n === hal ? 'aktif' : ''} onClick={() => setHal(n)} aria-current={n === hal ? 'page' : undefined}>{n}</button>
              ))}
              <button aria-label="Halaman berikutnya" disabled={hal === jumlahHal} onClick={() => setHal(hal + 1)}><ChevronRight size={16} /></button>
              <span>Menampilkan {daftar.length ? awal + 1 : 0}-{Math.min(awal + PER_HALAMAN, daftar.length)} dari {daftar.length} data</span>
            </div>
          </section>

          {pilih && (
            <aside className="sw-panel sw-det" aria-label="Detail siswa">
              <button className="sw-balik" onClick={() => setPilih(null)}><ChevronLeft size={16} /> Kembali ke Daftar</button>
              <div className="sw-profil">
                <Avatar s={pilih} ukuran={82} besar />
                <div>
                  <h3>{pilih.nama}</h3>
                  <p>{pilih.kelas}</p>
                  <span className="sw-chip">NIS {v(pilih.nis)}</span>
                  {pilih.nisn && <span className="sw-chip">NISN {pilih.nisn}</span>}
                  <span className="sw-chip">{namaJk(pilih.jk)}</span>
                </div>
              </div>

              <div className="sw-detail">
                <div className="sw-sub" role="tablist">
                  {SUB.map(({ kunci, label, Icon }) => (
                    <button key={kunci} role="tab" aria-selected={sub === kunci} className={sub === kunci ? 'aktif' : ''} onClick={() => setSub(kunci)}>
                      <Icon size={15} /> {label}
                    </button>
                  ))}
                </div>
                <div className="sw-isi">
                  {sub === 'diri' ? (
                    <>
                      <h4>Data Diri</h4>
                      <Baris data={[
                        ['Nama Lengkap', pilih.nama], ['NIS', v(pilih.nis)], ['NISN', v(pilih.nisn)],
                        ['Tempat Lahir', v(pilih.tempat)], ['Tanggal Lahir', v(pilih.lahir)],
                        ['Jenis Kelamin', namaJk(pilih.jk)],
                        ['Agama', v(pilih.agama)], ['Alamat', v(pilih.alamat)], ['No. HP', v(pilih.hp)],
                      ]} />
                      <h4>Data Tambahan</h4>
                      <Baris data={[['Kelas', pilih.kelas], ['Tahun Ajaran', TAHUN], ['Status', 'Aktif']]} />
                    </>
                  ) : (
                    <>
                      <h4>{SUB.find((x) => x.kunci === sub).label}</h4>
                      <p className="ak-kosong" style={{ padding: 20 }}>Data belum tersedia.</p>
                    </>
                  )}
                </div>
              </div>
              <button className="sw-cetak" onClick={() => window.print()}><Printer size={16} /> Cetak Data Siswa</button>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}