# Macra CRM Frontend

**Mata Kuliah:** Pemrograman Front-End (IF220) | **Semester:** 3 | **SKS:** 3
**Dosen Pengampu:** Taufik Iqbal Ramdhani, S.Kom., M.Sc.
**Mahasiswa:** Muhammad Farid Zaki | **NIM:** 1003240010 | **Prodi:** Informatika

---

Aplikasi Manajemen Pelanggan (CRM) berbasis Single Page Application (SPA) modern yang dibangun dengan React, TypeScript, dan teknologi web terkini.

## Pemetaan Persyaratan Mata Kuliah

| Sub-CPMK | Deskripsi | Level | Status |
|----------|-----------|-------|--------|
| Sub-CPMK-8 | Framework frontend modern (React) untuk halaman interaktif | C3 | ✅ Terpenuhi |
| Sub-CPMK-9 | Desain responsif untuk antarmuka adaptif | C3 | ✅ Terpenuhi |
| Sub-CPMK-10 | Integrasi CRUD melalui API | C4 | ✅ Terpenuhi |
| Sub-CPMK-11 | Pengujian UI dan dokumentasi teknis | C5 | ✅ Terpenuhi |
| Sub-CPMK-12 | Presentasi dan refleksi diri | C6 | ✅ Terpenuhi |

### Alignment CPL & CPMK

| Kode | Deskripsi | Sub-CPMK Terkait |
|------|-----------|------------------|
| CPL-08 | Desain solusi computing | Semua |
| CPMK-082 | Implementasi sistem IT dengan pemrograman modern | 8, 9, 10 |
| CPMK-085 | Dokumentasi dan presentasi | 11, 12 |

## Fitur

- **Manajemen Lead**: Membuat, membaca, memperbarui, dan menghapus data lead
- **Pelacakan Status**: Melacak lead melalui tahapan pipeline (Prospect → Negotiation → Deal → Lost)
- **Riwayat Interaksi**: Mencatat dan melihat interaksi pelanggan (panggilan, email, pertemuan, keluhan)
- **Dashboard**: Ringkasan aktivitas CRM dengan statistik utama
- **Pipeline Kanban**: Seret dan lepas kartu untuk mengubah status lead
- **Desain Responsif**: Berfungsi pada perangkat desktop dan seluler

## Teknologi yang Digunakan

- **Framework**: React 18 dengan TypeScript
- **Build Tool**: Vite 5
- **State Management**: Zustand
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Mock API**: JSON Server
- **Internasionalisasi**: react-i18next (Inggris/Indonesia)

## Struktur Proyek

```
macra-crm-fe/
├── src/
│   ├── components/
│   │   ├── auth/            # Komponen autentikasi
│   │   ├── common/          # Komponen bersama
│   │   │   ├── ConfirmDialog.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── interactions/    # Komponen interaksi
│   │   │   ├── InteractionForm.tsx
│   │   │   └── InteractionHistory.tsx
│   │   ├── leads/           # Komponen lead
│   │   │   ├── LeadCard.tsx
│   │   │   ├── LeadForm.tsx
│   │   │   └── LeadList.tsx
│   │   ├── layout/          # Komponen tata letak
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/              # Komponen dasar shadcn/ui
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── tabs.tsx
│   ├── lib/
│   │   ├── api.ts           # Klien dan endpoint API
│   │   ├── i18n.ts          # Internasionalisasi
│   │   ├── theme.tsx        # Penyedia tema
│   │   └── utils.ts         # Fungsi utilitas
│   ├── pages/
│   │   ├── Dashboard.tsx    # Halaman dashboard
│   │   ├── Interactions.tsx # Halaman daftar interaksi
│   │   ├── LeadDetail.tsx   # Halaman detail lead
│   │   ├── Leads.tsx        # Halaman daftar lead
│   │   ├── Login.tsx        # Halaman login
│   │   ├── Pipeline.tsx     # Halaman pipeline kanban
│   │   └── Settings.tsx     # Halaman pengaturan
│   ├── store/
│   │   ├── useAuthStore.ts  # State autentikasi
│   │   └── useCrmStore.ts   # State data CRM
│   ├── types/
│   │   └── index.ts         # Tipe TypeScript
│   ├── App.tsx              # Komponen utama aplikasi
│   ├── main.tsx             # Titik masuk
│   └── index.css            # Gaya global
├── db.json                  # Database JSON Server
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Deskripsi Komponen

| Komponen | Deskripsi |
|----------|-----------|
| `Navbar` | Bar navigasi atas dengan menu pengguna |
| `Sidebar` | Menu navigasi samping (dapat dilipat pada seluler) |
| `Layout` | Pembungkus tata letak utama |
| `LeadCard` | Komponen kartu untuk menampilkan informasi lead |
| `LeadForm` | Form untuk membuat/mengedit lead |
| `LeadList` | Tampilan grid/list dengan pencarian dan filter |
| `Pipeline` | Papan kanban untuk manajemen status drag-and-drop |
| `InteractionForm` | Form untuk membuat interaksi |
| `InteractionHistory` | Garis waktu interaksi untuk lead |

## Memulai

### Prasyarat

- Node.js 18+ terinstal
- npm atau yarn

### Instalasi

1. Clone repository (jika diperlukan)
2. Masuk ke direktori proyek:
   ```bash
   cd macra-crm-fe
   ```

3. Instal dependensi:
   ```bash
   npm install
   ```

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

5. Di terminal terpisah, jalankan JSON Server (mock API):
   ```bash
   npm run server
   ```

6. Buka browser dan navigasi ke:
   - Aplikasi: http://localhost:5173
   - JSON Server: http://localhost:3001

### Skrip yang Tersedia

```bash
# Jalankan server pengembangan
npm run dev

