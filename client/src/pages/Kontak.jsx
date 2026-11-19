import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, ChevronRight, School, Phone, Mail, Clock, Globe, Facebook, Instagram, Youtube, Music2, Send, MapPin,
} from 'lucide-react';
import './Kontak.css';

// Ubah data di bawah ini sesuai data sekolah yang sebenarnya.
const SEKOLAH = {
  nama: 'SMAS AL-BIRRU Parepare',
  alamat: ['Jl. Pendidikan No. 123,', 'Kota Parepare, Sulawesi Selatan', '(91131)'],
  telepon: '(+62) 82352561761',
  email: 'info@albirru.sch.id',
  jam: ['Senin – Jumat', '07.00 – 15.00 WITA'],
  peta: 'SMAS AL-BIRRU Parepare, Jl. Pendidikan, Parepare, Sulawesi Selatan',
  sosial: [
    { nama: 'Facebook', Icon: Facebook, url: 'https://facebook.com/' },
    { nama: 'Instagram', Icon: Instagram, url: 'https://instagram.com/' },
    { nama: 'YouTube', Icon: Youtube, url: 'https://youtube.com/' },
    { nama: 'TikTok', Icon: Music2, url: 'https://tiktok.com/' },
  ],
};

const SUBJEK = ['Informasi Umum', 'Pendaftaran Siswa Baru', 'Akademik', 'Kerja Sama', 'Saran dan Masukan', 'Lainnya'];
const AWAL = { nama: '', email: '', subjek: '', pesan: '' };

export default function Kontak() {
  const [f, setF] = useState(AWAL);
  const [status, setStatus] = useState({ jenis: '', teks: '' });
  const [mengirim, setMengirim] = useState(false);
  const ubah = (e) => setF({ ...f, [e.target.name]: e.target.value });

  async function kirim(e) {
    e.preventDefault();
    setStatus({ jenis: '', teks: '' });
    if (!f.nama.trim() || !f.email.trim() || !f.subjek || !f.pesan.trim())
      return setStatus({ jenis: 'galat', teks: 'Isi semua kolom yang bertanda bintang.' });
    if (!/^\S+@\S+\.\S+$/.test(f.email))
      return setStatus({ jenis: 'galat', teks: 'Format email belum benar.' });

    setMengirim(true);
    try {
      const res = await fetch('/api/kontak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setStatus({ jenis: 'galat', teks: data.pesan || 'Pesan gagal dikirim.' });
      setStatus({ jenis: 'ok', teks: data.pesan || 'Pesan terkirim. Kami akan membalas secepatnya.' });
      setF(AWAL);
    } catch {
      setStatus({ jenis: 'galat', teks: 'Tidak dapat terhubung ke server.' });
    } finally {
      setMengirim(false);
    }
  }

  return (
    <div className="kt">
      <section className="kt-hero">
        <div className="kt-wrap">
          <nav className="kt-remah" aria-label="Breadcrumb">
            <Home size={16} /><Link to="/">Beranda</Link><ChevronRight size={14} /><strong>Kontak</strong>
          </nav>
          <h1>Kontak</h1>
          <p>Kami siap membantu dan melayani informasi terkait {SEKOLAH.nama}.</p>
        </div>
      </section>

      <div className="kt-wrap kt-isi">
        <ul className="kt-info">
          <li>
            <span className="kt-ikon"><School size={30} /></span>
            <div><h2>Alamat Sekolah</h2>{SEKOLAH.alamat.map((a) => <p key={a}>{a}</p>)}</div>
          </li>
          <li>
            <span className="kt-ikon"><Phone size={28} /></span>
            <div><h2>Telepon</h2><p><a href={`tel:${SEKOLAH.telepon.replace(/[^\d+]/g, '')}`}>{SEKOLAH.telepon}</a></p><p>(Info / Admin)</p></div>
          </li>
          <li>
            <span className="kt-ikon"><Mail size={28} /></span>
            <div><h2>Email</h2><p><a href={`mailto:${SEKOLAH.email}`}>{SEKOLAH.email}</a></p></div>
          </li>
          <li>
            <span className="kt-ikon"><Clock size={28} /></span>
            <div><h2>Jam Pelayanan</h2>{SEKOLAH.jam.map((j) => <p key={j}>{j}</p>)}</div>
          </li>
          <li>
            <span className="kt-ikon"><Globe size={28} /></span>
            <div>
              <h2>Media Sosial</h2>
              <div className="kt-sosial">
                {SEKOLAH.sosial.map(({ nama, Icon, url }) => (
                  <a key={nama} href={url} target="_blank" rel="noopener noreferrer" aria-label={nama}><Icon size={18} /></a>
                ))}
              </div>
            </div>
          </li>
        </ul>

        <div className="kt-dua">
          <section className="kt-kartu">
            <header>
              <Send size={32} />
              <div><h2>Kirim Pesan</h2><p>Silakan isi formulir di bawah ini untuk menghubungi kami.</p></div>
            </header>
            <form onSubmit={kirim} noValidate>
              <div className="kt-baris">
                <label>Nama Lengkap *
                  <input name="nama" value={f.nama} onChange={ubah} placeholder="Masukkan nama Anda" autoComplete="name" />
                </label>
                <label>Email *
                  <input name="email" type="email" value={f.email} onChange={ubah} placeholder="contoh@email.com" autoComplete="email" />
                </label>
              </div>
              <label>Subjek *
                <select name="subjek" value={f.subjek} onChange={ubah}>
                  <option value="">Pilih subjek pesan</option>
                  {SUBJEK.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label>Pesan *
                <textarea name="pesan" rows="5" value={f.pesan} onChange={ubah} placeholder="Tulis pesan Anda di sini..." />
              </label>
              {status.teks && <p className={`kt-status ${status.jenis}`} role={status.jenis === 'galat' ? 'alert' : 'status'}>{status.teks}</p>}
              <button className="kt-kirim" type="submit" disabled={mengirim}>
                <Send size={17} /> {mengirim ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </section>

          <section className="kt-kartu">
            <header>
              <MapPin size={32} />
              <div><h2>Lokasi Kami</h2><p>Temukan kami di peta berikut atau kunjungi langsung sekolah.</p></div>
            </header>
            <iframe
              className="kt-peta" title={`Peta lokasi ${SEKOLAH.nama}`} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SEKOLAH.peta)}&output=embed`}
            />
          </section>
        </div>
      </div>
    </div>
  );
}