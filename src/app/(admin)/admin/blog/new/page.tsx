// src/app/admin/blog/new/page.tsx
"use client"

import { useState } from 'react'
import BlogEditor from '@/components/admin/BlogEditor'
import ThumbnailUpload from '@/components/admin/ThumbnailUpload'
import { createBlogPost } from '@/app/(admin)/admin/blog/action'

export default function NewPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePublish = async () => {
    if (!title || !content) return alert("Judul dan Konten wajib diisi!")
    
    setIsSubmitting(true)
    const result = await createBlogPost({ 
      title, 
      content, 
      image: thumbnail 
    })
    
    if (result?.error) {
      alert(result.error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">Buat Artikel Baru</h1>
        <button 
          onClick={handlePublish}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all disabled:bg-slate-300"
        >
          {isSubmitting ? "Publishing..." : "Publish Blog"}
        </button>
      </div>

      {/* Selector Thumbnail */}
      <ThumbnailUpload onUploadSuccess={setThumbnail} />

      {/* Judul Artikel */}
      <input 
        type="text"
        placeholder="Judul Artikel (H1)"
        className="text-4xl md:text-5xl font-bold w-full mb-6 outline-none placeholder:text-slate-200 border-none focus:ring-0 p-0"
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Editor Tiptap dengan Fixed Menu */}
      <BlogEditor onChange={setContent} />
    </div>
  )
}