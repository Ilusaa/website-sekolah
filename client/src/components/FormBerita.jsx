import { useState } from 'react';
import { X, ImagePlus } from 'lucide-react';
import { KATEGORI, simpanBerita, bacaGambar, hariIni } from '../beritaStore.js';

export default function FormBerita({ berita, tutup }) {
  const [f, setF] = useState({
    id: berita?.id, judul: berita?.judul || '', kategori: berita?.kategori || KATEGORI[0],
    isi: berita?.isi || '', gambar: berita?.gambar || '', tanggal: berita?.tanggal || hariIni(),
  });
  const [galat, setGalat] = useState('');

  async function pilihGambar(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setGalat('File harus berupa gambar (JPG atau PNG).');
    try { setF({ ...f, gambar: await bacaGambar(file) }); setGalat(''); }
    catch { setGalat('Gambar tidak dapat dibaca. Coba file lain.'); }
  }
  function kirim(e) {
    e.preventDefault();
    if (!f.judul.trim() || !f.isi.trim()) return setGalat('Judul dan isi berita wajib diisi.');
    if (!f.tanggal) return setGalat('Tanggal berita wajib diisi.');
    simpanBerita({ ...f, judul: f.judul.trim(), isi: f.isi.trim() });
    tutup();
  }

  return (
    <div className="br-latar" onMouseDown={(e) => e.target === e.currentTarget && tutup()}>
      <form className="br-modal" onSubmit={kirim} role="dialog" aria-modal="true" aria-labelledby="jdl-form">
        <div className="br-modal-kepala">
          <h2 id="jdl-form">{berita ? 'Ubah Berita' : 'Tulis Berita'}</h2>
          <button type="button" onClick={tutup} aria-label="Tutup"><X size={18} /></button>
        </div>
        <label>Judul
          <input value={f.judul} onChange={(e) => setF({ ...f, judul: e.target.value })} placeholder="Judul berita" />
        </label>
        <label>Kategori
          <select value={f.kategori} onChange={(e) => setF({ ...f, kategori: e.target.value })}>
            {KATEGORI.map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label>Tanggal terbit
          <input type="date" value={f.tanggal} onChange={(e) => setF({ ...f, tanggal: e.target.value })} />
        </label>
        <label>Isi berita
          <textarea rows="6" value={f.isi} onChange={(e) => setF({ ...f, isi: e.target.value })}
                    placeholder="Tulis isi berita. Pisahkan paragraf dengan baris kosong." />
        </label>
        <div className="br-unggah">
          {f.gambar ? <img src={f.gambar} alt="Pratinjau" /> : <div className="br-unggah-kosong"><ImagePlus size={28} /></div>}
          <label className="br-pilih">{f.gambar ? 'Ganti gambar' : 'Unggah gambar'}
            <input type="file" accept="image/*" onChange={pilihGambar} hidden />
          </label>
          {f.gambar && <button type="button" className="br-linkhapus" onClick={() => setF({ ...f, gambar: '' })}>Hapus gambar</button>}
        </div>
        {galat && <p className="br-galat" role="alert">{galat}</p>}
        <div className="br-modal-aksi">
          <button type="button" className="garis" onClick={tutup}>Batal</button>
          <button type="submit" className="isi">{berita ? 'Simpan perubahan' : 'Terbitkan berita'}</button>
        </div>
      </form>
    </div>
  );
}