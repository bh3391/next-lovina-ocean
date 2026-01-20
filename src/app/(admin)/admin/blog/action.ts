'use server'

import  prisma  from "@/lib/prisma" // Sesuaikan dengan lokasi file prisma client Anda
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createBlogPost(formData: { title: string, content: string, image?: string }) {
  const { title, content, image } = formData

  // 1. Membuat Slug dari Judul (Contoh: "Tips Lovina" -> "tips-lovina")
  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')

  try {
    const post = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        image: image || null,
      },
    })
    
    // 2. Clear Cache agar blog baru langsung muncul di daftar blog
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Judul ini sudah pernah digunakan, silakan ganti judul lain." }
    }
    return { error: "Terjadi kesalahan saat menyimpan blog." }
  }

  redirect(`/blog/${slug}`)
}

// Tambahkan ini di action.ts Anda
export async function getBlogPostById(id: string) {
  return await prisma.blog.findUnique({
    where: { id }
  });
}

export async function updateBlogPost(id: string, data: { title: string, content: string, image?: string }) {
  const slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  
  try {
    await prisma.blog.update({
      where: { id },
      data: { ...data, slug }
    });
    revalidatePath('/admin/blog');
    revalidatePath(`/blog/${slug}`);
    return { success: true };
  } catch (error) {
    return { error: "Gagal memperbarui artikel." };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await prisma.blog.delete({ where: { id } });
    revalidatePath('/admin/blog');
    return { success: true };
  } catch (error) {
    return { error: "Gagal menghapus artikel" };
  }
}