# Jalankan JSON Server (mock API)
npm run server

# Build untuk produksi
npm run build

# Pratinjau build produksi
npm run preview
```

## Model Data CRM

### Lead
| Field | Tipe | Deskripsi |
|-------|------|-----------|
| id | string | Identifier unik |
| name | string | Nama lengkap lead |
| email | string | Alamat email |
| phone | string | Nomor telepon |
| company | string | Nama perusahaan |
| status | string | Tahap pipeline (Prospect, Negotiation, Deal, Lost) |
| source | string | Sumber lead (Website, Referral, Social Media, Cold Call) |
| notes | string | Catatan tambahan |
| createdAt | string | Timestamp pembuatan |
| updatedAt | string | Timestamp pembaruan terakhir |

### Interaction
| Field | Tipe | Deskripsi |
|-------|------|-----------|
| id | string | Identifier unik |
| leadId | string | Referensi ke Lead |
| type | string | Jenis interaksi (Call, Email, Meeting, Complaint) |
| description | string | Detail interaksi |
| date | string | Timestamp interaksi |

## Endpoint API

### Leads
- `GET /leads` - Dapatkan semua lead
- `GET /leads/:id` - Dapatkan lead tunggal
- `POST /leads` - Buat lead baru
- `PUT /leads/:id` - Perbarui lead
- `DELETE /leads/:id` - Hapus lead

### Interactions
- `GET /interactions` - Dapatkan semua interaksi
- `GET /interactions?leadId=:id` - Dapatkan interaksi untuk lead tertentu
- `POST /interactions` - Buat interaksi baru
- `PUT /interactions/:id` - Perbarui interaksi
- `DELETE /interactions/:id` - Hapus interaksi

## Desain Responsif

Aplikasi ini sepenuhnya responsif dan berfungsi pada:
- **Seluler**: < 768px - Tata letak satu kolom dengan menu hamburger
- **Tablet**: 768px - 1024px - Grid dua kolom
- **Desktop**: > 1024px - Sidebar penuh dengan tata letak multi-kolom

---

## Refleksi Diri

### Migrasi dari HTML/JS Dasar ke Framework React

**Tantangan yang Dihadapi:**

1. **Berpikir Berbasis Komponen**: Berpindah dari file HTML monolitik ke komponen React modular memerlukan perubahan paradigma berpikir. Saya harus belajar untuk memikirkan dalam hal komponen yang dapat digunakan kembali dan terisolasi daripada HTML tingkat halaman.

2. **Manajemen State**: Mengelola state di seluruh komponen awalnya membingungkan. Menggunakan `useState` dan kemudian `zustand` membantu memahami bagaimana React menangani aliran data dan re-rendering.

3. **Build Tools**: Mengatur Vite dan memahami cara kerja bundler baru bagi saya. Konsep hot module replacement (HMR) sangat menarik dibandingkan penyegaran halaman manual.

4. **Integrasi TypeScript**: Menambahkan type safety memerlukan pembelajaran sintaks TypeScript, tetapi ini membantu menangkap kesalahan lebih awal dan meningkatkan dokumentasi kode.

5. **Tailwind CSS**: Beradaptasi dengan CSS utility-first berbeda dari kelas CSS tradisional, tetapi ini membuat desain responsif menjadi lebih cepat.

**Solusi:**

- Mengikuti dokumentasi dan tutorial React untuk memahami hooks dan siklus hidup komponen
- Menggunakan TypeScript secara bertahap, dimulai dengan tipe sederhana dan memperluas
- Memanfaatkan komponen shadcn/ui untuk elemen UI yang dapat diakses dan pra-buat
- Menggunakan DevTools browser untuk men-debug pohon komponen React

**Hasil Pembelajaran:**

- Pemahaman arsitektur SPA dan routing sisi klien
- Keahlian dalam hooks React dan pola manajemen state
- Pengalaman dengan framework CSS modern (Tailwind)
- Pengetahuan tentang build tools dan alur kerja pengembangan
- Pemahaman tentang integrasi API dan penanganan data asinkron

---

## Lisensi

Proyek ini untuk tujuan pendidikan sebagai bagian dari mata kuliah Pemrograman Front-End (IF220).
