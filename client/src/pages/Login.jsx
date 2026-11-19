import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LogIn, User, Lock, UserPlus, Check, GraduationCap, Users, Star,
} from 'lucide-react';
import AuthLayout, { Kolom } from '../components/AuthLayout.jsx';
import { useAuth } from '../auth.jsx';
import './Login.css';
import './Daftar.css';

const fitur = [
  { Icon: GraduationCap, judul: 'Pendidikan Berkualitas', ket: 'Didukung oleh tenaga pendidik profesional dan berpengalaman.' },
  { Icon: Users, judul: 'Lingkungan Islami', ket: 'Membentuk karakter dan akhlak mulia dalam setiap langkah.' },
  { Icon: Star, judul: 'Berprestasi', ket: 'Mewujudkan mimpi dan masa depan yang lebih baik.' },
];

const pilihanPeran = [
  { id: 'siswa', label: 'Siswa', akun: 'NIS', placeholder: 'Masukkan NIS' },
  { id: 'guru', label: 'Guru', akun: 'NIY', placeholder: 'Masukkan NIY' },
  { id: 'admin', label: 'Admin', akun: 'Username', placeholder: 'Masukkan username admin' },
];

export default function Login() {
  const { state } = useLocation();
  const dari = state?.dari || '/';

  const peranAwal = pilihanPeran.some((p) => p.id === state?.peran) ? state.peran : 'siswa';
  const [peran, setPeran] = useState(peranAwal);
  const [form, setForm] = useState({ akun: '', password: '' });
  const [ingat, setIngat] = useState(true);
  const [galat, setGalat] = useState('');
  const [info, setInfo] = useState(state?.pesan || '');
  const [mengirim, setMengirim] = useState(false);
  const { masuk } = useAuth();
  const nav = useNavigate();

  const aktif = pilihanPeran.find((p) => p.id === peran);

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ganti peran: kosongkan kolom akun supaya tidak tercampur
  const pilihPeran = (id) => {
    if (id === peran) return;
    setPeran(id);
    setForm((f) => ({ ...f, akun: '' }));
    setGalat('');
  };

  async function kirim(e) {
    e.preventDefault();
    setGalat('');
    setInfo('');
    setMengirim(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ akun: form.akun, password: form.password, ingat, peran }),
      });
      const data = await res.json();
      if (!res.ok) return setGalat(data.pesan || 'Login gagal.');
      masuk(data.token, data.user);
      nav(dari, { replace: true });
    } catch {
      setGalat('Tidak dapat terhubung ke server.');
    } finally {
      setMengirim(false);
    }
  }

  const kiri = (
    <>
      <p className="au-pembuka">Selamat datang kembali</p>
      <h1>Login ke Akun Anda</h1>
      <p>Masuk untuk mengakses berbagai fitur dan informasi sekolah.</p>
      <ul className="dft-fitur">
        {fitur.map(({ Icon, judul, ket }) => (
          <li key={judul}>
            <Icon size={34} />
            <div><strong>{judul}</strong><span>{ket}</span></div>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <AuthLayout kiri={kiri}>
      <div className="au-judul">
        <LogIn size={38} />
        <div>
          <h2>Login</h2>
          <p>Pilih peran, lalu masukkan akun Anda.</p>
        </div>
      </div>

      <div className="dft-peran lgn-tiga" role="radiogroup" aria-label="Masuk sebagai">
        {pilihanPeran.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={peran === p.id}
            className={peran === p.id ? 'aktif' : ''}
            onClick={() => pilihPeran(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <form onSubmit={kirim}>
        <Kolom
          key={peran}
          id="akun"
          label={aktif.akun}
          Icon={User}
          placeholder={aktif.placeholder}
          value={form.akun}
          onChange={ubah}
          autoComplete="username"
          required
        />
        <Kolom id="password" label="Password" Icon={Lock} toggle placeholder="Masukkan password"
               value={form.password} onChange={ubah} autoComplete="current-password" required />

        <div className="lgn-baris">
          <label className="lgn-ingat">
            <input type="checkbox" checked={ingat} onChange={(e) => setIngat(e.target.checked)} />
            <span className="lgn-kotak" aria-hidden="true"><Check size={14} /></span>
            Ingat saya
          </label>
          <button type="button" className="lgn-lupa"
                  onClick={() => setInfo('Untuk mengatur ulang password, hubungi admin sekolah.')}>
            Lupa password?
          </button>
        </div>

        {info && <p className="au-pesan info" role="status">{info}</p>}
        {galat && <p className="au-pesan galat" role="alert">{galat}</p>}

        <button className="au-tombol" type="submit" disabled={mengirim}>
          <LogIn size={18} /> {mengirim ? 'Memproses...' : 'Login'}
        </button>
      </form>

      {peran !== 'admin' ? (
        <>
          <div className="au-atau">atau</div>
          <Link to="/daftar" state={{ peran, dari }} className="au-tombol garis">
            <UserPlus size={18} /> Daftar akun baru
          </Link>
        </>
      ) : (
        <p className="lgn-catatan">Akun admin dibuat oleh pihak sekolah.</p>
      )}
    </AuthLayout>
  );
}