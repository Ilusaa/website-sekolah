import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock, GraduationCap, Users, ShieldCheck, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import './PilihPeran.css';

const peranList = [
  { id: 'siswa', label: 'Siswa', ket: 'Peserta didik SMAS AL-BIRRU', Icon: GraduationCap },
  { id: 'guru', label: 'Guru & Tenaga Kependidikan', ket: 'Pendidik dan staf sekolah', Icon: Users },
  { id: 'admin', label: 'Admin', ket: 'Pengelola data dan akun sekolah', Icon: ShieldCheck },
];

export default function PilihPeran() {
  const { state } = useLocation();
  const dari = state?.dari || '/akademik';
  const [peran, setPeran] = useState(null);

  const area = dari.startsWith('/dokumen') ? 'Dokumen' : 'Akademik';
  const kirim = { dari, peran };

  const bisaLogin = Boolean(peran);
  const bisaDaftar = Boolean(peran) && peran !== 'admin'; // akun admin dibuat oleh sekolah

  return (
    <section className="ak">
      <div className="ak-kartu">
        <div className="ak-ikon"><Lock size={24} /></div>
        <h1>Halaman {area} khusus pengguna terdaftar</h1>
        <p className="ak-sub">Pilih Anda masuk sebagai apa, lalu lanjutkan login atau daftar.</p>

        <div className="ak-peran" role="radiogroup" aria-label="Pilih peran">
          {peranList.map(({ id, label, ket, Icon }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={peran === id}
              className={'ak-opsi' + (peran === id ? ' aktif' : '')}
              onClick={() => setPeran(id)}
            >
              <span className="ak-opsi-ikon"><Icon size={20} /></span>
              <span className="ak-opsi-teks">
                <strong>{label}</strong>
                <small>{ket}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="ak-aksi">
          <Link
            to="/login"
            state={kirim}
            className={'btn btn-isi' + (bisaLogin ? '' : ' mati')}
            aria-disabled={!bisaLogin}
            tabIndex={bisaLogin ? 0 : -1}
            onClick={(e) => !bisaLogin && e.preventDefault()}
          >
            <LogIn size={16} /> Login
          </Link>
          <Link
            to="/daftar"
            state={kirim}
            className={'btn btn-garis' + (bisaDaftar ? '' : ' mati')}
            aria-disabled={!bisaDaftar}
            tabIndex={bisaDaftar ? 0 : -1}
            onClick={(e) => !bisaDaftar && e.preventDefault()}
          >
            <UserPlus size={16} /> Daftar
          </Link>
        </div>

        {!peran && <p className="ak-petunjuk">Pilih salah satu peran di atas untuk melanjutkan.</p>}
        {peran === 'admin' && (
          <p className="ak-petunjuk">Akun admin dibuat oleh pihak sekolah, jadi hanya bisa login.</p>
        )}

        <Link to="/" className="ak-kembali"><ArrowLeft size={16} /> Kembali ke Beranda</Link>
      </div>
    </section>
  );
}