"use client";
import { useState, useEffect } from "react";
import { Star, Trash2, UploadCloud, Loader2, ImagePlus, X } from "lucide-react";

export default function AdminGallery() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Dolphin");
  const [photos, setPhotos] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPreviews, setSelectedPreviews] = useState<File[]>([]);

  // 1. Fetch Data
  const fetchPhotos = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setPhotos(data);
  };

  useEffect(() => {
    setIsMounted(true);
    fetchPhotos();
  }, []);

  // 2. Handle File Selection
  const handleFileSelection = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e: any) => {
      const files = Array.from(e.target.files as FileList);
      if (files.length > 0) setSelectedPreviews(files);
    };
    input.click();
  };

  // 3. Handle Upload dengan Loading Overlay
  const handleUpload = async () => {
    if (selectedPreviews.length === 0) return;
    setLoading(true);
    setUploadProgress({ current: 0, total: selectedPreviews.length });

    try {
      for (let i = 0; i < selectedPreviews.length; i++) {
        const file = selectedPreviews[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "lovina_blogs");

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/doiaj5zz1/image/upload`,
          { method: "POST", body: formData }
        );
        const cloudData = await cloudRes.json();

        if (cloudData.secure_url) {
          await fetch("/api/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imageUrl: cloudData.secure_url,
              category: category,
            }),
          });
        }
        setUploadProgress((prev) => ({ ...prev, current: i + 1 }));
      }
      setSelectedPreviews([]);
      await fetchPhotos();
      alert("✅ Semua foto berhasil diunggah!");
    } catch (error) {
      console.error(error);
      alert("❌ Terjadi kesalahan saat mengunggah.");
    } finally {
      setLoading(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  const setFeatured = async (id: string) => {
    const res = await fetch("/api/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchPhotos();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus foto ini dari galeri?")) return;
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    if (res.ok) fetchPhotos();
  };

  if (!isMounted) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto mt-10 min-h-screen relative">
      
      {/* OVERLAY LOADING FULL SCREEN */}
      {loading && (
        <div className="fixed inset-0 z-[999] bg-blue-900/60 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl flex flex-col items-center max-w-xs w-full">
            <div className="relative mb-6">
              {/* Spinner */}
              <div className="w-24 h-24 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-blue-600 font-black text-lg">
                {Math.round((uploadProgress.current / uploadProgress.total) * 100)}%
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Mengunggah Foto...</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Mohon tunggu, sedang memproses {uploadProgress.current} dari {uploadProgress.total} file.
            </p>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full mt-6 overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* PANEL KIRI: UPLOADER */}
        <div className="w-full md:w-1/3 sticky top-24">
          <div className="bg-white p-6 rounded-[2.5rem] border-2 border-gray-100 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-900">
              <UploadCloud size={24} /> Upload Gallery
            </h2>

            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Kategori</label>
            <select 
              className="w-full p-4 mt-1 mb-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Dolphin">Dolphin</option>
              <option value="Snorkeling">Snorkeling</option>
              <option value="Sunrise">Sunrise</option>
              <option value="Tour">Tour</option>
            </select>

            <button
              onClick={handleFileSelection}
              className="w-full py-6 mb-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-medium hover:bg-slate-50 hover:border-blue-300 hover:text-blue-500 transition-all flex flex-col items-center justify-center gap-2"
            >
              <ImagePlus size={28} />
              <span className="text-sm">
                {selectedPreviews.length > 0 ? `${selectedPreviews.length} Foto Dipilih` : "Klik untuk pilih foto"}
              </span>
            </button>

            {selectedPreviews.length > 0 && (
              <div className="relative mb-4">
                <div className="grid grid-cols-4 gap-2 p-2 bg-slate-50 rounded-xl max-h-32 overflow-y-auto">
                  {selectedPreviews.map((file, idx) => (
                    <img key={idx} src={URL.createObjectURL(file)} className="aspect-square object-cover rounded-lg shadow-sm" />
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedPreviews([])}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={selectedPreviews.length === 0}
              className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${
                selectedPreviews.length === 0 ? "bg-slate-200 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
              }`}
            >
              Mulai Unggah
            </button>
          </div>
        </div>

        {/* PANEL KANAN: LIST FOTO */}
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight italic">Manage Gallery</h1>
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {photos.length} Total
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className={`relative group aspect-square rounded-[2rem] overflow-hidden border-4 transition-all duration-500 ${
                  photo.isFeatured ? 'border-yellow-400 shadow-xl scale-[1.02]' : 'border-transparent shadow-sm'
                }`}
              >
                <img src={photo.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-black uppercase text-slate-600">
                  {photo.category}
                </div>

                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                  <button 
                    onClick={() => setFeatured(photo.id)}
                    className={`p-3 rounded-full transition-all hover:scale-110 ${
                      photo.isFeatured ? 'bg-yellow-400 text-black shadow-yellow-200 shadow-lg' : 'bg-white text-slate-600 hover:bg-yellow-50'
                    }`}
                  >
                    <Star size={20} fill={photo.isFeatured ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => handleDelete(photo.id)}
                    className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all hover:scale-110 shadow-lg shadow-red-200"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {photo.isFeatured && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-black p-1 rounded-full shadow-lg">
                    <Star size={12} fill="currentColor" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}