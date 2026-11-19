import { useEffect, useRef, useState } from 'react';
import { X, Pencil, Save, CheckCircle2 } from 'lucide-react';
import BidangData from './BidangData.jsx';
import {
  ambilSiswa, simpanSiswa, bidangSiswa, inisial,
} from '../data/akademik.js';
import './DataDiri.css';

export default function SiswaModal({ id, onTutup, onSimpan }) {
  const [siswa, setSiswa] = useState(() => ambilSiswa().find((s) => s.id === id) || null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(null);
  const [galat, setGalat] = useState('');
  const [pesan, setPesan] = useState('');
  const tutupRef = useRef(null);

  // kunci scroll halaman selama jendela terbuka
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    tutupRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Esc: batalkan edit dulu, kalau tidak sedang edit tutup jendela
  useEffect(() => {
    const esc = (e) => {
      if (e.key !== 'Escape') return;
      if (edit) {
        setEdit(false);
        setGalat('');
      } else {
        onTutup();
      }
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [edit, onTutup]);

  if (!siswa) return null;

  const mulaiEdit = () => {
    setForm({ ...siswa });
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
    simpanSiswa(baru);
    setSiswa(baru);
    setEdit(false);
    setGalat('');
    setPesan('Perubahan berhasil disimpan.');
    if (onSimpan) onSimpan(baru);
  };

  return (
    <div
      className="dt-latar"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !edit) onTutup();
      }}
    >
      <div
        className="dt-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dt-modal-judul"
      >
        <div className="dt-modal-kepala">
          <div className="dt-avatar kecil" aria-hidden="true">{inisial(siswa.nama)}</div>
          <div className="dt-judul">
            <h2 id="dt-modal-judul">{siswa.nama}</h2>
            <span className="dt-lencana">{siswa.kelas}</span>
          </div>
          <button
            ref={tutupRef}
            type="button"
            className="dt-tutup"
            aria-label="Tutup"
            onClick={onTutup}
          >
            <X size={20} />
          </button>
        </div>

        <div className="dt-modal-isi">
          {galat && <p className="dt-pesan galat" role="alert">{galat}</p>}
          {pesan && !edit && (
            <p className="dt-pesan info" role="status">
              <CheckCircle2 size={16} /> {pesan}
            </p>
          )}

          <BidangData
            bidang={bidangSiswa}
            data={edit ? form : siswa}
            edit={edit}
            onUbah={ubah}
          />
        </div>

        <div className="dt-modal-kaki">
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
            <>
              <button type="button" className="btn btn-garis" onClick={onTutup}>
                Tutup
              </button>
              <button type="button" className="btn btn-isi" onClick={mulaiEdit}>
                <Pencil size={16} /> Edit data
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}