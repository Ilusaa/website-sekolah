import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, ChevronRight, Landmark, Target, Network, Building2, Clock, Leaf, Camera, User,
} from 'lucide-react';
import './Profil.css';

/* ====== UBAH ISI HALAMAN DI SINI ====== */
// Foto: simpan di folder client/public/foto/ dengan nama sesuai di bawah.
const fotoGedung = '/foto/gedung.jpg';

const kegiatan = [
  { src: '/foto/kegiatan-1.jpg', ket: 'Kegiatan belajar mengajar' },
  { src: '/foto/kegiatan-2.jpg', ket: 'Kegiatan keagamaan' },
  { src: '/foto/kegiatan-3.jpg', ket: 'Kegiatan ekstrakurikuler' },
];

// CONTOH: ganti dengan visi dan misi resmi sekolah
const visi = 'Mewujudkan generasi yang berilmu, berakhlak mulia, dan siap menghadapi tantangan masa depan.';
const misi = [
  'Menyelenggarakan pembelajaran yang berkualitas dan berpusat pada peserta didik.',
  'Menanamkan nilai-nilai keislaman dan akhlak mulia dalam kehidupan sehari-hari.',
  'Mendorong prestasi akademik dan nonakademik peserta didik.',
  'Menciptakan lingkungan belajar yang nyaman, aman, dan bersih.',
];

// CONTOH: ganti dengan nama dan jabatan yang sebenarnya
const kepalaSekolah = { jabatan: 'Kepala Sekolah', nama: 'Nama Kepala Sekolah' };
const struktur = [
  { jabatan: 'Wakil Kepala Sekolah Bidang Kurikulum', nama: 'Nama Wakil Kepala' },
  { jabatan: 'Wakil Kepala Sekolah Bidang Kesiswaan', nama: 'Nama Wakil Kepala' },
  { jabatan: 'Wakil Kepala Sekolah Bidang Sarana', nama: 'Nama Wakil Kepala' },
  { jabatan: 'Kepala Tata Usaha', nama: 'Nama Kepala TU' },
];

// CONTOH: ganti dengan fasilitas yang benar-benar ada
const sarana = [
  { nama: 'Ruang Kelas', ket: 'Ruang belajar yang nyaman untuk peserta didik.' },
  { nama: 'Masjid / Musala', ket: 'Tempat ibadah dan kegiatan keagamaan.' },
  { nama: 'Perpustakaan', ket: 'Koleksi buku bacaan dan referensi.' },
  { nama: 'Laboratorium', ket: 'Sarana praktik pembelajaran.' },
  { nama: 'Lapangan', ket: 'Sarana olahraga dan upacara.' },
];

// Tahun berdiri dari data sekolah; baris lain CONTOH, ganti dengan sejarah sebenarnya
const sejarah = [
  { tahun: '2008', teks: 'SMAS AL-BIRRU Parepare berdiri pada 8 Agustus 2008.' },
  { tahun: '20xx', teks: 'Isi dengan peristiwa penting berikutnya, misalnya pembangunan gedung atau akreditasi.' },
  { tahun: 'Kini', teks: 'Terus berupaya mencetak generasi yang berilmu, berakhlak mulia, dan berprestasi.' },
];
/* ======================================= */

const tab = [
  { id: 'profil', label: 'Profil Sekolah', Icon: Landmark },
  { id: 'visi-misi', label: 'Visi & Misi', Icon: Target },
  { id: 'struktur', label: 'Struktur Organisasi', Icon: Network },
  { id: 'sarana', label: 'Sarana & Prasarana', Icon: Building2 },
  { id: 'sejarah', label: 'Sejarah', Icon: Clock },
];

