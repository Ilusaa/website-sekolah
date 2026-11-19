import { Link } from 'react-router-dom';
import { FaArrowRight, FaLandmark } from 'react-icons/fa';

export default function Beranda() {
  return (
    <section className="hero">
      <div className="hero-isi">
        <p className="semboyan">BERILMU <i /> BERAKHLAK <i /> BERPRESTASI</p>
        <h1>Selamat Datang di<br />SMAS AL-BIRRU Parepare</h1>
        <p className="sub">Mewujudkan generasi yang berilmu, berakhlak mulia, dan siap menghadapi tantangan masa depan.</p>
        <div className="hero-tombol">
          <Link to="/profil" className="btn btn-isi btn-besar">Jelajahi Sekolah <FaArrowRight /></Link>
          <Link to="/profil" className="btn btn-garis btn-besar"><FaLandmark /> Profil Sekolah</Link>
        </div>
      </div>
    </section>
  );
}