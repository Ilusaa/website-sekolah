
import { Landmark, Leaf, Camera } from 'lucide-react';
import GedungSekolah from '../../assets/GedungSekolah.jpeg';
import { kegiatan } from '../../data/profil.js';

export default function ProfilSekolah() {
  return (
    <section className="pf-bagian">
      <div className="pf-profil">

        {/* PROFIL SEKOLAH */}
        <div className="pf-teks">
          <h2>
            <Landmark size={23} />
            Profil Sekolah
          </h2>

          <p>
            SMAS AL-BIRRU Parepare adalah salah satu sekolah
            menengah atas yang berada di bawah naungan Yayasan
            Al-Birru. Sekolah ini berkomitmen untuk memberikan
            pendidikan berkualitas dengan mengintegrasikan ilmu
            pengetahuan, teknologi, dan nilai-nilai keislaman.
          </p>

          <p>
            Dengan lingkungan belajar yang nyaman, tenaga
            pendidik yang profesional, serta sarana prasarana
            yang memadai, SMAS AL-BIRRU Parepare terus berupaya
            mencetak generasi yang berilmu, berakhlak mulia,
            dan siap menghadapi tantangan masa depan.
          </p>

          <blockquote className="pf-kutipan">
            <Leaf size={28} />
            <span>
              “Bersama Membangun Generasi Islami,
              Cerdas, dan Berkarakter”
            </span>
          </blockquote>
        </div>

        {/* FOTO GEDUNG SEKOLAH */}
        <figure className="pf-foto">
          <img
            src={GedungSekolah}
            alt="Gedung SMAS AL-BIRRU Parepare"
            loading="lazy"
          />
        </figure>

        {/* KEGIATAN SEKOLAH */}
        <aside className="pf-kegiatan">
          <h3>
            <Camera size={20} />
            Kegiatan Sekolah
          </h3>

          <div className="pf-galeri">
            {kegiatan.map(({ src, ket }, index) => (
              <figure key={src || index}>
                <img
                  src={src}
                  alt={ket}
                  loading="lazy"
                />
                <figcaption>{ket}</figcaption>
              </figure>
            ))}
          </div>
        </aside>

      </div>
    </section>
  );
}