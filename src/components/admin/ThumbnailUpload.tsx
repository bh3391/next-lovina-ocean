"use client"

import { useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import Image from 'next/image'

export default function ThumbnailUpload({ onUploadSuccess, defaultImage = "" }: any) {
  const [preview, setPreview] = useState(defaultImage)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'lovina_blogs') // Ganti sesuai preset Cloudinary Anda

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/doiaj5zz1/image/upload`, // Ganti Cloud Name Anda
        { method: 'POST', body: formData }
      )
      const data = await res.json()
      setPreview(data.secure_url)
      onUploadSuccess(data.secure_url) // Kirim URL ke parent component
    } catch (error) {
      console.error("Thumbnail upload failed", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Thumbnail Blog (Rasio 16:9 disarankan)
      </label>
      
      {preview ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <Image src={preview} alt="Thumbnail preview" fill className="object-cover" />
          <button
            onClick={() => { setPreview(""); onUploadSuccess(""); }}
            className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-red-50 text-red-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="bg-slate-100 p-4 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mb-3">
              <ImagePlus size={32} />
            </div>
            <p className="text-sm text-slate-500 font-medium">
              {loading ? "Sedang mengupload..." : "Klik untuk upload thumbnail"}
            </p>
          </div>
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
        </label>
      )}
    </div>
  )
}