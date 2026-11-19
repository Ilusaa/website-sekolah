import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home, ChevronRight, ArrowLeft, Pencil, Save, X, CheckCircle2 } from 'lucide-react';
import BidangData from '../components/BidangData.jsx';
import {
  ambilGuru, simpanGuru, bidangGuru, inisial,
} from '../data/akademik.js';
import '../components/DataDiri.css';

export default function GuruDetail() {
  const { id } = useParams();
  const [guru, setGuru] = useState(() => ambilGuru().find((g) => g.id === id) || null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(null);
  const [galat, setGalat] = useState('');
  const [pesan, setPesan] = useState('');

  // ganti halaman guru -> muat ulang datanya
  useEffect(() => {
    setGuru(ambilGuru().find((g) => g.id === id) || null);
    setEdit(false);
    setGalat('');
    setPesan('');
    window.scrollTo(0, 0);
  }, [id]);

  if (!guru) {
    return (
      <section className="dt">
        <div className="dt-isi">
          <div className="dt-kartu dt-kosong">
            <h1>Data guru tidak ditemukan</h1>
            <p>Data yang kamu cari tidak ada atau sudah dihapus.</p>
            <Link to="/akademik/guru" className="btn btn-isi">
              <ArrowLeft size={16} /> Kembali ke daftar
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const mulaiEdit = () => {
    setForm({ ...guru });
    setGalat('');
    setPesan('');
    setEdit(true);
  };

  const batal = () => {
    setEdit(false);
    setGalat('');
  };

  const ubah = (nama, nilai) => setForm((f) => ({ ...f, [nama]: nilai }));

  const simpan = () => {
    if (!form.nama.trim()) {
      setGalat('Nama lengkap tidak boleh kosong.');
      return;
    }
    const baru = { ...form, nama: form.nama.trim() };
    simpanGuru(baru);
    setGuru(baru);
    setEdit(false);
    setGalat('');
    setPesan('Perubahan berhasil disimpan.');
  };

  return (
    <section className="dt">
      <div className="dt-isi">
        <nav className="dt-remah" aria-label="Jejak halaman">
          <Link to="/" aria-label="Beranda"><Home size={16} /></Link>
          <Link to="/">Beranda</Link>
          <ChevronRight size={14} />
          <Link to="/akademik/guru">Guru &amp; Tenaga Kependidikan</Link>
          <ChevronRight size={14} />
          <span aria-current="page">{guru.nama}</span>
        </nav>

        <Link to="/akademik/guru" className="dt-kembali">
          <ArrowLeft size={16} /> Kembali ke daftar
        </Link>

        <div className="dt-kartu">
          <div className="dt-kepala">
            <div className="dt-avatar" aria-hidden="true">{inisial(guru.nama)}</div>
            <div className="dt-judul">
              <h1>{guru.nama}</h1>
              <span className="dt-lencana">{guru.jabatan}</span>
            </div>

            <div className="dt-tombol">
              {edit ? (
                <>
                  <button type="button" className="btn btn-garis" onClick={batal}>
                    <X size={16} /> Batal
                  </button>
                  <button type="button" className="btn btn-isi" onClick={simpan}>
                    <Save size={16} /> Simpan
                  </button>
                </>
              ) : (
                <button type="button" className="btn btn-isi" onClick={mulaiEdit}>
                  <Pencil size={16} /> Edit profil
                </button>
              )}
            </div>
          </div>

          {galat && <p className="dt-pesan galat" role="alert">{galat}</p>}
          {pesan && !edit && (
            <p className="dt-pesan info" role="status">
              <CheckCircle2 size={16} /> {pesan}
            </p>
          )}

          <BidangData
            bidang={bidangGuru}
            data={edit ? form : guru}
            edit={edit}
            onUbah={ubah}
          />
        </div>
      </div>
    </section>
  );
}