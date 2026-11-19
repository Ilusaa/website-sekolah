import { sejarah } from '../../data/profil.js';

export default function Sejarah() {
  return (
    <section className="pf-bagian">
      <ol className="pf-garis-waktu">
        {sejarah.map(({ tahun, teks }) => (
          <li key={tahun}>
            <strong>{tahun}</strong>
            <p>{teks}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}