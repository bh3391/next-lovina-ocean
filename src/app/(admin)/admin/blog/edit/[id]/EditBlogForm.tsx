"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BlogEditor from '@/components/admin/BlogEditor'
import ThumbnailUpload from '@/components/admin/ThumbnailUpload'
import { updateBlogPost } from '../../action'

export default function EditBlogForm({ post }: { post: any }) {
  const router = useRouter()
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [thumbnail, setThumbnail] = useState(post.image || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdate = async () => {
    if (!title || !content) return alert("Judul dan Konten wajib diisi!")
    
    setIsSubmitting(true)
    const result = await updateBlogPost(post.id, { 
      title, 
      content, 
      image: thumbnail 
    })
    
    if (result?.success) {
      router.push('/admin/blog')
      router.refresh()
    } else {
      alert(result?.error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Artikel</h1>
          <p className="text-sm text-slate-500 italic">ID: {post.id}</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => router.back()}
                className="px-6 py-2 rounded-full font-semibold text-slate-600 hover:bg-slate-100 transition-all"
            >
                Batal
            </button>
            <button 
                onClick={handleUpdate}
                disabled={isSubmitting}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full font-semibold transition-all disabled:bg-slate-300 shadow-lg shadow-amber-100"
            >
                {isSubmitting ? "Menyimpan..." : "Update Artikel"}
            </button>
        </div>
      </div>

      <ThumbnailUpload 
        onUploadSuccess={setThumbnail} 
        defaultImage={thumbnail} // Pastikan komponen ini menerima defaultImage
      />

      <input 
        type="text"
        value={title}
        placeholder="Judul Artikel"
        className="text-4xl md:text-5xl font-bold w-full mb-6 outline-none placeholder:text-slate-200 border-none focus:ring-0 p-0"
        onChange={(e) => setTitle(e.target.value)}
      />

      <BlogEditor 
        onChange={setContent} 
        initialContent={post.content} // Mengirim data lama ke editor
      />
    </div>
  )
}