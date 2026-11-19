import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap, Users, Star, User, Contact, Mail, Phone, Lock, UserPlus, LogIn,
} from 'lucide-react';
import AuthLayout, { Kolom } from '../components/AuthLayout.jsx';
import './Daftar.css';

const fitur = [
  { Icon: GraduationCap, judul: 'Pendidikan Berkualitas', ket: 'Didukung oleh tenaga pendidik profesional dan berpengalaman.' },
  { Icon: Users, judul: 'Lingkungan Islami', ket: 'Membentuk karakter dan akhlak mulia dalam setiap langkah.' },
  { Icon: Star, judul: 'Berprestasi', ket: 'Mewujudkan mimpi dan masa depan yang lebih baik.' },
];

// Admin tidak mendaftar sendiri, jadi hanya dua peran
const pilihanPeran = [
  { id: 'siswa', label: 'Siswa', nomor: 'NIS', placeholder: 'Masukkan NIS siswa' },
  { id: 'guru', label: 'Guru / Tendik', nomor: 'NIY', placeholder: 'Masukkan NIY guru' },
];

const awal = { nama: '', nis_niy: '', email: '', no_hp: '', password: '', konfirmasi: '' };

export default function Daftar() {
  const { state } = useLocation();
  const dari = state?.dari || '/';

  const [peran, setPeran] = useState(state?.peran === 'guru' ? 'guru' : 'siswa');
  const [form, setForm] = useState(awal);
  const [galat, setGalat] = useState('');
  const [mengirim, setMengirim] = useState(false);
  const nav = useNavigate();

  const aktif = pilihanPeran.find((p) => p.id === peran);

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function kirim(e) {
    e.preventDefault();
    setGalat('');
    if (form.password.length < 6) return setGalat('Password minimal 6 karakter.');
    if (form.password !== form.konfirmasi) return setGalat('Konfirmasi password tidak sama.');

    setMengirim(true);
    try {
      const res = await fetch('/api/auth/daftar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: form.nama,
          nis_niy: form.nis_niy,
          email: form.email,
          no_hp: form.no_hp,
          password: form.password,
          peran,
        }),
      });
      const data = await res.json();
      if (!res.ok) return setGalat(data.pesan || 'Pendaftaran gagal.');
      nav('/login', { state: { pesan: data.pesan, peran, dari } });
    } catch {
      setGalat('Tidak dapat terhubung ke server.');
    } finally {
      setMengirim(false);
    }
  }

  const kiri = (
    <>
      <p className="au-pembuka">Selamat datang di</p>
      <h1>SMAS AL-BIRRU Parepare</h1>
      <p>Bergabunglah bersama kami untuk menjadi bagian dari generasi yang berilmu, berakhlak mulia, dan berprestasi.</p>
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
        <UserPlus size={38} />
        <div>
          <h2>Daftar Akun</h2>
          <p>Isi data diri Anda untuk membuat akun.</p>
        </div>
      </div>

      <div className="dft-peran" role="radiogroup" aria-label="Daftar sebagai">
        {pilihanPeran.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={peran === p.id}
            className={peran === p.id ? 'aktif' : ''}
            onClick={() => setPeran(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <form onSubmit={kirim} noValidate>
        <Kolom id="nama" label="Nama Lengkap" Icon={User} placeholder="Masukkan nama lengkap"
               value={form.nama} onChange={ubah} autoComplete="name" required />
        <Kolom id="nis_niy" label={aktif.nomor} Icon={Contact} placeholder={aktif.placeholder}
               value={form.nis_niy} onChange={ubah} required />
        <Kolom id="email" label="Email" Icon={Mail} type="email" placeholder="Masukkan email aktif"
               value={form.email} onChange={ubah} autoComplete="email" required />
        <Kolom id="no_hp" label="Nomor WhatsApp" Icon={Phone} type="tel" placeholder="Masukkan nomor WhatsApp"
               value={form.no_hp} onChange={ubah} autoComplete="tel" required />
        <Kolom id="password" label="Password" Icon={Lock} toggle placeholder="Minimal 6 karakter"
               value={form.password} onChange={ubah} autoComplete="new-password" required />
        <Kolom id="konfirmasi" label="Konfirmasi Password" Icon={Lock} toggle placeholder="Ulangi password"
               value={form.konfirmasi} onChange={ubah} autoComplete="new-password" required />

        {galat && <p className="au-pesan galat" role="alert">{galat}</p>}

        <button className="au-tombol" type="submit" disabled={mengirim}>
          <UserPlus size={18} /> {mengirim ? 'Memproses...' : 'Daftar'}
        </button>
      </form>

      <div className="au-atau">atau</div>
      <Link to="/login" state={{ peran, dari }} className="au-tombol garis">
        <LogIn size={18} /> Sudah punya akun? Login
      </Link>
    </AuthLayout>
  );
}