"use client";

import { useState } from "react";

export default function Home() {
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const sampleEvents = [
    {
      id: 1,
      title: "Workshop Next.js 16 & Modern Web",
      category: "Teknologi",
      date: "15 Nov 2026",
      location: "Online / Zoom",
      badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    },
    {
      id: 2,
      title: "Nusantara Creative & Art Fest",
      category: "Seni & Budaya",
      date: "22 Nov 2026",
      location: "Jakarta Convention Center",
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    },
    {
      id: 3,
      title: "Startup Pitch & Networking Night",
      category: "Bisnis",
      date: "05 Des 2026",
      location: "Bandung Techno Park",
      badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/60 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
            <span>✨</span> Solusi Manajemen Acara Modern
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl text-zinc-900 dark:text-white">
            Temukan & Hadiri Event Terbaik dengan{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              EventKu
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
            Jelajahi berbagai seminar, workshop, festival musik, dan kompetisi.
            Daftar dengan mudah hanya dalam beberapa klik.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => alert("Menampilkan daftar event terbaru!")}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:shadow-indigo-600/50 active:scale-95"
            >
              Jelajahi Event Sekarang
            </button>
            <button
              type="button"
              onClick={() => alert("Buka formulir pembuatan event baru!")}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-base font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 active:scale-95"
            >
              Buat Event Gratis
            </button>
            <button
              type="button"
              onClick={handleLike}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-base font-semibold transition active:scale-95 ${
                hasLiked
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                  : "border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
              }`}
            >
              <span>{hasLiked ? "❤️" : "🤍"}</span>
              <span>Dukung ({likes})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="events" className="border-t border-zinc-200 bg-zinc-50/50 py-16 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Event Pilihan Minggu Ini
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Jangan lewatkan kesempatan bergabung di acara-acara inspiratif berikut.
              </p>
            </div>
            <button
              type="button"
              className="mt-4 sm:mt-0 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Lihat Semua Event &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleEvents.map((evt) => (
              <div
                key={evt.id}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div>
                  <span
                    className={`inline-block rounded-md px-2.5 py-1 text-xs font-semibold ${evt.badgeColor}`}
                  >
                    {evt.category}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {evt.title}
                  </h3>
                  <div className="mt-3 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <p>📅 {evt.date}</p>
                    <p>📍 {evt.location}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => alert(`Tiket untuk "${evt.title}" dipilih!`)}
                    className="w-full rounded-xl bg-zinc-900 py-2.5 text-center text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 active:scale-95"
                  >
                    Beli Tiket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
