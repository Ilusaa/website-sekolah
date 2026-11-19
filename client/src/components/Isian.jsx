// Form isian: tampil sebagai teks biasa, berubah jadi bisa diketik saat edit.
export default function Isian({ bidang, data, edit, onChange }) {
  return (
    <div className="pf-grid">
      {bidang.map((b) => {
        const id = `isi-${b.nama}`;
        const umum = {
          id,
          className: 'pf-input',
          value: data[b.nama] ?? '',
          disabled: !edit,
          onChange: (e) => onChange(b.nama, e.target.value),
        };
        return (
          <div key={b.nama} className={`pf-bidang${b.lebar ? ' lebar' : ''}`}>
            <label htmlFor={id}>{b.label}</label>
            {b.tipe === 'pilih' ? (
              <select {...umum}>
                <option value="">-</option>
                {b.pilihan.map((p) => <option key={p}>{p}</option>)}
              </select>
            ) : b.tipe === 'area' ? (
              <textarea rows={2} {...umum} />
            ) : (
              <input type={b.tipe || 'text'} {...umum} />
            )}
          </div>
        );
      })}
    </div>
  );
}