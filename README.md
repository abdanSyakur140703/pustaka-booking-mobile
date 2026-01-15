Pustaka Booking App (Android)

Pustaka Booking App adalah aplikasi Android berbasis React Native yang terhubung dengan REST API CodeIgniter.
Aplikasi ini memungkinkan pengguna untuk melihat data pustaka/buku dan melakukan proses booking secara online.

Project ini dibuat sebagai portfolio untuk menunjukkan kemampuan dalam:

Mobile Development (React Native)

REST API Integration

Backend API (CodeIgniter)

Environment Configuration (.env)

🚀 Getting Started

Catatan
Pastikan environment React Native sudah terpasang dengan benar (Android Studio, SDK, Emulator, Node.js).

Panduan lengkap setup environment:
👉 https://reactnative.dev/docs/environment-setup

⚙️ Konfigurasi API (PENTING)

Aplikasi ini tidak menggunakan API URL hardcode.

1️⃣ Buat file .env

Di root project Android, buat file .env:

API_BASE_URL=http://10.0.2.2/pustaka-booking/api/

📌 10.0.2.2 digunakan agar Android Emulator bisa mengakses localhost.

2️⃣ File contoh .env.example
API_BASE_URL=http://localhost/your-api/

File .env tidak di-push ke GitHub dan sudah dimasukkan ke .gitignore.

▶️ Menjalankan Aplikasi
Step 1: Install Dependency
npm install

atau

yarn install

Step 2: Jalankan Metro Server
npm start

atau

yarn start

Biarkan Metro berjalan di terminal sendiri.

Step 3: Jalankan Aplikasi Android

Buka terminal baru, lalu jalankan:

npm run android

atau

yarn android

Jika setup benar, aplikasi akan berjalan di Android Emulator.

🔄 Mengubah & Reload Aplikasi

Setelah aplikasi berjalan:

Edit file App.tsx atau file di folder src/

Untuk reload di Android:

Tekan R dua kali, atau

Tekan Ctrl + M → pilih Reload

🧪 Backend API

Backend aplikasi ini menggunakan CodeIgniter 3 dan REST API berbasis JSON.

Contoh endpoint:

GET /api/tes

Response:

{
"status": "ok"
}

Backend berada di repository terpisah (atau folder server lokal).

🛠️ Teknologi yang Digunakan

Frontend (Android):

React Native

Kotlin

Gradle

Android SDK 34

Backend:

CodeIgniter 3

MySQL

REST API (JSON)

📌 Catatan Tambahan

Menggunakan debug keystore (development only)

Cocok dijalankan di Android Emulator

Fokus pada arsitektur, API integration, dan best practice

👤 Author

Abdan Syakur
📱 Mobile & Web Developer
🔗 GitHub: https://github.com/abdanSyakur140703

⭐ Penutup

Terima kasih sudah melihat project ini.
Project ini dikembangkan sebagai bagian dari portfolio dan siap untuk dikembangkan lebih lanjut.
