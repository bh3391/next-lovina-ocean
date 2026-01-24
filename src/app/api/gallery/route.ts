import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Mengambil semua foto dengan prioritas Featured lalu Terbaru
export async function GET() {
  try {
    const photos = await prisma.gallery.findMany({
      orderBy: [
        { isFeatured: 'desc' }, // Foto featured selalu paling atas
        { createdAt: 'desc' }   // Sisanya urut berdasarkan waktu upload
      ]
    });
    
    return NextResponse.json(photos);
  } catch (error) {
    console.error("GET_GALLERY_ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data galeri" }, 
      { status: 500 }
    );
  }
}

// PATCH: Mengatur satu foto menjadi Featured (dan mereset yang lain)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID foto diperlukan" }, { status: 400 });
    }

    // Menggunakan Transaction agar kedua operasi ini berhasil bersamaan
    // Jika satu gagal, semuanya dibatalkan (mencegah data korup)
    const result = await prisma.$transaction([
      // 1. Matikan semua featured yang ada
      prisma.gallery.updateMany({
        data: { isFeatured: false }
      }),
      // 2. Aktifkan featured pada ID yang dipilih
      prisma.gallery.update({
        where: { id },
        data: { isFeatured: true }
      })
    ]);

    // Kembalikan data foto yang baru saja di-update (hasil dari query ke-2)
    return NextResponse.json(result[1]);
  } catch (error) {
    console.error("PATCH_GALLERY_ERROR:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui status featured" }, 
      { status: 500 }
    );
  }
}

// Tambahkan fungsi POST di sini jika Anda ingin mengumpulkan semua route gallery di satu tempat
export async function POST(req: Request) {
  try {
    const { imageUrl, category } = await req.json();
    const newImage = await prisma.gallery.create({
      data: { imageUrl, category: category || "Tour" }
    });
    return NextResponse.json(newImage);
  } catch (error) {
    return NextResponse.json({ error: "Gagal upload" }, { status: 500 });
  }
}