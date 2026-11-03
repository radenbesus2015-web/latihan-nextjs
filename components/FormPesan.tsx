"use client";
import { useState } from "react";
import { rupiah, type Event } from "@/data/events";

export default function FormPesan({ event }: { event: Event }) {
  const sisa = event.kuota - event.terisi;
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    setBerhasil(false);
    if (nama.trim().length < 3) return setPesan("Nama minimal 3 huruf.");
    if (!email.includes("@")) return setPesan("Email tidak valid.");
    if (jumlah < 1) return setPesan("Jumlah tiket minimal 1.");
    if (jumlah > sisa) return setPesan(`Sisa tiket hanya ${sisa}.`);
    setPesan("");
    setBerhasil(true);
  }

  if (sisa === 0) {
    return <p className="mt-6 font-medium text-red-600">Tiket sudah habis.</p>;
  }

  return (
    <form onSubmit={kirim} className="mt-6 space-y-3 border-t pt-4">
      <h2 className="text-lg font-semibold text-slate-800">Pesan tiket</h2>
      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama pemesan"
        className="block w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email pemesan"
        className="block w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400"
      />
      <input
        type="number"
        value={jumlah}
        onChange={(e) => setJumlah(Number(e.target.value))}
        className="block w-32 rounded border border-slate-300 bg-white px-3 py-2 text-slate-800"
      />
      <p className="text-slate-800">Total: <b>{rupiah(event.harga * jumlah)}</b></p>
      {pesan && <p className="text-red-600">{pesan}</p>}
      {berhasil && (
        <p className="text-green-700">
          Terima kasih {nama}! {jumlah} tiket dipesan (belum tersimpan, ini masih latihan).
        </p>
      )}
      <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Pesan
      </button>
    </form>
  );
}
