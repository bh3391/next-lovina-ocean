"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import ImageExtension from '@tiptap/extension-image' // Import ini
import { 
  Bold, Italic, Heading2, List, ListOrdered, 
  Quote, Undo, Redo, Image as ImageIcon 
} from 'lucide-react'

const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  const addImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      // Tampilkan loading sederhana (optional)
      console.log("Uploading...")

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'lovina_blogs') // Ganti dengan preset Anda

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/doiaj5zz1/image/upload`, // Ganti NAMA_CLOUD_ANDA
          { method: 'POST', body: formData }
        )
        const data = await res.json()

        if (data.secure_url) {
          editor.chain().focus().setImage({ src: data.secure_url }).run()
        }
      } catch (error) {
        console.error("Upload failed", error)
      }
    }
    input.click()
  }

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 bg-white/80 backdrop-blur-md border-b border-slate-200 py-2 mb-4">
      {/* Tombol yang sudah ada sebelumnya */}
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-lg ${editor.isActive('bold') ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`}><Bold size={20} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg ${editor.isActive('italic') ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`}><Italic size={20} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded-lg ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`}><Heading2 size={20} /></button>
      
      <div className="w-[1px] h-6 bg-slate-200 mx-1" />
      
      {/* TOMBOL UPLOAD GAMBAR */}
      <button
        type="button"
        onClick={addImage}
        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2"
      >
        <ImageIcon size={20} />
        <span className="text-xs font-medium italic">Add Photo</span>
      </button>

      {/* Sisanya (List, Quote, dll) */}
      <div className="w-[1px] h-6 bg-slate-200 mx-1 ml-auto" />
      <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 hover:bg-slate-100 rounded-lg"><Undo size={20} /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 hover:bg-slate-100 rounded-lg"><Redo size={20} /></button>
    </div>
  )
}

export default function BlogEditor({ onChange, initialContent = "" }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'rounded-2xl border border-slate-200 shadow-lg my-8', // Styling gambar otomatis
        },
      }),
      Placeholder.configure({ placeholder: 'Mulai menulis cerita Anda...' }),
    ],
    content: initialContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] pb-20',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="relative border-t border-slate-100">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}