// Menampilkan foto; kalau file belum ada, tampil kotak hijau berisi nama file yang harus disimpan
function Foto({ src, alt }) {
  const [rusak, setRusak] = useState(false);
  if (rusak) {
    return (
      <div className="pf-kosong">
        <Camera size={26} />
        <span>Tambahkan foto:<br />{src}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setRusak(true)} />;
}

export default function Profil() {
  const [aktif, setAktif] = useState('profil');

  // Tab aktif mengikuti bagian yang sedang terlihat saat di-scroll
  useEffect(() => {
    const pengamat = new IntersectionObserver(
      (daftar) => daftar.forEach((e) => e.isIntersecting && setAktif(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    tab.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) pengamat.observe(el);
    });
    return () => pengamat.disconnect();
  }, []);

  function keBagian(id) {
    const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: kurangiGerak ? 'auto' : 'smooth', block: 'start' });
  }

  return (
    <div className="pf">
      <section className="pf-banner">
        <nav className="pf-remah" aria-label="Jejak halaman">
          <Link to="/" aria-label="Beranda"><Home size={16} /></Link>
          <Link to="/">Beranda</Link>
          <ChevronRight size={14} />
          <span aria-current="page">Profil Sekolah</span>
        </nav>
        <h1>Profil Sekolah</h1>
        <p>
          Kenali lebih dekat SMAS AL-BIRRU Parepare, sekolah yang berkomitmen mencetak generasi berilmu,
          berakhlak mulia, dan siap menghadapi tantangan masa depan.
        </p>
      </section>

      <div className="pf-tab-bar">
        <div className="pf-tab" role="tablist" aria-label="Bagian profil">
          {tab.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              className={aktif === id ? 'aktif' : ''}
              aria-current={aktif === id ? 'true' : undefined}
              onClick={() => keBagian(id)}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Profil Sekolah */}
      <section id="profil" className="pf-bagian">
        <div className="pf-profil">
          <div className="pf-teks">
            <h2><Landmark size={26} /> Profil Sekolah</h2>
            <p>
              SMAS AL-BIRRU Parepare adalah salah satu sekolah menengah atas yang berada di bawah naungan
              Yayasan Al-Birru. Sekolah ini berkomitmen untuk memberikan pendidikan berkualitas dengan
              mengintegrasikan ilmu pengetahuan, teknologi, dan nilai-nilai keislaman.
            </p>
            <p>
              Dengan lingkungan belajar yang nyaman, tenaga pendidik yang profesional, serta sarana prasarana
              yang memadai, SMAS AL-BIRRU Parepare terus berupaya mencetak generasi yang berilmu, berakhlak
              mulia, dan siap menghadapi tantangan masa depan.
            </p>
            <blockquote className="pf-kutipan">
              <Leaf size={28} />
              <span>“Bersama Membangun Generasi Islami, Cerdas, dan Berkarakter”</span>
            </blockquote>
          </div>

          <figure className="pf-foto">
            <Foto src={fotoGedung} alt="Gedung SMAS AL-BIRRU Parepare" />
          </figure>

          <aside className="pf-kegiatan">
            <h3><Camera size={20} /> Kegiatan Sekolah</h3>
            <div className="pf-galeri">
              {kegiatan.map(({ src, ket }) => (
                <figure key={src}>
                  <Foto src={src} alt={ket} />
                  <figcaption>{ket}</figcaption>
                </figure>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* 2. Visi & Misi */}
      <section id="visi-misi" className="pf-bagian">
        <h2><Target size={26} /> Visi &amp; Misi</h2>
        <div className="pf-dua">
          <div className="pf-kartu">
            <h3>Visi</h3>
            <p>{visi}</p>
          </div>
          <div className="pf-kartu">
            <h3>Misi</h3>
            <ol className="pf-misi">
              {misi.map((m) => <li key={m}>{m}</li>)}
            </ol>
          </div>
        </div>
      </section>

      {/* 3. Struktur Organisasi */}
      <section id="struktur" className="pf-bagian">
        <h2><Network size={26} /> Struktur Organisasi</h2>
        <div className="pf-kepala">
          <div className="pf-orang besar">
            <span className="pf-avatar"><User size={28} /></span>
            <strong>{kepalaSekolah.nama}</strong>
            <span>{kepalaSekolah.jabatan}</span>
          </div>
        </div>
        <div className="pf-struktur">
          {struktur.map(({ jabatan, nama }) => (
            <div className="pf-orang" key={jabatan}>
              <span className="pf-avatar"><User size={24} /></span>
              <strong>{nama}</strong>
              <span>{jabatan}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Sarana & Prasarana */}
      <section id="sarana" className="pf-bagian">
        <h2><Building2 size={26} /> Sarana &amp; Prasarana</h2>
        <div className="pf-sarana">
          {sarana.map(({ nama, ket }) => (
            <div className="pf-kartu" key={nama}>
              <h3>{nama}</h3>
              <p>{ket}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Sejarah */}
      <section id="sejarah" className="pf-bagian">
        <h2><Clock size={26} /> Sejarah</h2>
        <ol className="pf-garis-waktu">
          {sejarah.map(({ tahun, teks }) => (
            <li key={tahun}>
              <strong>{tahun}</strong>
              <p>{teks}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}