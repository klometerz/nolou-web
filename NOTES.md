# NOTES — NOLOU Static Landing Page

Dokumen ini mencatat asumsi, keputusan desain, dan placeholder yang masih perlu diganti sebelum website dipublikasikan. Versi ini mengikuti revisi brief terbaru: **palet biru saja** dan art direction skincare yang lebih fresh/hydrating.

---

## 1. Ringkasan Teknis

- Static site: HTML + CSS + vanilla JS. Tanpa framework, build tool, npm, atau backend.
- Font: Montserrat (Google Fonts, weight 300/400/600/700). Poppins tidak dipakai.
- Semua warna memakai CSS variable di `assets/css/tokens.css`. Tidak ada hex hardcode di CSS komponen.
- Test lokal: `http://nolou-web.test` atau `http://localhost/nolou-web/`.
- Semua path aset relatif sehingga jalan di kedua URL tersebut.

### Struktur file

```
nolou-web/
├── index.html
├── TODO.md
├── TODO2.md
├── TODO3.md
├── PRODUCT-KNOWLEDGE.md
├── NOTES.md
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── assets/
    ├── css/
    │   ├── tokens.css
    │   ├── base.css
    │   └── components.css
    ├── js/
    │   └── main.js
    └── img/
        ├── logo/
        │   ├── nolou-logo-blue.png
        │   ├── nolou-logo-black.png
        │   ├── nolou-logo-white.png
        │   └── nolou-icon-blue.png
        ├── product/
        │   ├── hydrating-serum.jpg
        │   └── exfoliating-serum.jpg
        ├── icons/
        │   ├── icon-hyaluronic.svg
        │   ├── icon-panthenol.svg
        │   ├── icon-glycolic.svg
        │   └── icon-arginine.svg
        ├── hero-bg.jpg
        ├── kandungan-bg.jpg
        ├── tentang-bg.jpg
        ├── pattern.svg
        ├── pattern-blue.svg
        ├── droplet.svg
        ├── ripple.svg
        └── og-nolou.svg
```

---

## 2. Asumsi & Keputusan Desain

### 2.1 Warna & token
- Palet hanya biru: `--color-primary-blue` `#2A71CE`, `--color-ocean-blue` `#0052CC`, `--color-dark` `#2E302F`, `--color-surface` `#FCF8F5`, `--color-white` `#FFFFFF`.
- Semua tint/shade dibuat lewat `color-mix()` dari token resmi (`--color-blue-tint`, `--color-blue-soft`, `--color-blue-light`, `--color-ocean-deep`, `--color-ocean-tint`, `--color-ocean-soft`, dll).
- **Aksen Exfoliating Serum = `--color-ocean-blue`** adalah asumsi karena guideline hanya menyebut aksen tanpa nilai eksplisit. Mohon dikonfirmasi ke owner.
- `meta theme-color` = `#0052CC` (ocean blue), sesuai brief.
- Tidak ada lagi token/warna aksen lama di HTML, CSS, JS, maupun SVG. File aset monogram dengan warna lama sudah dihapus.
- Browser modern yang mendukung `color-mix()` dibutuhkan (Chrome/Edge/Firefox/Safari terbaru).

### 2.2 Tipografi & layout
- Satu typeface (Montserrat) untuk semua teks.
- H1/H2 700, eyebrow/label 600 uppercase + letter-spacing, body 400 minimal 16px, weight 300 hanya untuk sub-headline besar.
- Radius kartu produk 12px, tombol 8px (presisi, bukan pill). Chip/badge memakai pill kecil.
- Spacing kelipatan 8px, grid rapi, whitespace lega, headline tebal.

### 2.3 Logo & clear space
- Logo resmi sudah dipakai dari folder `assets/img/logo-real/` (wordmark NOLOU horizontal di kanvas persegi).
- Aset dirapikan otomatis: crop ke area wordmark lalu background dibuat transparan (anti-aliasing dihitung dari luminance). Varian: biru, hitam, dan putih.
- **Catatan:** berkas sumber hanya berisi wordmark; varian monogram lama (`nolou-monogram-blue.svg`) masih disimpan sebagai placeholder favicon.
- Varian yang tersedia: biru, hitam, putih, dan ikon kotak biru (`nolou-icon-blue.png` untuk apple-touch-icon).
- `--logo-clear-space` = 9 × tinggi monogram (20px) = 180px.
- **Kompromi navbar & favicon:** aturan clear space 9× tidak diterapkan penuh karena ruang terbatas. Logo diberi jarak maksimal dari menu/ornamen dan tidak ada elemen menempel. Keputusan ini perlu dikonfirmasi owner.
- **Logo putih di atas hero biru:** guideline belum mengatur latar biru secara eksplisit. Dipilih logo putih utuh agar kontras; perlu konfirmasi owner.
- Di footer, logo berada dalam blok dengan padding besar (`logo-clear-space`) agar area bebas terjaga. Pattern dinonaktifkan di footer supaya tidak masuk area clear space logo.

