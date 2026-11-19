import { useState } from 'react';
import { Camera } from 'lucide-react';
import GedungSekolah from '../assets/GedungSekolah.jpeg';

export default function Foto({
  src = GedungSekolah,
  alt = 'Gedung Sekolah SMAS AL-BIRRU'
}) {
  const [rusak, setRusak] = useState(false);

  if (rusak) {
    return (
      <div className="pf-kosong">
        <Camera size={23} />
        <span>Foto tidak ditemukan</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setRusak(true)}
    />
  );
}
