import Link from "next/link";
import { alamatHalaman, type Saringan } from "@/data/saring";

export default function Halaman({
  s,
  hal,
  jumlah,
}: {
  s: Saringan;
  hal: number;
  jumlah: number;
}) {
  if (jumlah <= 1) return null;

  const nomor = Array.from({ length: jumlah }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="rounded border bg-white px-3 py-1 text-sm hover:bg-slate-50"
        >
          « Sebelumnya
        </Link>
      )}

      {nomor.map((no) => (
        <Link
          key={no}
          href={alamatHalaman(s, no)}
          className={`rounded border px-3 py-1 text-sm ${
            no === hal
              ? "border-blue-600 bg-blue-600 font-bold text-white"
              : "bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {no}
        </Link>
      ))}

      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="rounded border bg-white px-3 py-1 text-sm hover:bg-slate-50"
        >
          Berikutnya »
        </Link>
      )}
    </div>
  );
}

