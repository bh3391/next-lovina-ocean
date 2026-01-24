"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPreview() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setImages(data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch gallery preview", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPreview();
  }, []);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  };

  if (loading || images.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-blue-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif italic mb-4 text-blue-900 tracking-tighter">
            Our Gallery
          </h2>
          <p className="text-gray-500 max-w-2xl">
            A glimpse of the unforgettable moments and stunning landscapes we've shared with our guests.
          </p>
        </div>

        {/* Layout Wrapper */}
        <div className="flex flex-col md:flex-row gap-4 h-full md:h-[600px]">
          {/* KANAN: 1 Featured Besar (Mobile: Paling Atas) */}
          <div className="order-1 md:order-2 md:w-2/3 h-[350px] md:h-full">
            <div 
              onClick={() => setSelectedIdx(0)}
              className="relative h-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-xl group bg-slate-200 cursor-pointer"
            >
              <Image 
                src={images[0].imageUrl} 
                alt="Featured" 
                fill 
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
                  Featured Discovery
                </span>
              </div>
            </div>
          </div>
          {/* KIRI: 4 Gambar Landscape (Mobile: Grid 2x2) */}
          <div className="order-2 md:order-1 md:w-1/3 grid grid-cols-2 md:grid-cols-1 gap-4">
            {images.slice(1, 5).map((img, i) => (
              <div 
                key={img.id} 
                onClick={() => setSelectedIdx(i + 1)}
                className="relative h-32 md:h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm group bg-slate-200 cursor-pointer"
              >
                <Image 
                  src={img.imageUrl} 
                  alt="Gallery" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="text-white w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

          
        </div>

        <div className="mt-14 text-center">
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            Explore Full Gallery
          </Link>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-[110]">
              <X size={32} />
            </button>

            {/* Navigasi */}
            <div className="absolute inset-x-4 md:inset-x-10 flex justify-between items-center z-[105]">
              <button 
                onClick={prevImg}
                className={`p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all ${selectedIdx === 0 ? 'invisible' : 'visible'}`}
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextImg}
                className={`p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all ${selectedIdx === images.length - 1 ? 'invisible' : 'visible'}`}
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Gambar Besar */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full h-[70vh] md:h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={images[selectedIdx].imageUrl} 
                alt="Lightbox" 
                fill
                className="object-contain"
                priority
              />
              <div className="absolute -bottom-10 left-0 right-0 text-center">
                <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
                  {images[selectedIdx].category || 'Gallery'} • {selectedIdx + 1} / {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}