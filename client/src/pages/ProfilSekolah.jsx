
import { Landmark, Leaf } from 'lucide-react';
import Foto from '../../components/Foto.jsx';
import GaleriKegiatan from '../../components/GaleriKegiatan.jsx';
import { fotoGedung } from '../../data/profil.js';

export default function ProfilSekolah() {
  return (
    <section className="pf-bagian">
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
      </div>

      {/* Galeri kegiatan: admin bisa menambah/menghapus foto */}
      <GaleriKegiatan />
    </section>
  );
}
