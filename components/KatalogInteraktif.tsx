"use client";

import { useEffect, useState } from "react";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [adaTiket, setAdaTiket] = useState(false);
  const [hargaMaks, setHargaMaks] = useState("");
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    const simpanan = localStorage.getItem("urut");
    if (simpanan) setUrut(simpanan);
  }, []);

  function gantiUrut(nilai: string) {
    setUrut(nilai);
    localStorage.setItem("urut", nilai);
    setLimit(4);
  }

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  const hasil = events.filter((e) => {
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;
    const cocokTiket = !adaTiket || e.kuota - e.terisi > 0;
    const cocokHarga = hargaMaks === "" || e.harga <= Number(hargaMaks);
    return cocokCari && cocokKategori && cocokTiket && cocokHarga;
  });

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  const totalSisa = tersusun.reduce((acc, e) => acc + (e.kuota - e.terisi), 0);
  const rataRataHarga =
    tersusun.length === 0
      ? 0
      : Math.round(tersusun.reduce((acc, e) => acc + e.harga, 0) / tersusun.length);

  const tampil = tersusun.slice(0, limit);

  return (
    <div>
      <KontrolKatalog
        cari={cari}
        onCariChange={(val) => {
          setCari(val);
          setLimit(4);
        }}
        kategori={kategori}
        onKategoriChange={(val) => {
          setKategori(val);
          setLimit(4);
        }}
        daftarKategori={daftarKategori}
        urut={urut}
        onUrutChange={gantiUrut}
        adaTiket={adaTiket}
        onAdaTiketChange={(val) => {
          setAdaTiket(val);
          setLimit(4);
        }}
        hargaMaks={hargaMaks}
        onHargaMaksChange={(val) => {
          setHargaMaks(val);
          setLimit(4);
        }}
      />

      <p className="mb-1 text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>
      <p className="mb-3 text-sm text-slate-500">
        Rata-rata harga {rupiah(rataRataHarga)} · Total sisa tiket {totalSisa}
      </p>

      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tampil.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>
          {limit < tersusun.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setLimit((l) => l + 4)}
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Tampilkan lagi ({tersusun.length - limit} lagi)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
