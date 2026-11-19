import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import {
  Home, ChevronRight, Landmark, Contact, MapPin, CalendarDays, ShieldCheck, Star,
  GraduationCap, Copy, Check, ExternalLink, Navigation,
} from 'lucide-react';
import './Informasi.css';

L.Icon.Default.mergeOptions({ iconRetinaUrl: marker2x, iconUrl: marker, shadowUrl: shadow });

/* ====== UBAH DATA SEKOLAH DI SINI ====== */
const dataSekolah = [
  { label: 'Nama Sekolah', nilai: 'SMAS AL-BIRRU Parepare', Icon: Landmark },
  { label: 'NPSN', nilai: '69984296', Icon: Contact },
  { label: 'Alamat', nilai: 'Jl. Marham Raya, Kelurahan Bumi Harapan, Kec. Bacukiki Barat, Kota Parepare, Sulawesi Selatan', Icon: MapPin },
  { label: 'Tahun Berdiri', nilai: '08 Agustus 2008', Icon: CalendarDays },
  { label: 'Status Sekolah', nilai: 'Swasta', Icon: ShieldCheck },
  { label: 'Akreditasi', nilai: 'C', Icon: Star },
  { label: 'Kurikulum', nilai: 'Merdeka', Icon: GraduationCap },
];

const lokasi = {
  nama: 'SMAS AL-BIRRU Parepare',
  alamat: 'Jl. Marham Raya, Kelurahan Bumi Harapan, Kec. Bacukiki Barat, Kota Parepare',
  latitude: -4.0298625,
  longitude: 119.6353281,
};
/* ======================================= */

export default function Informasi() {
  const [tersalin, setTersalin] = useState(false);
  const [galat, setGalat] = useState('');

  const { latitude: lat, longitude: lng } = lokasi;
  const teksKoordinat = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

  async function salin() {
    try {
      await navigator.clipboard.writeText(`${lat}, ${lng}`);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2000);
    } catch {
      setGalat('Koordinat tidak dapat disalin otomatis.');
    }
  }

  return (
    <div className="info">
      <section className="info-banner">
        <nav className="info-remah" aria-label="Jejak halaman">
          <Link to="/" aria-label="Beranda"><Home size={16} /></Link>
          <ChevronRight size={14} />
          <Link to="/">Beranda</Link>
          <ChevronRight size={14} />
          <span aria-current="page">Informasi</span>
        </nav>
        <h1>Informasi Sekolah</h1>
        <p>Informasi lokasi dan kontak SMAS AL-BIRRU Parepare.</p>
      </section>

      {galat && <p className="galat info-galat" role="alert">{galat}</p>}

      <div className="info-grid">
        <section className="info-kartu">
          <header className="info-kepala">
            <span className="info-ikon"><Landmark size={24} /></span>
            <div>
              <h2>Informasi Sekolah</h2>
              <p>Berikut adalah informasi lengkap mengenai SMAS AL-BIRRU Parepare.</p>
            </div>
          </header>

          <dl className="info-data">
            {dataSekolah.map(({ label, nilai, Icon }) => (
              <div className="info-baris" key={label}>
                <dt><Icon size={20} /> {label}</dt>
                <dd>{nilai}</dd>
              </div>
            ))}
          </dl>

          <div className="info-koordinat">
            <span className="info-ikon kecil"><MapPin size={22} /></span>
            <div>
              <strong>Koordinat Sekolah</strong>
              <span>{teksKoordinat}</span>
            </div>
            <button type="button" className="info-salin" onClick={salin}>
              {tersalin ? <Check size={16} /> : <Copy size={16} />}
              {tersalin ? 'Tersalin' : 'Salin koordinat'}
            </button>
          </div>
        </section>

        <section className="info-kartu">
          <header className="info-kepala">
            <span className="info-ikon"><MapPin size={24} /></span>
            <div>
              <h2>Peta Lokasi</h2>
              <p>Lokasi SMAS AL-BIRRU Parepare pada peta.</p>
            </div>
          </header>

          <div className="info-peta">
            <MapContainer center={[lat, lng]} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[lat, lng]}>
                <Popup><strong>{lokasi.nama}</strong><br />{lokasi.alamat}</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="info-tombol">
            <a className="btn btn-isi" target="_blank" rel="noreferrer"
               href="https://maps.app.goo.gl/GBVa1MJmBBYbbVie6">
              <ExternalLink size={16} /> Buka di Google Maps
            </a>
            <a className="btn btn-garis" target="_blank" rel="noreferrer"
               href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}>
              <Navigation size={16} /> Petunjuk Arah
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}