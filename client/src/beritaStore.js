import { useSyncExternalStore } from 'react';

// Penyimpanan sementara di localStorage browser. Ganti dengan API server (tabel `berita`) bila siap.
const KUNCI = 'berita_smas_albirru';
export const KATEGORI = ['Kegiatan Sekolah', 'Prestasi', 'Pengumuman', 'Agenda'];

const AWAL = [
  { id: 1, judul: 'Upacara Peringatan Hari Sumpah Pemuda', kategori: 'Kegiatan Sekolah', tanggal: '2026-10-28', dilihat: 245, gambar: '', isi: 'SMAS AL-BIRRU Parepare menggelar upacara peringatan Hari Sumpah Pemuda yang diikuti seluruh siswa, guru, dan tenaga kependidikan.\n\nPada kesempatan ini, siswa diajak meneladani semangat persatuan para pemuda dalam membangun bangsa.' },
  { id: 2, judul: 'Siswa SMAS AL-BIRRU Raih Juara 1 Lomba Olimpiade Sains', kategori: 'Prestasi', tanggal: '2026-10-25', dilihat: 189, gambar: '', isi: 'Siswa kelas XI IPA berhasil meraih juara 1 pada Lomba Olimpiade Sains tingkat kota. Prestasi ini menjadi kebanggaan seluruh warga sekolah.' },
  { id: 3, judul: 'Pengumuman Jadwal Ujian Semester Ganjil 2026/2027', kategori: 'Pengumuman', tanggal: '2026-10-20', dilihat: 312, gambar: '', isi: 'Ujian Semester Ganjil akan dilaksanakan sesuai jadwal yang telah ditetapkan. Siswa diharapkan mempersiapkan diri dan membawa kartu ujian.' },
  { id: 4, judul: 'Kalender Akademik Semester Ganjil 2026/2027', kategori: 'Agenda', tanggal: '2026-10-18', dilihat: 176, gambar: '', isi: 'Kalender akademik semester ganjil telah ditetapkan, memuat jadwal kegiatan belajar, ujian, dan libur sekolah.' },
  { id: 5, judul: 'Kegiatan Bakti Sosial di Panti Asuhan', kategori: 'Kegiatan Sekolah', tanggal: '2026-10-15', dilihat: 142, gambar: '', isi: 'Pengurus OSIS bersama guru mengadakan bakti sosial di panti asuhan sebagai wujud kepedulian dan akhlak mulia.' },
  { id: 6, judul: 'Informasi Libur Nasional Maulid Nabi Muhammad SAW', kategori: 'Pengumuman', tanggal: '2026-10-12', dilihat: 201, gambar: '', isi: 'Sekolah diliburkan pada peringatan Maulid Nabi Muhammad SAW. Kegiatan belajar mengajar kembali normal pada hari berikutnya.' },
  { id: 7, judul: 'Lomba Pidato Bahasa Inggris Antar Kelas', kategori: 'Kegiatan Sekolah', tanggal: '2026-10-08', dilihat: 98, gambar: '', isi: 'Lomba pidato bahasa Inggris diikuti perwakilan seluruh kelas dan berlangsung meriah.' },
  { id: 8, judul: 'Tim Futsal Putra Lolos Semifinal Tingkat Kota', kategori: 'Prestasi', tanggal: '2026-10-05', dilihat: 120, gambar: '', isi: 'Tim futsal putra SMAS AL-BIRRU lolos ke babak semifinal setelah menang dramatis di babak perempat final.' },
];

let data = muat();
const pendengar = new Set();

function muat() {
  try { const s = localStorage.getItem(KUNCI); if (s) return JSON.parse(s); } catch { /* abaikan */ }
  return AWAL;
}
function ubah(baru) {
  data = baru;
  try { localStorage.setItem(KUNCI, JSON.stringify(data)); } catch { /* penyimpanan penuh */ }
  pendengar.forEach((f) => f());
}

export const useBerita = () =>
  useSyncExternalStore((f) => { pendengar.add(f); return () => pendengar.delete(f); }, () => data);

// Tanggal hari ini menurut jam di komputer pengguna (bukan UTC), format YYYY-MM-DD.
export const hariIni = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const simpanBerita = (b) =>
  ubah(b.id ? data.map((x) => (x.id === b.id ? { ...x, ...b } : x))
            : [{ ...b, id: Date.now(), dilihat: 0, tanggal: b.tanggal || hariIni() }, ...data]);
export const hapusBerita = (id) => ubah(data.filter((x) => x.id !== id));
export const tambahDilihat = (id) => ubah(data.map((x) => (x.id === id ? { ...x, dilihat: x.dilihat + 1 } : x)));

const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
export const tgl = (iso) => { const [y, m, d] = iso.split('-'); return `${+d} ${BULAN[+m - 1]} ${y}`; };
export const warna = (k) => ({ 'Kegiatan Sekolah': 'hijau', Prestasi: 'kuning', Pengumuman: 'biru', Agenda: 'ungu' }[k] || 'hijau');

// Perkecil gambar (maks 900px) agar muat di localStorage.
export function bacaGambar(file) {
  return new Promise((ok, gagal) => {
    const r = new FileReader();
    r.onerror = gagal;
    r.onload = () => {
      const img = new Image();
      img.onerror = gagal;
      img.onload = () => {
        const s = Math.min(1, 900 / img.width);
        const c = document.createElement('canvas');
        c.width = img.width * s; c.height = img.height * s;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        ok(c.toDataURL('image/jpeg', 0.8));
      };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  });
}