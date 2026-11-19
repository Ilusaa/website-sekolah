import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home, ChevronRight, ChevronLeft, Camera, Trash2 } from 'lucide-react';
import Isian from '../components/Isian';
import { ambilGuru, simpanGuru, bidangGuru, inisial } from './DataAkademik';
import './Akademik.css';
import './Akademik-tambahan.css';

// Data kepegawaian: hanya tampil, tidak bisa diedit sendiri (diatur admin)
const bidangKepegawaian = [
  { nama: 'status', label: 'Status kepegawaian' },
  { nama: 'niy', label: 'NIY' },
];

// Label tunggal di header: Kepala Sekolah, Tenaga Kependidikan, atau Guru
const jenis = (d) =>
  d.jabatan.includes('Kepala Sekolah') ? 'Kepala Sekolah'
  : d.kategori === 'Tenaga Kependidikan' ? 'Tenaga Kependidikan'
  : 'Guru';

const judulBagian = { margin: '0 0 12px', fontSize: 16, color: '#0f5a3a' };
const pemisah = { margin: '24px 0', border: 0, borderTop: '1px solid #e2ebe5' };

export default function GuruProfil() {
  const { id } = useParams();
  // id dari URL berupa teks, id di data berupa angka, jadi dibandingkan sebagai teks
  const [guru, setGuru] = useState(() => ambilGuru().find((g) => String(g.id) === id));
  const [edit, setEdit] = useState(false);
  const [f, setF] = useState(null);
  const [info, setInfo] = useState('');

  const mulai = () => { setF({ ...guru }); setInfo(''); setEdit(true); };
  const batal = () => { setEdit(false); setInfo(''); };
  const simpan = () => {
    if (!f.nama.trim()) { setInfo('Nama wajib diisi.'); return; }
    const baru = { ...f, nama: f.nama.trim() };
    setGuru(simpanGuru(baru).find((g) => g.id === baru.id));
    setEdit(false);
    setInfo('Perubahan disimpan.');
  };

  // Foto: dipotong persegi di tengah, diperkecil 400x400, disimpan sebagai teks (JPEG)
  const pilihFoto = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setInfo('File harus berupa gambar (JPG atau PNG).'); return; }
    if (file.size > 8 * 1024 * 1024) { setInfo('Ukuran foto maksimal 8 MB.'); return; }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const S = 400;
      const sisi = Math.min(img.width, img.height);
      const c = document.createElement('canvas');
      c.width = S;
      c.height = S;
      c.getContext('2d').drawImage(img, (img.width - sisi) / 2, (img.height - sisi) / 2, sisi, sisi, 0, 0, S, S);
      setF((p) => ({ ...p, foto: c.toDataURL('image/jpeg', 0.85) }));
      URL.revokeObjectURL(url);
      setInfo('');
    };
    img.onerror = () => { URL.revokeObjectURL(url); setInfo('Foto tidak bisa dibaca, coba file lain.'); };
    img.src = url;
  };
  const hapusFoto = () => setF((p) => ({ ...p, foto: '' }));

  const data = edit ? f : guru;

  return (
    <div className="ak">
      <section className="ak-hero">
        <div className="ak-wrap">
          <nav className="ak-remah" aria-label="Breadcrumb">
            <Home size={16} /><Link to="/">Beranda</Link><ChevronRight size={14} />
            <Link to="/akademik/guru">Guru & Tenaga Kependidikan</Link><ChevronRight size={14} />
            <strong>{guru ? guru.nama : 'Profil'}</strong>
          </nav>
          <h1>Profil Guru & Tenaga Kependidikan</h1>
        </div>
      </section>

      <main className="ak-wrap ak-isi pf">
        <Link className="pf-balik" to="/akademik/guru"><ChevronLeft size={16} /> Kembali ke daftar</Link>

        {!guru ? (
          <p className="ak-kosong">Data tidak ditemukan.</p>
        ) : (
          <div className="pf-kartu">
            <div className="pf-sampul" aria-hidden="true" />

            <div className="pf-badan">
              <div className="pf-kepala">
                <div className="pf-foto">
                  <div className="pf-foto-bulat">
                    {data.foto ? <img src={data.foto} alt={`Foto ${data.nama}`} /> : inisial(data.nama)}
                  </div>
                  {edit && (
                    <>
                      <label className="pf-foto-ubah" title="Ganti foto">
                        <Camera size={18} />
                        <input className="pf-file" type="file" accept="image/*" onChange={pilihFoto} aria-label="Pilih foto profil" />
                      </label>
                      {data.foto && (
                        <button type="button" className="pf-foto-hapus" onClick={hapusFoto} title="Hapus foto" aria-label="Hapus foto">
                          <Trash2 size={17} />
                        </button>
                      )}
                    </>
                  )}
                </div>

                <div className="pf-nama">
                  <h2>{guru.nama}</h2>
                  <div className="gt-jabatan">
                    <span className={`gt-lencana ${jenis(guru) === 'Kepala Sekolah' ? 'kepsek' : ''}`}>{jenis(guru)}</span>
                  </div>
                </div>

                <div className="pf-aksi">
                  {edit ? (
                    <>
                      <button className="pf-btn hantu" onClick={batal}>Batal</button>
                      <button className="pf-btn" onClick={simpan}>Simpan perubahan</button>
                    </>
                  ) : (
                    <button className="pf-btn" onClick={mulai}>Edit profil</button>
                  )}
                </div>
              </div>

              {edit && <p className="pf-foto-petunjuk">Klik ikon kamera untuk mengganti foto. Foto otomatis dipotong persegi.</p>}
              {info && <p className="pf-info" role="status">{info}</p>}

              <h3 style={judulBagian}>Data kepegawaian</h3>
              <Isian
                bidang={bidangKepegawaian}
                data={{ status: guru.status || '-', niy: guru.niy || '-' }}
                edit={false}
                onChange={() => {}}
              />
              <div className="pf-jabatan-blok">
                <span className="pf-label">Jabatan</span>
                <div className="pf-jabatan-daftar">
                  {guru.jabatan.map((j) => (
                    <span key={j} className={`gt-lencana ${j === 'Kepala Sekolah' ? 'kepsek' : ''}`}>{j}</span>
                  ))}
                </div>
              </div>

              <hr style={pemisah} />

              <h3 style={judulBagian}>Data diri</h3>
              <Isian bidang={bidangGuru} data={data} edit={edit} onChange={(k, val) => setF({ ...f, [k]: val })} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}