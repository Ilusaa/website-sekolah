import { visi, misi } from '../../data/profil.js';

export default function VisiMisi() {
  return (
    <section className="pf-bagian">
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
  );
}