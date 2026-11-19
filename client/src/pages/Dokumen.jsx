import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home, ChevronRight, ChevronLeft, FileText, LayoutGrid, Search, Plus, Download, Trash2, X,
} from 'lucide-react';
import { useAuth } from '../auth.jsx';
import './Dokumen.css';

const PER_HALAMAN = 5;

// Satu komponen dipakai untuk 5 halaman. Prop `kategori` = kunci di bawah (kosong = semua).
export const KATEGORI = {
  akademik: { label: 'Akademik', judul: 'Dokumen Akademik', ket: 'Kalender akademik, jadwal pelajaran, dan dokumen kurikulum SMAS AL-BIRRU Parepare.', warna: 'biru' },
  'peserta-didik': { label: 'Peserta Didik', judul: 'Dokumen Peserta Didik', ket: 'Daftar dan data peserta didik SMAS AL-BIRRU Parepare.', warna: 'hijau' },
  akreditasi: { label: 'Akreditasi', judul: 'Dokumen Akreditasi', ket: 'Sertifikat dan berkas akreditasi resmi SMAS AL-BIRRU Parepare.', warna: 'ungu' },
  surat: { label: 'Surat', judul: 'Dokumen Surat Masuk & Keluar', ket: 'Arsip surat masuk dan surat keluar SMAS AL-BIRRU Parepare.', warna: 'kuning' },
};
const SEMUA = { judul: 'Dokumen', ket: 'Kumpulan dokumen penting dan resmi dari SMAS AL-BIRRU, Parepare.' };

// Data contoh. Ganti dengan fetch('/api/dokumen') setelah tabelnya dibuat.
const AWAL = [
  { id: 1, nama: 'Kalender Akademik 2026/2027', kategori: 'akademik', tanggal: '2026-10-12', jenis: 'PDF' },
  { id: 2, nama: 'Jadwal Pelajaran Semester Ganjil', kategori: 'akademik', tanggal: '2026-10-10', jenis: 'PDF' },
  { id: 3, nama: 'Daftar Peserta Didik Kelas X', kategori: 'peserta-didik', tanggal: '2026-10-08', jenis: 'XLSX' },
  { id: 4, nama: 'Sertifikat Akreditasi', kategori: 'akreditasi', tanggal: '2026-10-05', jenis: 'PDF' },
  { id: 5, nama: 'Surat Masuk No. 123/SMAS/2026', kategori: 'surat', tanggal: '2026-10-02', jenis: 'PDF' },
  { id: 6, nama: 'Silabus Kurikulum Merdeka', kategori: 'akademik', tanggal: '2026-09-28', jenis: 'DOCX' },
  { id: 7, nama: 'Daftar Peserta Didik Kelas XI', kategori: 'peserta-didik', tanggal: '2026-09-25', jenis: 'XLSX' },
  { id: 8, nama: 'Borang Akreditasi Sekolah', kategori: 'akreditasi', tanggal: '2026-09-20', jenis: 'PDF' },
  { id: 9, nama: 'Surat Keluar No. 045/SMAS/2026', kategori: 'surat', tanggal: '2026-09-18', jenis: 'PDF' },
  { id: 10, nama: 'Jadwal Ujian Tengah Semester', kategori: 'akademik', tanggal: '2026-09-15', jenis: 'PDF' },
  { id: 11, nama: 'Data Mutasi Peserta Didik', kategori: 'peserta-didik', tanggal: '2026-09-10', jenis: 'XLSX' },
  { id: 12, nama: 'Surat Undangan Rapat Komite', kategori: 'surat', tanggal: '2026-09-05', jenis: 'DOCX' },
];

const hariIni = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const tgl = (iso) => { const [y, m, d] = iso.split('-'); return `${+d} ${BULAN[+m - 1]} ${y}`; };
const warnaJenis = (j) => (j === 'PDF' ? 'merah' : j === 'XLSX' ? 'hijau' : j === 'DOCX' ? 'biru' : 'abu');
const warnaIkon = (k) => KATEGORI[k]?.warna || 'abu';