### 2.4 Kontras & aksesibilitas
- CTA di latar terang = ocean blue + teks putih bold (rasio ±6.8:1).
- CTA di latar biru/gelap = putih + teks ocean blue (atau outline putih).
- Aksen teks di latar gelap memakai `--color-blue-light`; biru primary/ocean tidak dipakai sebagai teks kecil di latar gelap.
- Body text tidak memakai warna yang gagal kontras. Badge kecil memakai teks ocean pada latar putih.
- Focus ring: ocean blue di latar terang, putih/blue-light di latar gelap/biru.
- `prefers-reduced-motion` dihormati: smooth scroll, reveal, float botol, droplet, dan ripple dimatikan/dikurangi.
- FAQ memakai `<button>` native dengan `aria-expanded`, `aria-controls`, panel `role="region"` + `aria-labelledby`, serta navigasi keyboard Arrow/Home/End.
- Mobile menu memakai `aria-expanded`, `aria-controls`, bisa ditutup dengan Esc dan klik link.

### 2.5 Art direction skincare
- Hero memakai foto `FEEDS NOLOU (7).png` sebagai background (dioptimasi ke `assets/img/hero-bg.jpg`) dengan overlay gradient ocean → primary agar teks tetap kontras. SVG pattern dan droplet air dihapus.
- Visual hero menampilkan foto produk asli Hydrating dan Exfoliating Serum.
- Section Kandungan memakai foto `1105(25).png` (dioptimasi ke `assets/img/kandungan-bg.jpg`) + overlay `--color-blue-tint`, berisi 4 kartu kandungan dengan ikon heksagon/molekul/tetes.
- Section Tentang memakai foto `9.png` (dioptimasi ke `assets/img/tentang-bg.jpg`) + overlay `--color-dark`.
- Motion halus: float botol, ripple, dan reveal-on-scroll.
- Wording produk mengikuti `PRODUCT-KNOWLEDGE.md` (hanya fakta ✅; pengetahuan bahan 🟡 diberi komentar konfirmasi; data ❓ tidak dikarang).

---

## 3. Placeholder yang Masih Perlu Diganti

| Item | Lokasi | Status / Todo |
|---|---|---|
| Logo resmi | `assets/img/logo/*.png` | Sudah memakai wordmark resmi dari `logo-real/` (crop + background transparan). |
| Foto produk Hydrating | `assets/img/product/hydrating-serum.jpg` | Sudah memakai foto asli dari `product-real/8.png` (dioptimasi 1200×1200). |
| Foto produk Exfoliating | `assets/img/product/exfoliating-serum.jpg` | Sudah memakai foto asli dari `product-real/7.png` (dioptimasi 1200×1200). |
| Background hero | `assets/img/hero-bg.jpg` | Dari `product-real/FEEDS NOLOU (7).png` (dioptimasi 1440×1800). |
| Background Kandungan | `assets/img/kandungan-bg.jpg` | Dari `product-real/1105(25).png` (dioptimasi 788×1400). |
| Background Tentang | `assets/img/tentang-bg.jpg` | Dari `product-real/9.png` (dioptimasi 1600×1600). |
| Link belanja produk | `index.html` (CTA Produk) | `href="#"` + komentar `TODO: isi link toko`. Kanal penjualan belum ditentukan. |
| Link belanja footer | `index.html` (footer) | `href="#"` + komentar `TODO: isi link toko`. |
| Media sosial | `index.html` (footer) | `href="#"` placeholder Instagram/TikTok. **TODO: isi link resmi.** |
| Email | footer | `hello@nolou.id` — asumsi, mohon konfirmasi. |
| OG image | `assets/img/og-nolou.svg` | Placeholder SVG 1200×630. Sebaiknya diganti JPG/PNG karena sebagian platform sosial tidak mendukung SVG. |
| Jawaban FAQ cara pakai | FAQ #4 | Placeholder `Cara pakai lengkap tertera pada kemasan.` + `<!-- COPY: isi dari owner -->` (data ❓ OWNER). |
| Jawaban FAQ tempat beli | FAQ #5 | Menunggu kanal resmi, ditandai `<!-- COPY: isi dari owner -->`. |
| Deskripsi kandungan | Section Kandungan | Deskripsi netral & umum, ditandai `<!-- COPY: konfirmasi ke owner -->`. |
| Copy hero/produk/why/tentang/footer | `index.html` | Sebagian ditandai `<!-- COPY: edit me -->` untuk penyempurnaan owner. |
| Sitemap | `sitemap.xml` | Baru berisi homepage; tambahkan URL lain jika ada. |

