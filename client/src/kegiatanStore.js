import { useSyncExternalStore } from 'react';

// Penyimpanan sementara di localStorage browser. Ganti dengan API server (tabel `kegiatan`) bila siap.
const KUNCI = 'kegiatan_smas_albirru';
let data = muat();
const pendengar = new Set();

function muat() {
  try { const s = localStorage.getItem(KUNCI); if (s) return JSON.parse(s); } catch { /* abaikan */ }
  return [];
}
// Mengembalikan false kalau penyimpanan browser penuh.
function simpan(baru) {
  try { localStorage.setItem(KUNCI, JSON.stringify(baru)); } catch { return false; }
  data = baru;
  pendengar.forEach((f) => f());
  return true;
}

export const useKegiatan = () =>
  useSyncExternalStore((f) => { pendengar.add(f); return () => pendengar.delete(f); }, () => data);

export const tambahKegiatan = (k) => simpan([{ ...k, id: Date.now() }, ...data]);
export const hapusKegiatan = (id) => simpan(data.filter((x) => x.id !== id));