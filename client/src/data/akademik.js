const KUNCI_GURU = 'albirru:guru';
const KUNCI_SISWA = 'albirru:siswa';

/* ---------- Data awal (contoh) ---------- */
export const guruAwal = [
  {
    id: 'guru-1',
    nama: 'Drs. H. Muhammad Ilyas, M.Pd',
    jabatan: 'Kepala Sekolah',
    mapel: 'Manajemen Pendidikan',
    jk: 'Laki-laki',
    tempatLahir: 'Parepare',
    tglLahir: '1972-05-14',
    hp: '0812-0000-0001',
    email: 'ilyas@albirru.sch.id',
    pendidikan: 'S2 Manajemen Pendidikan',
    alamat: 'Jl. Bau Massepe, Parepare',
    tentang: 'Memimpin sekolah dengan fokus pada mutu belajar dan akhlak.',
  },
  {
    id: 'guru-2',
    nama: 'Nur Aini, S.Pd, M.Pd',
    jabatan: 'Wakil Kepala Kurikulum',
    mapel: 'Bahasa Indonesia',
    jk: 'Perempuan',
    tempatLahir: 'Parepare',
    tglLahir: '1985-08-21',
    hp: '0812-0000-0002',
    email: 'nuraini@albirru.sch.id',
    pendidikan: 'S2 Pendidikan Bahasa Indonesia',
    alamat: 'Jl. Jenderal Sudirman, Parepare',
    tentang: 'Mengelola kurikulum dan pembelajaran yang berpusat pada murid.',
  },
  {
    id: 'guru-3',
    nama: 'Ahmad Fauzi, S.Pd',
    jabatan: 'Wakil Kepala Kesiswaan',
    mapel: 'Pendidikan Agama Islam',
    jk: 'Laki-laki',
    tempatLahir: 'Pinrang',
    tglLahir: '1983-02-10',
    hp: '0812-0000-0003',
    email: 'fauzi@albirru.sch.id',
    pendidikan: 'S1 Pendidikan Agama Islam',
    alamat: 'Jl. Lumpue, Parepare',
    tentang: 'Membina karakter dan kegiatan keagamaan murid.',
  },
  {
    id: 'guru-4',
    nama: 'Siti Rahma, S.Pd',
    jabatan: 'Wakil Kepala Sarana & Prasarana',
    mapel: 'Matematika',
    jk: 'Perempuan',
    tempatLahir: 'Makassar',
    tglLahir: '1987-11-05',
    hp: '0812-0000-0004',
    email: 'sitirahma@albirru.sch.id',
    pendidikan: 'S1 Pendidikan Matematika',
    alamat: 'Jl. Ahmad Yani, Parepare',
    tentang: 'Mengelola sarana prasarana agar pembelajaran berjalan nyaman.',
  },
];

export const siswaAwal = [
  {
    id: 'siswa-1',
    nama: 'Andi Muh. Rizky',
    kelas: 'X IPA 1',
    jk: 'Laki-laki',
    tempatLahir: 'Parepare',
    tglLahir: '2010-03-12',
    agama: 'Islam',
    hp: '0813-1111-0001',
    namaWali: 'H. Andi Baso',
    hpWali: '0812-2222-0001',
    ekskul: 'Pramuka',
    alamat: 'Jl. Mattirotasi, Parepare',
  },
  {
    id: 'siswa-2',
    nama: 'Muh. Alif Fadhil',
    kelas: 'X IPA 2',
    jk: 'Laki-laki',
    tempatLahir: 'Parepare',
    tglLahir: '2010-07-02',
    agama: 'Islam',
    hp: '0813-1111-0002',
    namaWali: 'Hasanuddin',
    hpWali: '0812-2222-0002',
    ekskul: 'Futsal',
    alamat: 'Jl. Karaeng Burane, Parepare',
  },
  {
    id: 'siswa-3',
    nama: 'Aisyah Zahra',
    kelas: 'X IPS 1',
    jk: 'Perempuan',
    tempatLahir: 'Parepare',
    tglLahir: '2010-09-18',
    agama: 'Islam',
    hp: '0813-1111-0003',
    namaWali: 'Ibu Nurhaliza',
    hpWali: '0812-2222-0003',
    ekskul: 'Pramuka',
    alamat: 'Jl. Pelita, Parepare',
  },
  {
    id: 'siswa-4',
    nama: 'Nurul Fitriani',
    kelas: 'XI IPA 1',
    jk: 'Perempuan',
    tempatLahir: 'Barru',
    tglLahir: '2009-01-25',
    agama: 'Islam',
    hp: '0813-1111-0004',
    namaWali: 'Abdul Rahman',
    hpWali: '0812-2222-0004',
    ekskul: 'PMR',
    alamat: 'Jl. Veteran, Parepare',
  },
];