export default function Dokumen({ kategori = '' }) {
  const info = kategori ? KATEGORI[kategori] : SEMUA;
  const { user } = useAuth();
  const admin = user?.role === 'admin';
  const nav = useNavigate();

  const [data, setData] = useState(AWAL);
  const [cari, setCari] = useState('');
  const [hal, setHal] = useState(1);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ nama: '', kategori: kategori || 'akademik', file: null });
  const [galat, setGalat] = useState('');

  const daftar = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return data.filter((d) => (!kategori || d.kategori === kategori) && (!q || d.nama.toLowerCase().includes(q)));
  }, [data, kategori, cari]);

  const jumlahHal = Math.max(1, Math.ceil(daftar.length / PER_HALAMAN));
  const halAktif = Math.min(hal, jumlahHal);
  const awal = (halAktif - 1) * PER_HALAMAN;
  const tampil = daftar.slice(awal, awal + PER_HALAMAN);

  function unduh(d) {
    if (!d.url) return alert('Ini data contoh, belum ada file yang bisa diunduh.');
    const a = document.createElement('a');
    a.href = d.url; a.download = d.namaFile || d.nama; a.click();
  }
  function hapus(d) {
    if (window.confirm(`Hapus dokumen "${d.nama}"?`)) setData((s) => s.filter((x) => x.id !== d.id));
  }
  function simpan(e) {
    e.preventDefault();
    if (!form.nama.trim()) return setGalat('Nama dokumen wajib diisi.');
    if (!form.file) return setGalat('Pilih file dokumen terlebih dahulu.');
    const ext = form.file.name.split('.').pop().toUpperCase();
    const baru = {
      id: Date.now(), nama: form.nama.trim(), kategori: form.kategori, jenis: ext,
      tanggal: hariIni(), url: URL.createObjectURL(form.file), namaFile: form.file.name,
    };
    setData((s) => [baru, ...s]);
    setModal(false); setGalat(''); setForm({ nama: '', kategori: kategori || 'akademik', file: null });
  }

  return (
    <div className="dk">
      <div className="dk-wrap">
        <nav className="dk-remah" aria-label="Breadcrumb">
          <Home size={16} /><Link to="/">Beranda</Link><ChevronRight size={14} />
          {kategori ? (<><Link to="/dokumen">Dokumen</Link><ChevronRight size={14} /><strong>{info.label}</strong></>) : <strong>Dokumen</strong>}
        </nav>

        <header className="dk-judul">
          <div className="dk-lingkar"><FileText size={42} /></div>
          <div><h1>{info.judul}</h1><p>{info.ket}</p></div>
        </header>

        <section className="dk-kartu">
          <div className="dk-alat">
            <label className="dk-filter">
              <LayoutGrid size={18} />
              <select value={kategori} aria-label="Pilih kategori dokumen"
                      onChange={(e) => nav(e.target.value ? `/dokumen/${e.target.value}` : '/dokumen')}>
                <option value="">Semua Dokumen</option>
                {Object.entries(KATEGORI).map(([k, v]) => <option key={k} value={k}>{v.judul}</option>)}
              </select>
            </label>
            <label className="dk-cari">
              <Search size={18} />
              <input type="search" value={cari} onChange={(e) => { setCari(e.target.value); setHal(1); }} placeholder="Cari dokumen..." />
            </label>
            {admin && <button className="dk-tambah" onClick={() => setModal(true)}><Plus size={18} /> Tambah Dokumen</button>}
          </div>

          <div className="dk-gulir">
            <table className="dk-tabel">
              <thead>
                <tr><th>No</th><th>Nama Dokumen</th><th>Kategori</th><th>Tanggal Unggah</th><th>Jenis File</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                {tampil.length === 0 && (
                  <tr><td colSpan="6" className="dk-kosong">Tidak ada dokumen yang cocok. Coba ubah kata kunci atau pilih kategori lain.</td></tr>
                )}
                {tampil.map((d, i) => (
                  <tr key={d.id}>
                    <td>{awal + i + 1}.</td>
                    <td className="dk-nama"><FileText size={24} className={`dk-ikon ${warnaIkon(d.kategori)}`} /> {d.nama}</td>
                    <td><span className={`dk-lencana ${warnaIkon(d.kategori)}`}>{KATEGORI[d.kategori]?.label}</span></td>
                    <td>{tgl(d.tanggal)}</td>
                    <td><span className={`dk-lencana jenis ${warnaJenis(d.jenis)}`}>{d.jenis}</span></td>
                    <td className="dk-aksi">
                      <button className="unduh" onClick={() => unduh(d)} aria-label={`Unduh ${d.nama}`}><Download size={18} /></button>
                      {admin && <button className="hapus" onClick={() => hapus(d)} aria-label={`Hapus ${d.nama}`}><Trash2 size={18} /></button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dk-halaman">
            <button aria-label="Sebelumnya" disabled={halAktif === 1} onClick={() => setHal(halAktif - 1)}><ChevronLeft size={16} /></button>
            {Array.from({ length: jumlahHal }, (_, i) => i + 1).map((n) => (
              <button key={n} className={n === halAktif ? 'aktif' : ''} aria-current={n === halAktif ? 'page' : undefined} onClick={() => setHal(n)}>{n}</button>
            ))}
            <button aria-label="Berikutnya" disabled={halAktif === jumlahHal} onClick={() => setHal(halAktif + 1)}><ChevronRight size={16} /></button>
          </div>
        </section>
      </div>

      {modal && (
        <div className="dk-latar" onMouseDown={(e) => e.target === e.currentTarget && setModal(false)}>
          <form className="dk-modal" onSubmit={simpan} role="dialog" aria-modal="true" aria-labelledby="jdl-tambah">
            <div className="dk-modal-kepala">
              <h2 id="jdl-tambah">Tambah Dokumen</h2>
              <button type="button" onClick={() => setModal(false)} aria-label="Tutup"><X size={18} /></button>
            </div>
            <label>Nama dokumen
              <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Contoh: Kalender Akademik 2026/2027" />
            </label>
            <label>Kategori
              <select value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })}>
                {Object.entries(KATEGORI).map(([k, v]) => <option key={k} value={k}>{v.judul}</option>)}
              </select>
            </label>
            <label>File
              <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" onChange={(e) => setForm({ ...form, file: e.target.files[0] || null })} />
            </label>
            {galat && <p className="dk-galat" role="alert">{galat}</p>}
            <div className="dk-modal-aksi">
              <button type="button" className="garis" onClick={() => setModal(false)}>Batal</button>
              <button type="submit" className="isi">Simpan dokumen</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}