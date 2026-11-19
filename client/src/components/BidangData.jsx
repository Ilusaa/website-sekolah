import { formatTanggal } from '../data/akademik.js';
import './DataDiri.css';

export default function BidangData({ bidang, data, edit, onUbah }) {
  return (
    <div className="dt-grid">
      {bidang.map((b) => {
        const kelas = 'dt-bidang' + (b.penuh ? ' penuh' : '');
        const nilai = data[b.name] ?? '';

        if (!edit) {
          const tampil = b.type === 'date' ? formatTanggal(nilai) : nilai;
          return (
            <div key={b.name} className={kelas}>
              <span className="dt-label">{b.label}</span>
              <p className="dt-nilai">{tampil || '-'}</p>
            </div>
          );
        }

        return (
          <label key={b.name} className={kelas}>
            <span className="dt-label">{b.label}</span>
            {b.type === 'select' ? (
              <select value={nilai} onChange={(e) => onUbah(b.name, e.target.value)}>
                {b.pilihan.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            ) : b.type === 'textarea' ? (
              <textarea
                rows={3}
                value={nilai}
                onChange={(e) => onUbah(b.name, e.target.value)}
              />
            ) : (
              <input
                type={b.type}
                value={nilai}
                onChange={(e) => onUbah(b.name, e.target.value)}
              />
            )}
          </label>
        );
      })}
    </div>
  );
}