type Props = {
  cari: string;
  onCariChange: (val: string) => void;
  kategori: string;
  onKategoriChange: (val: string) => void;
  daftarKategori: string[];
  urut: string;
  onUrutChange: (val: string) => void;
  adaTiket: boolean;
  onAdaTiketChange: (val: boolean) => void;
  hargaMaks: string;
  onHargaMaksChange: (val: string) => void;
};

export default function KontrolKatalog({
  cari,
  onCariChange,
  kategori,
  onKategoriChange,
  daftarKategori,
  urut,
  onUrutChange,
  adaTiket,
  onAdaTiketChange,
  hargaMaks,
  onHargaMaksChange,
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <input
        value={cari}
        onChange={(e) => onCariChange(e.target.value)}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2"
      />

      <select
        value={kategori}
        onChange={(e) => onKategoriChange(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        {daftarKategori.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>

      <select
        value={urut}
        onChange={(e) => onUrutChange(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={adaTiket}
          onChange={(e) => onAdaTiketChange(e.target.checked)}
          className="rounded"
        />
        Hanya yang masih ada tiket
      </label>

      <input
        type="number"
        value={hargaMaks}
        onChange={(e) => onHargaMaksChange(e.target.value)}
        placeholder="Harga maksimal"
        className="w-36 rounded border bg-white px-3 py-2"
      />
    </div>
  );
}

