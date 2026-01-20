import prisma from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"
import BlogTableClient from "./BlogTableClient" // Import Client Component tadi

export default async function AdminBlogList() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight italic">KELOLA ARTIKEL</h1>
          <p className="text-slate-500 text-sm">Update konten secara berkala untuk performa SEO terbaik.</p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Tulis Artikel Baru
        </Link>
      </div>

      {/* Render Client Component */}
      <BlogTableClient blogs={blogs} />
    </div>
  )
}