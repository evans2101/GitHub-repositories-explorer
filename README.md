# GitHub User Search

Aplikasi React yang memungkinkan pengguna mencari profil GitHub dan melihat detail repositori mereka menggunakan API GitHub.

## 🚀 Fitur
- Pencarian pengguna GitHub berdasarkan nama.
- Menampilkan daftar pengguna yang ditemukan.
- Menampilkan detail pengguna (avatar, bio, jumlah followers).
- Menampilkan daftar repositori pengguna.

## 🛠 Teknologi yang Digunakan
- **React** (dengan TypeScript)
- **Axios** (untuk HTTP request)
- **CSS** (untuk styling)

## 📦 Instalasi dan Menjalankan Proyek

1. **Clone repository ini:**
   ```sh
   git clone https://github.com/username/github-user-search.git
   cd github-user-search
   ```
2. **Instal dependensi:**
   ```sh
   npm install
   ```
3. **Jalankan aplikasi:**
   ```sh
   npm start
   ```
4. **Akses di browser:**
   ```
http://localhost:3000
```

## ⚙️ Cara Menggunakan
1. Ketikkan username GitHub di kotak pencarian.
2. Klik tombol **Search** untuk melihat daftar pengguna terkait.
3. Klik salah satu pengguna dari daftar untuk melihat detailnya.
4. Lihat daftar repositori mereka yang tersedia.

## 🔥 Contoh Penggunaan API
- **Mencari pengguna GitHub:**
  ```
GET https://api.github.com/search/users?q={query}&per_page=5
```
- **Mengambil detail pengguna:**
  ```
GET https://api.github.com/users/{username}
```
- **Mengambil repositori pengguna:**
  ```
GET https://api.github.com/users/{username}/repos
```

## 📜 Lisensi
Proyek ini menggunakan lisensi MIT. Silakan gunakan dan modifikasi sesuai kebutuhan! 😊