> Catatan: `robots.txt` mereferensikan `https://www.nolou.id/sitemap.xml`; file `sitemap.xml` sudah disertakan.

---

## 4. Klaim Produk

Klaim yang dipakai hanya yang diizinkan brief:
- `72 Jam Hydration` (Hydrating Serum)
- `Kulit Lebih Segar & Bercahaya` (Exfoliating Serum)
- `Gentle Looks Good` (tagline)
- Nama dan kandungan: Multi-Hyaluronic Acid, Panthenol (Vitamin B5), Glycolic Acid, L-Arginine

Tidak ada klaim medis tambahan, persentase kandungan, BPOM, halal, dermatologically tested, best-seller, atau "terbukti klinis". Jika owner ingin menambah klaim, tambahkan setelah konfirmasi dan tandai di HTML.

---

## 5. Cara Edit Konten

1. **Teks & section:** edit `index.html`. Cari komentar `<!-- COPY: edit me -->` untuk area yang perlu penyempurnaan.
2. **Warna, font, spacing, radius, shadow:** edit `assets/css/tokens.css`. Jangan hardcode warna baru di `components.css`.
3. **Layout komponen:** edit `assets/css/components.css`; reset/utilitas di `assets/css/base.css`.
4. **Interaksi:** edit `assets/js/main.js` (navbar, mobile menu, smooth scroll, active nav, reveal, FAQ).
5. **Aset gambar:** ganti file di `assets/img/` dengan nama yang sama agar HTML tidak perlu diubah, atau update `src`/`alt` bila nama berubah.
6. **Meta SEO:** edit `<head>` di `index.html` (title, description, canonical, OG, Twitter, JSON-LD).

---

## 6. Cara Test

1. Jalankan Laragon, buka `http://nolou-web.test` atau `http://localhost/nolou-web/`.
2. Cek breakpoint: 360px, 768px, 1024px, 1440px.
3. Cek:
   - tidak ada horizontal scroll,
   - navbar transparan di atas hero biru lalu solid setelah scroll,
   - logo putih di hero dan logo biru setelah scroll,
   - mobile menu bisa dibuka/tutup dengan Esc,
   - anchor navigation smooth dan offset navbar benar,
   - FAQ bisa dibuka dengan keyboard,
   - focus ring terlihat di latar terang dan gelap/biru,
   - animasi berhenti saat `prefers-reduced-motion` aktif.
4. Jalankan Lighthouse (Chrome DevTools) untuk Performance/Accessibility/SEO.

---

## 7. Catatan QA

- **Lighthouse (Chrome headless, lokal): Performance 99, Accessibility 100, SEO 100** — memenuhi target (≥90 / ≥95 / ≥95).
- HTML divalidasi: tidak ada tag tidak tertutup, tidak ada id duplikat, struktur semantic (`header`, `main`, `section`, `footer`), dan `lang="id"`.
- Semua anchor internal valid; seluruh aset lokal yang direferensikan ada.
- Grep warna aksen lama: **0 temuan** di HTML/CSS/JS/SVG.
- Hex hanya ada di `:root` (`tokens.css`) dan di dalam file SVG sebagai bagian dari aset brand; tidak ada hex hardcode di CSS komponen.
- Tidak ada aset/konten dari browieofficial.com; hanya inspirasi struktur single-page.
- Semua gambar produk memakai `loading="lazy"` kecuali visual hero; `width`/`height` diset untuk mengurangi layout shift.

---

## 8. Data produk yang masih harus diisi owner

Mengacu ke bagian ❓ **OWNER TO FILL** di `PRODUCT-KNOWLEDGE.md` (Bagian 2 & 3):

- Dasar/uji klaim "72 Jam Hydration".
- Ukuran/volume kemasan (ml) kedua produk.
- Daftar bahan lengkap (INCI) kedua produk.
- Tekstur, aroma, dan rasa di kulit.
- Jenis kulit yang cocok/tidak cocok; peringatan (kulit sensitif, hamil/menyusui, dll).
- Cara pakai resmi (pagi/malam, jumlah tetes, urutan, frekuensi).
- Konsentrasi/pH Glycolic Acid (jika boleh diungkap).
- Kebiasaan pemakaian bersama bahan aktif lain menurut formulator.
- Nomor notifikasi BPOM dan sertifikasi lain (halal, dll).
- Masa simpan / PAO.
- Harga dan link toko resmi.
- Link media sosial resmi dan email resmi.
