export default function MemuatDetail() {
  return (
    <article className="rounded-xl border bg-white p-6">
      {/* kotak kecil untuk kategori */}
      <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
      {/* kotak lebar untuk judul */}
      <div className="mt-3 h-9 w-3/4 animate-pulse rounded bg-slate-200" />
      {/* satu baris untuk tanggal */}
      <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
      {/* satu kotak tinggi untuk formulir */}
      <div className="mt-6 h-64 w-full animate-pulse rounded-xl bg-slate-200" />
    </article>
  );
}

