import { useEffect, useMemo, useState } from 'react';
import { Camera, Plus, Trash2, X, ImagePlus } from 'lucide-react';
import { useAuth } from '../auth.jsx';
import { useKegiatan, tambahKegiatan, hapusKegiatan } from '../kegiatanStore.js';
import { bacaGambar, hariIni, tgl } from '../beritaStore.js';
import './GaleriKegiatan.css';

export default function GaleriKegiatan() {
  const { user } = useAuth();
  const admin = user?.role === 'admin';
  const semua = useKegiatan();
  const daftar = useMemo(() => [...semua].sort((a, b) => b.tanggal.localeCompare(a.tanggal) || b.id - a.id), [semua]);

  const [form, setForm] = useState(false);
  const [f, setF] = useState({ src: '', ket: '', tanggal: hariIni() });
  const [galat, setGalat] = useState('');
  const [besar, setBesar] = useState(null);

  useEffect(() => {
    if (!besar) return;
    const esc = (e) => e.key === 'Escape' && setBesar(null);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [besar]);

  function buka() { setF({ src: '', ket: '', tanggal: hariIni() }); setGalat(''); setForm(true); }

  async function pilih(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setGalat('File harus berupa gambar (JPG atau PNG).');
    try { setF({ ...f, src: await bacaGambar(file) }); setGalat(''); }
    catch { setGalat('Gambar tidak dapat dibaca. Coba file lain.'); }
  }
  function kirim(e) {
    e.preventDefault();
    if (!f.src) return setGalat('Pilih foto kegiatan terlebih dahulu.');
    if (!f.ket.trim()) return setGalat('Keterangan foto wajib diisi.');
    const ok = tambahKegiatan({ src: f.src, ket: f.ket.trim(), tanggal: f.tanggal || hariIni() });
    if (!ok) return setGalat('Penyimpanan browser penuh. Hapus beberapa foto lama lalu coba lagi.');
    setForm(false);
  }
  function hapus(k) {
    if (window.confirm(`Hapus foto "${k.ket}"?`) && !hapusKegiatan(k.id)) alert('Foto gagal dihapus. Coba lagi.');
  }

  // Pengunjung biasa tidak melihat apa-apa kalau belum ada foto.
  if (daftar.length === 0 && !admin) return null;

  return (
    <section className="gk" aria-labelledby="gk-judul">
      <header className="gk-kepala">
        <h3 id="gk-judul"><Camera size={22} /> Kegiatan Terbaru</h3>
        {admin && <button className="gk-tambah" onClick={buka}><Plus size={17} /> Tambah Foto</button>}
      </header>

      {daftar.length === 0 ? (
        <p className="gk-kosong">Belum ada foto kegiatan. Klik <b>Tambah Foto</b> untuk mengunggah foto pertama.</p>
      ) : (
        <ul className="gk-grid">
          {daftar.map((k) => (
            <li key={k.id}>
              <button className="gk-foto" onClick={() => setBesar(k)} aria-label={`Perbesar foto: ${k.ket}`}>
                <img src={k.src} alt={k.ket} loading="lazy" />
              </button>
              <div className="gk-ket"><b>{k.ket}</b><small>{tgl(k.tanggal)}</small></div>
              {admin && <button className="gk-hapus" onClick={() => hapus(k)} aria-label={`Hapus ${k.ket}`}><Trash2 size={15} /></button>}
            </li>
          ))}
        </ul>
      )}

      {besar && (
        <div className="gk-latar gelap" onMouseDown={(e) => e.target === e.currentTarget && setBesar(null)}>
          <figure className="gk-besar">
            <button onClick={() => setBesar(null)} aria-label="Tutup"><X size={18} /></button>
            <img src={besar.src} alt={besar.ket} />
            <figcaption>{besar.ket} <small>{tgl(besar.tanggal)}</small></figcaption>
          </figure>
        </div>
      )}

      {form && (
        <div className="gk-latar" onMouseDown={(e) => e.target === e.currentTarget && setForm(false)}>
          <form className="gk-modal" onSubmit={kirim} role="dialog" aria-modal="true" aria-labelledby="gk-jdl">
            <div className="gk-modal-kepala">
              <h2 id="gk-jdl">Tambah Foto Kegiatan</h2>
              <button type="button" onClick={() => setForm(false)} aria-label="Tutup"><X size={18} /></button>
            </div>
            <div className="gk-unggah">
              {f.src ? <img src={f.src} alt="Pratinjau" /> : <div className="gk-unggah-kosong"><ImagePlus size={30} /></div>}
              <label className="gk-pilih">{f.src ? 'Ganti foto' : 'Pilih foto'}
                <input type="file" accept="image/*" onChange={pilih} hidden />
              </label>
            </div>
            <label>Keterangan
              <input value={f.ket} maxLength={120} onChange={(e) => setF({ ...f, ket: e.target.value })} placeholder="Contoh: Upacara Hari Sumpah Pemuda" />
            </label>
            <label>Tanggal kegiatan
              <input type="date" value={f.tanggal} onChange={(e) => setF({ ...f, tanggal: e.target.value })} />
            </label>
            {galat && <p className="gk-galat" role="alert">{galat}</p>}
            <div className="gk-modal-aksi">
              <button type="button" className="garis" onClick={() => setForm(false)}>Batal</button>
              <button type="submit" className="isi">Simpan foto</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}