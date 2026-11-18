# Diaken Ramadhani Yosep — Portfolio

Situs statis satu halaman dengan React, TypeScript, dan Vite.

## Jalankan secara lokal

Gunakan Node.js 22.12 atau lebih baru dalam seri 22, lalu jalankan:

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

Buka URL yang ditampilkan terminal. `dev` memuat perubahan kode secara langsung dan `preview` menyajikan hasil build dari `dist/`.

## Edit konten dan gambar

Ubah profil, riwayat, skill, dan daftar `projects` di `src/data.ts`. Untuk menambah proyek, buat entri dengan slug unik, kategori, ringkasan, kontribusi, dan stack. Properti `visual` menempatkan proyek di Selected Work. Entri lain muncul di More Projects.

- Foto profil saat ini memakai `public/images/profile/2. CukupClassic.jpeg`. Ubah `profile.photo` di data untuk memilih file lain, misalnya `1. Formal.jpg`.
- Sampul opsional: `public/images/projects/<slug>/cover.webp`. Sesuaikan `coverAlt` dengan isi gambar. Jika sampul belum tersedia, pilih screenshot dari data proyek dengan `preview.desktop` untuk gambar lebar dan `preview.phones` untuk gambar vertikal. Nomornya mengikuti posisi dalam daftar `screenshots`, dimulai dari 1. `imageFolder` bisa dipakai jika nama folder berbeda dari slug, seperti pada Treatment Schedule App.
- Galeri mendukung WebP, JPG, JPEG, dan PNG. Untuk menambah gambar, masukkan nama file dan alt text berbahasa Inggris ke `screenshots`. Helper `screenshots()` digunakan untuk file bernomor yang memakai ekstensi sama. Proyek tanpa gambar bisa memakai ilustrasi berbasis teks melalui `flow`.

Jalankan ulang dev server setelah menambahkan file gambar, atau jalankan build ulang untuk produksi. Vite menginventarisasi gambar yang tersedia. Gambar yang belum tersedia tidak diminta oleh browser. Untuk proyek BSI, gunakan materi yang diizinkan untuk dipublikasikan dengan data dummy atau data yang disamarkan. Screenshot awal Priority Dashboard tersimpan di `.local-assets/priority-dashboard/`, di luar aset publik dan diabaikan oleh Git.

## GitHub Pages

Setelah repo tersedia, pilih **Settings → Pages → Build and deployment → Source → GitHub Actions**. Workflow `.github/workflows/pages.yml` berjalan saat push ke `main` atau dijalankan manual dari tab Actions. Jika branch utama memakai nama lain, sesuaikan pemicu push di workflow.

- User site, seperti `username.github.io`: base `/`.
- Project site, seperti `username.github.io/nama-repo/`: base `/nama-repo/`.

Workflow mengambil base dari konfigurasi GitHub Pages. Untuk membuat build lokal bagi kedua bentuk URL, jalankan `npm run build` untuk root dan `npm run build -- --base=/nama-repo/ --outDir=dist-project` untuk subpath. `PAGES_BASE_PATH` juga dapat diatur saat build. Tambahkan URL canonical dan metadata sosial yang memerlukan URL absolut setelah domain publik ditentukan. [Panduan deploy Vite](https://vite.dev/guide/static-deploy#github-pages)

## Proyek yang perlu dikonfirmasi

- **Key Company Landing Page** — lengkapi deskripsi dan kontribusi yang sesuai judul.

