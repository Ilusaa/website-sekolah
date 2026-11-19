import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/logo.jpeg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-kiri">
        <img src={logo} alt="" />
        <strong>SMAS AL-BIRRU Parepare</strong>
        <em>Berilmu • Berakhlak • Berprestasi</em>
      </div>
      <div className="footer-kanan">
        {/* Ganti '#' dengan alamat akun resmi sekolah */}
        <a href="#" aria-label="Facebook"><FaFacebook /></a>
        <a href="#" aria-label="Instagram"><FaInstagram /></a>
        <a href="#" aria-label="YouTube"><FaYoutube /></a>
        <a href="#" aria-label="Email"><FaEnvelope /></a>
        <span className="lokasi"><FaMapMarkerAlt /> Parepare, Sulawesi Selatan</span>
      </div>
    </footer>
  );
}