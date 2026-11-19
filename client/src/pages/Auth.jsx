import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

export default function Auth({ mode }) {
  const daftar = mode === 'daftar';
  const [form, setForm] = useState({ nama: '', email: '', password: '' });
  const [pesan, setPesan] = useState('');
  const { masuk } = useAuth();
  const nav = useNavigate();

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function kirim(e) {
    e.preventDefault();
    setPesan('');
    try {
      const res = await fetch(`/api/auth/${daftar ? 'daftar' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setPesan(data.pesan);
      if (daftar) return nav('/login');
      masuk(data.token, data.user);
      nav('/');
    } catch {
      setPesan('Tidak dapat terhubung ke server.');
    }
  }

  return (
    <section className="halaman">
      <form className="form" onSubmit={kirim}>
        <h1>{daftar ? 'Daftar akun' : 'Masuk'}</h1>
        {daftar && (
          <label>Nama lengkap<input name="nama" value={form.nama} onChange={ubah} required /></label>
        )}
        <label>Email<input type="email" name="email" value={form.email} onChange={ubah} required /></label>
        <label>Password<input type="password" name="password" value={form.password} onChange={ubah} minLength={daftar ? 8 : undefined} required /></label>
        {pesan && <p className="galat" role="alert">{pesan}</p>}
        <button className="btn btn-isi btn-besar" type="submit">{daftar ? 'Daftar' : 'Login'}</button>
        <p className="alt">
          {daftar ? <>Sudah punya akun? <Link to="/login">Login</Link></> : <>Belum punya akun? <Link to="/daftar">Daftar</Link></>}
        </p>
      </form>
    </section>
  );
}
