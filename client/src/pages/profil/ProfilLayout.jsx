import { useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Home, ChevronRight, Landmark, Target, Network, Building2, Clock } from 'lucide-react';
import './Profil.css';

const tab = [
  { to: '/profil', label: 'Profil Sekolah', Icon: Landmark, end: true },
  { to: '/profil/VisiMisi', label: 'Visi & Misi', Icon: Target },
  { to: '/profil/Struktur', label: 'Struktur Organisasi', Icon: Network },
  { to: '/profil/Sarana', label: 'Sarana & Prasarana', Icon: Building2 },
  { to: '/profil/Sejarah', label: 'Sejarah', Icon: Clock },
];

export default function ProfilLayout() {
  const { pathname } = useLocation();

  // Normalisasi: abaikan huruf besar/kecil dan garis miring di akhir
  const path = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  const halaman = tab.find((t) => t.to.toLowerCase() === path) ?? tab[0];
  const beranda = halaman.to === '/profil';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="pf">
      <section className="pf-banner">
        <nav className="pf-remah" aria-label="Jejak halaman">
          <Link to="/" aria-label="Beranda"><Home size={16} /></Link>
          <Link to="/">Beranda</Link>
          <ChevronRight size={14} />
          {beranda ? (
            <span aria-current="page">Profil Sekolah</span>
          ) : (
            <>
              <Link to="/profil">Profil Sekolah</Link>
              <ChevronRight size={14} />
              <span aria-current="page">{halaman.label}</span>
            </>
          )}
        </nav>
        <h1>{halaman.label}</h1>
        <p>
          Kenali lebih dekat SMAS AL-BIRRU Parepare, sekolah yang berkomitmen mencetak generasi berilmu,
          berakhlak mulia, dan siap menghadapi tantangan masa depan.
        </p>
      </section>

      <div className="pf-tab-bar">
        <nav className="pf-tab" aria-label="Bagian profil">
          {tab.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? 'aktif' : '')}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <Outlet />
    </div>
  );
}