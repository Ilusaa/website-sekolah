import { sarana } from '../../data/profil.js';

export default function Sarana() {
  return (
    <section className="pf-bagian">
      <div className="pf-sarana">
        {sarana.map(({ nama, ket }) => (
          <div className="pf-kartu" key={nama}>
            <h3>{nama}</h3>
            <p>{ket}</p>
          </div>
        ))}
      </div>
    </section>
  );
}