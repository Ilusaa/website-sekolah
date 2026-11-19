import { User } from 'lucide-react';
import { kepalaSekolah, struktur } from '../../data/profil.js';

export default function Struktur() {
  return (
    <section className="pf-bagian">
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
  );
}