"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "crypto";
import { NAMA_COOKIE, UMUR_SESI, buatToken } from "@/lib/sesi";

export type HasilMasuk = { pesan: string };

function cekSandiAman(input: string, target: string): boolean {
  const bufInput = Buffer.from(input);
  const bufTarget = Buffer.from(target);
  if (bufInput.length !== bufTarget.length) return false;
  return timingSafeEqual(bufInput, bufTarget);
}

export async function masuk(_sebelum: HasilMasuk, formData: FormData): Promise<HasilMasuk> {
  const sandi = String(formData.get("sandi") ?? "");
  const dari = String(formData.get("dari") ?? "");
  const toples = await cookies();

  // Tantangan 1: Batasi percobaan login
  const cookiePercobaan = toples.get("login_percobaan")?.value;
  let [gagal = 0, blokirSampai = 0] = cookiePercobaan ? cookiePercobaan.split(":").map(Number) : [];

  if (blokirSampai > Date.now()) {
    const sisaDetik = Math.ceil((blokirSampai - Date.now()) / 1000);
    return { pesan: `Terlalu banyak percobaan salah. Coba lagi dalam ${sisaDetik} detik.` };
  }

  // Tantangan 2: Bandingkan kata sandi dengan crypto.timingSafeEqual (mencegah timing attack)
  const passwordAdmin = process.env.ADMIN_PASSWORD ?? "";
  if (!cekSandiAman(sandi, passwordAdmin)) {
    gagal += 1;
    if (gagal >= 5) {
      blokirSampai = Date.now() + 60 * 1000; // tolak selama 1 menit
      toples.set("login_percobaan", `${gagal}:${blokirSampai}`, { maxAge: 60, httpOnly: true });
      return { pesan: "5 kali salah. Akun ditolak sementara selama 1 menit." };
    }
    toples.set("login_percobaan", `${gagal}:0`, { maxAge: 60 * 10, httpOnly: true });
    return { pesan: `Kata sandi salah. Percobaan ke-${gagal} dari 5.` };
  }

  // Bersihkan hitungan jika berhasil masuk
  toples.delete("login_percobaan");

  toples.set(NAMA_COOKIE, await buatToken(), {
    httpOnly: true, // tidak terbaca oleh JavaScript di browser
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UMUR_SESI,
  });

  // hanya boleh kembali ke halaman admin (mencegah dilempar ke situs lain)
  redirect(dari.startsWith("/admin") ? dari : "/admin");
}

export async function keluar() {
  (await cookies()).delete(NAMA_COOKIE);
  redirect("/login");
}