/* ---------- Definisi bidang formulir ---------- */
export const bidangGuru = [
  { name: 'nama', label: 'Nama lengkap', type: 'text' },
  { name: 'jabatan', label: 'Jabatan', type: 'text' },
  { name: 'mapel', label: 'Mata pelajaran / bidang', type: 'text' },
  { name: 'jk', label: 'Jenis kelamin', type: 'select', pilihan: ['Laki-laki', 'Perempuan'] },
  { name: 'tempatLahir', label: 'Tempat lahir', type: 'text' },
  { name: 'tglLahir', label: 'Tanggal lahir', type: 'date' },
  { name: 'hp', label: 'No. HP', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'pendidikan', label: 'Pendidikan terakhir', type: 'text' },
  { name: 'alamat', label: 'Alamat', type: 'textarea', penuh: true },
  { name: 'tentang', label: 'Tentang saya', type: 'textarea', penuh: true },
];

export const bidangSiswa = [
  { name: 'nama', label: 'Nama lengkap', type: 'text' },
  { name: 'kelas', label: 'Kelas', type: 'text' },
  { name: 'jk', label: 'Jenis kelamin', type: 'select', pilihan: ['Laki-laki', 'Perempuan'] },
  { name: 'tempatLahir', label: 'Tempat lahir', type: 'text' },
  { name: 'tglLahir', label: 'Tanggal lahir', type: 'date' },
  {
    name: 'agama', label: 'Agama', type: 'select',
    pilihan: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'],
  },
  { name: 'hp', label: 'No. HP siswa', type: 'tel' },
  { name: 'namaWali', label: 'Nama orang tua / wali', type: 'text' },
  { name: 'hpWali', label: 'No. HP wali', type: 'tel' },
  { name: 'ekskul', label: 'Ekstrakurikuler', type: 'text' },
  { name: 'alamat', label: 'Alamat', type: 'textarea', penuh: true },
];

/* ---------- Penyimpanan (localStorage) ---------- */
function baca(kunci, awal) {
  try {
    const teks = localStorage.getItem(kunci);
    if (teks) return JSON.parse(teks);
  } catch {
    /* abaikan, pakai data awal */
  }
  return awal;
}

function tulis(kunci, data) {
  try {
    localStorage.setItem(kunci, JSON.stringify(data));
  } catch {
    /* penyimpanan penuh atau diblokir */
  }
}

export const ambilGuru = () => baca(KUNCI_GURU, guruAwal);
export const ambilSiswa = () => baca(KUNCI_SISWA, siswaAwal);

export function simpanGuru(guru) {
  const daftar = ambilGuru().map((g) => (g.id === guru.id ? guru : g));
  tulis(KUNCI_GURU, daftar);
  return daftar;
}

export function simpanSiswa(siswa) {
  const daftar = ambilSiswa().map((s) => (s.id === siswa.id ? siswa : s));
  tulis(KUNCI_SISWA, daftar);
  return daftar;
}

/* ---------- Pembantu tampilan ---------- */
// "Drs. H. Muhammad Ilyas" -> HM, "Andi Muh. Rizky" -> AM
export function inisial(nama = '') {
  const kata = nama.replace(/^(Drs?\.|Prof\.)\s*/i, '').trim().split(/\s+/);
  return kata.slice(0, 2).map((k) => k[0] || '').join('').toUpperCase();
}

// 1972-05-14 -> 14/05/1972
export function formatTanggal(nilai) {
  if (!nilai) return '';
  const [t, b, h] = nilai.split('-');
  return t && b && h ? `${h}/${b}/${t}` : nilai;
}