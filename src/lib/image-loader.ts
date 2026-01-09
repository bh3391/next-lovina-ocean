export function getSmartImage(url: string, width: number = 800) {
  // 1. Jika URL kosong, berikan placeholder
  if (!url) return "/placeholder-dolphin.jpg";

  // 2. Jika URL dari Cloudinary, tambahkan transformasi otomatis
  if (url.includes("res.cloudinary.com")) {
    // f_auto: format otomatis (webp/avif)
    // q_auto: kualitas otomatis (mengecilkan size tanpa pecah)
    // w_: menentukan lebar maksimal agar tidak download gambar 4K untuk kartu kecil
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }

  // 3. Jika URL lokal (/images/...) atau domain lain, kembalikan apa adanya
  return url;
}