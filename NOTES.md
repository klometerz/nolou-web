# NOTES — NOLOU Static Landing Page

Dokumen ini mencatat asumsi, keputusan desain, dan hasil perbaikan wording berdasarkan **`TASK_WORDING.md`** dan **`Copy_Website_NOLOU_Versi_Branding.pdf`**.

---

## 1. Ringkasan Perbaikan Wording (TASK_WORDING.md)

1. **"72 Jam Hydration" dihapus di semua tempat** (hero badge, strip, card produk, FAQ, meta).
2. **Badge `Kulit Lebih Segar & Bercahaya` di card Exfoliating dihapus.**
3. **Section "Strip fakta" (01/02/03) dihapus.** Fungsinya digantikan oleh *callout* di hero (3 badge).
4. **Semua tombol/tautan "Belanja" yang mengarah ke `#` dihapus** (navbar, menu mobile, card produk, kolom footer "Belanja").
5. **Menu & label section "Kandungan" diganti "Bahan Utama"**. Anchor `#kandungan` → `#bahan-utama` (di nav, mobile menu, footer, hero CTA, JS IntersectionObserver, id section).
6. **Nomor BPOM dipakai persis:** Hydrating `NA18260102885`, Exfoliating `NA18260200192`.
7. **Ejaan konsisten tanpa tanda hubung:** `Multi Hyaluronic Acid` dan `L Arginine`.
8. **Struktur card produk diperbarui:** Tag → Judul → Tagline → Deskripsi → Kandungan Utama (chips) → Cara pakai → Untuk kamu yang (3 bullet) → Baris kecil legal/BPOM.
9. **FAQ diperluas menjadi 8 item** sesuai PDF.
10. **Tentang:** signature diganti tiga kata penutup (`Lembut. Jelas. Terdaftar.`).
11. **Footer:** kolom "Belanja" dihapus; pertahankan "Jelajahi" dan "Terhubung"; tambahkan catatan kecil legal di bagian bawah footer.

---

## 2. Struktur File & Keputusan Teknis

- **HTML:** `index.html` diperbarui dengan copy verbatim dari PDF.
- **JS:** `assets/js/main.js` diperbarui (`observedSections` menggunakan `#bahan-utama`).
- **CSS:** `assets/css/components.css` diperbarui dengan style untuk `.hero__callout`, `.product-card__tagline`, `.product-card__usage`, `.product-card__for`, `.product-card__legal`, `.ingredients__note`, dan `.site-footer__small-note`. Tanpa warna/hex baru (menggunakan token yang ada).
- **Ejaan:** `Multi Hyaluronic Acid` dan `L Arginine` diterapkan di seluruh project (alt text, meta, JSON-LD, keywords, teks).

---

## 3. Data Produk / Hal yang Perlu Dikonfirmasi Owner
- Verifikasi nomor BPOM (`NA18260102885` dan `NA18260200192`) melalui `cekbpom.pom.go.id` sebelum publish resmi.
- Kanal penjualan resmi dan tautan pembelian/marketplace.
- Kanal media sosial resmi dan email brand untuk section "Terhubung" di footer dan FAQ.

---

## 4. Audit Tipografi

Pengukuran baseline dilakukan di halaman lokal dengan Montserrat dimuat, pada viewport 1920, 1440, 1024, dan 390 px. Nilai computed dalam px; ukuran body `.container` sama dengan body.

| Elemen | 1920 | 1440 | 1024 | 390 | Sumber sebelum |
|---|---:|---:|---:|---:|---|
| Body | 17 | 17 | 17 | 16.14 | `base.css` `--text-base` |
| Container max | 1216 | 1216 | 1216 | viewport minus gutter | `tokens.css` `--container-max` |
| Hero H1 | 84 | 84 | 75.2 | 43.5 | `components.css` `--text-5xl` |
| Hero lead | 20 | 20 | 20 | 18.17 | `components.css` `--text-lg` |
| Eyebrow / hero note | 13 | 13 | 13 | 12.11 | `base.css` / `components.css` `--text-xs` |
| Navbar link | 15 | 15 | 13 | 14.22 | `components.css` `--text-sm`, tablet override `--text-xs` |
| Hero button | 20 | 20 | 20 | 20 | `components.css` hardcoded `1.25rem` |
| Section title / lead | 44 / 20 | 44 / 20 | 42.66 / 20 | 30.61 / 18.17 | `base.css` `--text-3xl` / `--text-lg` |
| Product title / description | 32 / 17 | 32 / 17 | 30.72 / 17 | 24.38 / 16.14 | `components.css` `--text-2xl` / inherited body |
| Ingredient title / text | 20 / 15 | 20 / 15 | 20 / 15 | 18.17 / 14.22 | `components.css` `--text-lg` / `--text-sm` |
| About lead / signature | 32 / 48 | 32 / 48 | 30.72 / 40.96 | 24.38 / 28 | `components.css` `--text-2xl` / raw `clamp(28px, 4vw, 48px)` |
| FAQ question / answer | 17 / 17 | 17 / 17 | 17 / 17 | 16.14 / 16.14 | `components.css` `--text-base` / inherited body |
| Footer tagline / small text | 24 / 13 | 24 / 13 | 24 / 13 | 20.26 / 12.11 | `components.css` `--text-xl` / `--text-xs` |

`html` computed 16px (browser default; no previous explicit size), `body` inherited the fluid 17px token on desktop. No page-level `zoom` or scale transform was found; existing `scaleX`/`scale` transforms are decorative animations. Horizontal scroll width matched the viewport content width (scrollbar excluded).

### Sebelum / sesudah

| Elemen | Sebelum (1920 / 390) | Sesudah target (1920 / 390) |
|---|---:|---:|
| Body | 17 / 16.14 | 16 / 16 |
| Container max | 1216 | 1200 (hero 1280) |
| Hero H1 | 84 / 43.5 | 68 / 40 |
| Hero lead | 20 / 18.17 | 19 / 16.56 |
| Button | 20 / 20 | 16 / 16 |
| Section title | 44 / 30.61 | 40 / 28 |
| Product title | 32 / 24.38 | 28 / 22 |
| Small/legal | 12–13 / 12 | 13 / 13 |

Computed sesudah sesuai target tersebut: 360/390px H1 40px, hero lead 16.46/16.57px, dan body 16px; 1440/1920px H1 68px, lead 19px, dan section title 40px. Tombol hero 16px dengan tinggi 52px. Container konten maksimum 1200px dan container hero 1280px. Semua enam lebar yang diuji (360, 390, 768, 1024, 1440, 1920px) memiliki teks terkecil 12px dan tidak mengalami horizontal overflow. Hero pada 360/390px setinggi 925/908px pada viewport 900px.

Kontras hasil hitung computed: baris legal BPOM 4.96:1, catatan footer 7.69:1, dan eyebrow hero terhadap ocean blue 6.82:1. Font size seluruh elemen mengikuti token `--fs-*` (kecuali inheritance), tanpa ukuran murni `vw`.

## 5. Penyempurnaan Terbaru

- Callout hero sebelumnya diposisikan absolut dengan translate ke bawah melewati batas visual; kini menjadi bagian alur layout di bawah gambar (overlap 16px) agar seluruh card tetap masuk section pada tinggi viewport/zoom berbeda.
- Skala section diperkecil: judul section maksimal 36px, judul produk maksimal 24px, intro section maksimal 17px, teks deskripsi 14px, dan FAQ maksimal 17px. Body utama tetap minimal 16px dan tidak ada teks di bawah 12px.
