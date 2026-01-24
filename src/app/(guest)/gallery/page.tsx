"use client";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Loader2 } from "lucide-react";

export default function FullGallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setPhotos(data);
      } catch (error) {
        console.error("Gagal mengambil galeri:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Cegah error Hydration di Next.js
  if (!mounted) return null;

  // Tampilan jika masih loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Tampilan jika data kosong
  if (photos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium">Belum ada foto di galeri.</p>
      </div>
    );
  }

  return (
    
    <main className="pt-32 pb-20 px-6 bg-sky-500 min-h-screen">
       
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-50 italic tracking-tighter">Our Memories</h1>
          <p className="text-slate-50 mt-2 font-medium">Captured moments of joy in Lovina Ocean</p>
        </div>

        {/* Layout Utama: 1 Besar Kiri, 4 Square Kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          
          {/* FEATURED (Paling Kiri) */}
          <div 
            onClick={() => setSelectedIdx(0)}
            className="lg:col-span-2 h-[400px] lg:h-[650px] rounded-[3rem] overflow-hidden cursor-pointer group relative shadow-2xl shadow-blue-900/10 bg-slate-200"
          >
            {photos[0] && (
              <>
                <img 
                  src={photos[0].imageUrl} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt="Featured"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 md:p-12">
                  <div>
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase mb-3 block w-fit tracking-widest">Featured Discovery</span>
                    <h2 className="text-white text-3xl md:text-4xl font-bold italic">Majestic Lovina</h2>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 4 GRID (Sisi Kanan) */}
          <div className="grid grid-cols-2 gap-4 h-full">
            {photos.slice(1, 5).map((photo, i) => (
              <div 
                key={photo.id || i}
                onClick={() => setSelectedIdx(i + 1)}
                className="relative aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-lg bg-slate-200"
              >
                <img src={photo.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gallery item" />
                <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="text-white w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MASONRY (Bawah) */}
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {photos.slice(5).map((photo, i) => (
            <div 
              key={photo.id || i + 5}
              onClick={() => setSelectedIdx(i + 5)}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group shadow-md break-inside-avoid bg-slate-200"
            >
              <img 
                src={photo.imageUrl} 
                className="w-full h-auto object-cover group-hover:brightness-90 transition-all" 
                alt="Gallery Masonry"
              />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedIdx !== null && photos[selectedIdx] && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Close Button */}
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition p-2">
            <X size={32} />
          </button>
          
          {/* Prev Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedIdx(prev => prev! > 0 ? prev! - 1 : prev) }}
            className="absolute left-2 md:left-4 p-4 text-white/30 hover:text-white transition"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Main Image */}
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <img 
              key={selectedIdx}
              src={photos[selectedIdx].imageUrl} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg animate-in fade-in zoom-in duration-300 shadow-2xl" 
              alt="Full view"
            />
            <p className="text-white/60 text-center mt-4 text-sm font-medium tracking-widest uppercase">
              {photos[selectedIdx].category || 'Gallery Photo'}
            </p>
          </div>

          {/* Next Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedIdx(prev => prev! < photos.length - 1 ? prev! + 1 : prev) }}
            className="absolute right-2 md:right-4 p-4 text-white/30 hover:text-white transition"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </main>
  );
}