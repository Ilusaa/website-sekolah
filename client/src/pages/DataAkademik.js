// Data & penyimpanan bersama untuk halaman Guru dan Siswa.
// Perubahan yang diedit disimpan di localStorage (per browser). Ganti dengan API/database jika sudah ada.
const KEY = 'albirru-akademik-v1';

export const inisial = (n) =>
  n.split(',')[0]
    .replace(/^(Drs\.|Dr\.|H\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('');

/* ---------------- GURU ---------------- */
const KOSONG_GURU = { jk: '', tempat: '', lahir: '', hp: '', email: '', pendidikan: '', alamat: '', bio: '' };

const GURU_AWAL = [
  { id: 1,  nama: 'ZAINUDDIN, S.Pd.I',      jabatan: ['Kepala Sekolah'], niy: '0437310784014009', status: '', mapel: '', kategori: 'Struktural', foto: '' },
  { id: 2,  nama: 'SURIAYANI, S.Sy',        jabatan: ['Wakil Kepala Sekolah', 'Kepala Perpustakaan', 'Wali Kelas XI', 'Guru'], niy: '0437150592014015', status: 'GTY', mapel: 'Pendidikan Agama Islam & Baca Tulis Quran', kategori: 'Struktural', foto: '' },
  { id: 3,  nama: 'H.ANTON, S.Sos., M.Pd',  jabatan: ['Tahfidz Putera', 'Guru'], niy: '', status: 'PTY', mapel: 'Bimbingan Konseling (BK)', kategori: 'Guru', foto: '' },
  { id: 4,  nama: 'MUHAMMAD IDRIS, S.Pd',   jabatan: ['WAKASEK Bidang Kurikulum', 'Pembina Putra Bidang Olahraga', 'Guru'], niy: '02081202024056', status: 'GTTY', mapel: 'Matematika Wajib & Matematika Peminatan', kategori: 'Guru', foto: '' },
  { id: 5,  nama: 'SUKMAWATI, S.Pd',        jabatan: ['Guru'], niy: '043240690020032', status: 'GTY', mapel: 'Sejarah', kategori: 'Guru', foto: '' },
  { id: 6,  nama: 'ARFIAH SAMAD, ST',       jabatan: ['Staff Perpustakaan', 'Guru'], niy: '24021001197859', status: 'GTY', mapel: 'Fisika, Biologi, Informatika & Sosiologi', kategori: 'Guru', foto: '' },
  { id: 7,  nama: 'NUR AINI C, S.Pd',       jabatan: ['WAKASEK Bidang Humas', 'Pramuka & Volly Putri', 'Guru'], niy: '0406101002023040', status: 'GTY', mapel: 'Bahasa Indonesia & Prakarya dan Kewirausahaan', kategori: 'Guru', foto: '' },
  { id: 8,  nama: 'NASIRAH, S.Pd',          jabatan: ['WAKASEK Bidang Kesiswaan', 'Wali Kelas XII', 'Guru'], niy: '0406110698022035', status: 'GTY', mapel: 'Bahasa Inggris', kategori: 'Guru', foto: '' },
  { id: 9,  nama: 'HATIJAH, SE',            jabatan: ['Guru'], niy: '', status: 'GTTY', mapel: 'Ekonomi', kategori: 'Guru', foto: '' },
  { id: 10, nama: 'NURUL HARIFAH, S.Pd',    jabatan: ['Wali Kelas X', 'Tahfidz Puteri', 'Guru'], niy: '', status: 'GTY', mapel: 'Bahasa Arab & Pendidikan Jasmani Olahraga dan Kesehatan', kategori: 'Guru', foto: '' },
  { id: 11, nama: 'MUH.FARID RAFID, S.Si',  jabatan: ['Guru'], niy: '02050267023052', status: 'GTY', mapel: 'Kimia & Fisika', kategori: 'Guru', foto: '' },
  { id: 12, nama: 'SARMILA, S.Ap',          jabatan: ['Staff TU', 'Tenaga Kependidikan'], niy: '', status: 'GTY', mapel: 'PPKn & Geografi', kategori: 'Tenaga Kependidikan', foto: '' },
  { id: 13, nama: 'MUSDALIPA,Sc',           jabatan: ['Kepala Tata Usaha', 'Tenaga Kependidikan'], niy: '', status: 'PTY', mapel: 'Administrasi', kategori: 'Tenaga Kependidikan', foto: '' },
  { id: 14, nama: 'MUHAMMAD IBRAHIM',       jabatan: ['Tenaga Kependidikan'], niy: '', status: '', mapel: 'Penjaga Sekolah', kategori: 'Tenaga Kependidikan', foto: '' },
].map((g) => ({ ...KOSONG_GURU, ...g }));

/* Isian profil guru yang boleh diedit sendiri.
   Jabatan, NIY, status, dan kategori tidak ikut karena diatur admin. */
export const bidangGuru = [
  { nama: 'nama', label: 'Nama lengkap' },
  { nama: 'mapel', label: 'Mata pelajaran / bidang' },
  { nama: 'jk', label: 'Jenis kelamin', tipe: 'pilih', pilihan: ['Laki-laki', 'Perempuan'] },
  { nama: 'tempat', label: 'Tempat lahir' },
  { nama: 'lahir', label: 'Tanggal lahir', tipe: 'date' },
  { nama: 'hp', label: 'No. HP', tipe: 'tel' },
  { nama: 'email', label: 'Email', tipe: 'email' },
  { nama: 'pendidikan', label: 'Pendidikan terakhir' },
  { nama: 'alamat', label: 'Alamat', tipe: 'area', lebar: true },
  { nama: 'bio', label: 'Tentang saya', tipe: 'area', lebar: true },
];

/* ---------------- SISWA ---------------- */
// Format baris: [nama, jk, nis]  -> jk: 'L' atau 'P'
const DAFTAR = {
  'X MIPA': [
    ['SAHRUL', 'L', '240090'], ['WAHYUDI', 'L', '240092'], ['ANNISA', 'P', '260101'],
    ['ARIL SAPUTRA', 'L', '260102'], ['MUH. FURQAN', 'L', '260103'], ['MUH HABIL', 'L', '260104'],
    ['NAUFAL ZHULHILMI', 'L', '260105'], ['NURWAKIA', 'P', '260106'], ['RENO IRWANSYAH', 'L', '260107'],
    ['RIDWAN', 'L', '260108'], ['RISMAYANTI', 'P', '260109'], ['SITI STAURAH', 'P', '260110'],
    ['ULFA UMAIRAH', 'P', '260111'], ['MUHAMMAD YUSRIL', 'L', '260112'],
  ],
  'XI MIPA': [
    ['M. TAUFIK', 'L', '23006505'], ['RISKA YANTI', 'P', '23006909'], ['SYARIR SABAR', 'L', '240091'],
    ['RAHAT IBNU MUBARAK', 'L', '2200627'], ['ALBIYANDRA BAHARUDDIN', 'L', '250095'], ['ANDIKA', 'L', '250094'],
    ['HAMISAH', 'P', '250096'], ['IHWANA', 'P', '250097'], ['ILHAMUN FURQAN', 'L', '250101'],
    ['SUNARTIA', 'P', '250099'], ['ZAKI AL ISLAM', 'L', '250100'],
  ],
  'XII MIPA': [
    ['MUH HASIQ', 'L', '240085'], ['MUH. ALIF', 'L', '240087'], ['MUHAMMAD HAIRUL WAWAN', 'L', '240088'],
  ],
};

export const KELAS = Object.keys(DAFTAR);

// id memakai NIS (bukan urutan), supaya data yang diedit tidak tertukar jika daftar berubah.
const buatSiswa = (kelas, baris) =>
  baris.map(([nama, jk, nis = '']) => ({
    id: `${kelas}-${nis || nama}`, nama, kelas, nis,
    jk: String(jk).trim().toUpperCase().startsWith('L') ? 'L' : 'P',
    nisn: '', tempat: '', lahir: '', agama: '', alamat: '', hp: '', foto: '',
  }));

/* ---------------- Penyimpanan ---------------- */
const baca = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
const tulis = (o) => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch { /* abaikan */ } };

// Kolom tetap (jabatan, NIY, NIS, dst.) selalu diambil dari data awal, bukan dari hasil edit.
export const ambilGuru = () => {
  const s = baca().guru || {};
  return GURU_AWAL.map((g) => ({ ...g, ...s[g.id], id: g.id, jabatan: g.jabatan, niy: g.niy, status: g.status, kategori: g.kategori }));
};

// Menyimpan satu guru, lalu mengembalikan seluruh daftar terbaru.
export const simpanGuru = (g) => {
  const o = baca();
  o.guru = { ...o.guru, [g.id]: g };
  tulis(o);
  return ambilGuru();
};

export const ambilSiswa = () => {
  const s = baca().siswa || {};
  return Object.fromEntries(
    Object.entries(DAFTAR).map(([k, baris]) => [
      k,
      buatSiswa(k, baris).map((x) => ({ ...x, ...s[x.id], id: x.id, kelas: x.kelas, nis: x.nis })),
    ])
  );
};
export const simpanSiswa = (x) => { const o = baca(); o.siswa = { ...o.siswa, [x.id]: x }; tulis(o); };