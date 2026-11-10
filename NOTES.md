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
