📱 Dosen App (Android)

Dosen App adalah aplikasi Android berbasis React Native yang terhubung dengan REST API CodeIgniter.
Aplikasi ini dikembangkan sebagai platform pribadi untuk dosen dalam mendistribusikan konten akademik dan informasi publik.

🔄 Project Evolution
Project ini awalnya merupakan aplikasi Pustaka Booking, kemudian direstrukturisasi dan dikembangkan ulang
menjadi aplikasi multi-fitur untuk kebutuhan dosen, dengan penambahan fitur konten, membership, dan transaksi.

Project ini dibuat sebagai portfolio untuk menunjukkan kemampuan dalam:

Mobile Development (React Native)

REST API Integration

Backend API (CodeIgniter)

Environment Configuration (.env)

Refactoring & Feature Expansion

✨ Features

About & Profile Information

User Registration & Login

E-Book / Publikasi (View & Download)

Materi Kuliah (Download)

Event Akademik

Berita & Artikel

Produk Digital

Membership (Paid Access)

Download PDF (Membership Only)

REST API Integration

🚀 Getting Started
Catatan

Pastikan environment React Native sudah terpasang dengan benar:

Android Studio

Android SDK & Emulator

Node.js

Panduan resmi:
👉 https://reactnative.dev/docs/environment-setup

⚙️ Konfigurasi API (PENTING)

Aplikasi ini tidak menggunakan API URL hardcode.

1️⃣ Buat file .env

Di root project, buat file .env:

API_BASE_URL=http://10.0.2.2/pustaka-booking/api/

📌 10.0.2.2 digunakan agar Android Emulator dapat mengakses localhost.

2️⃣ File contoh .env.example
API_BASE_URL=http://localhost/your-api/

📌 File .env tidak di-push ke GitHub dan sudah dimasukkan ke .gitignore.

▶️ Menjalankan Aplikasi
Step 1: Install Dependency
npm install

# atau

yarn install

Step 2: Jalankan Metro Server
npm start

# atau

yarn start

Biarkan Metro berjalan di terminal sendiri.

Step 3: Jalankan Aplikasi Android

Buka terminal baru:

npm run android

# atau

yarn android

Jika setup benar, aplikasi akan berjalan di Android Emulator.

🔄 Mengubah & Reload Aplikasi

Edit App.tsx atau file di folder src/

Reload Android:

Tekan R dua kali, atau

Ctrl + M → Reload

🧪 Backend API

Backend menggunakan CodeIgniter 3 dan REST API berbasis JSON.

Contoh endpoint:

GET /api/tes

Response:

{
"status": "ok"
}

📌 Backend berada di repository terpisah atau server lokal.

🛠️ Tech Stack
Frontend (Android)

React Native

TypeScript

Kotlin

Gradle

Android SDK 34

Backend

CodeIgniter 3

MySQL

REST API (JSON)

📌 Catatan Tambahan

Menggunakan debug keystore (development only)

Cocok dijalankan di Android Emulator

Fokus pada arsitektur, API integration, dan best practice

Project siap dikembangkan lebih lanjut

👤 Author

Abdan Syakur
📱 Mobile & Web Developer
🔗 GitHub: https://github.com/abdanSyakur140703

⭐ Penutup

Terima kasih telah melihat project ini.
Project ini dikembangkan sebagai bagian dari portfolio dan mencerminkan kemampuan dalam
mengembangkan, memodifikasi, dan mengintegrasikan aplikasi mobile dengan backend API.
