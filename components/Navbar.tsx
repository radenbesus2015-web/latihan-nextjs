import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold text-xl shadow-md shadow-indigo-500/20">
            E
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Event<span className="text-indigo-600 dark:text-indigo-400">Ku</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 transition-colors">
            Beranda
          </Link>
          <Link href="#events" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Jelajahi Acara
          </Link>
          <Link href="#tentang" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Tentang
          </Link>
          <Link href="#kontak" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Kontak
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Masuk
          </button>
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 active:scale-95 transition"
          >
            Buat Event
          </button>
        </div>
      </div>
    </header>
  );
}
