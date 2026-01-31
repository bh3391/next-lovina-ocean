"use client" // Wajib ada karena menggunakan state

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Edit, Trash2, Calendar, Eye } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { deleteBlogPost } from "./action"

export default function BlogTableClient({ blogs }: { blogs: any[] }) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (deleteId) {
      setIsDeleting(true);
      await deleteBlogPost(deleteId);
      setIsDeleting(false);
      setDeleteId(null);
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Artikel</th>
              <th className="px-6 py-4 hidden md:table-cell">Tanggal</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                      {blog.image ? (
                        <Image src={blog.image} alt={blog.title} fill sizes="64px" className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 italic text-[10px]">No Img</div>
                      )}
                    </div>
                    <div className="max-w-md">
                      <p className="font-bold text-slate-800 line-clamp-1">{blog.title}</p>
                      <p className="text-xs text-slate-500 truncate italic">/{blog.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {format(new Date(blog.createdAt), "dd MMM yyyy", { locale: id })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all shadow-sm">
                      <Eye size={18} />
                    </Link>
                    <Link href={`/admin/blog/edit/${blog.id}`} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all shadow-sm">
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => setDeleteId(blog.id)} 
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {blogs.length === 0 && (
          <div className="py-20 text-center text-slate-400 italic font-medium">
            Belum ada artikel. Mulailah menulis untuk menarik lebih banyak tamu!
          </div>
        )}
      </div>

      {/* MODAL KONFIRMASI */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center text-slate-900">Hapus Artikel?</h3>
            <p className="text-slate-500 mb-8 text-center text-sm leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Menghapus konten yang sudah terindeks dapat mempengaruhi peringkat **SEO** Anda.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteId(null)} 
                disabled={isDeleting}
                className="flex-1 py-3 rounded-2xl bg-slate-100 font-bold text-slate-600 hover:bg-slate-200 transition-all"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete} 
                disabled={isDeleting}
                className="flex-1 py-3 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 disabled:opacity-50"
              >
                {isDeleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}