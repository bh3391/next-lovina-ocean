import React from 'react';

export default function MapSection() {
  return (
    <section className="px-6 py-24 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif italic text-slate-800 mb-4">
            Our Meeting Point
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find us easily at Lovina Beach. This is where our journey to see the dolphins begins.
          </p>
        </div>

        <div className="group h-[450px] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative">
  {/* 1. Iframe Map - Berikan z-0 agar berada di paling bawah */}
  <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.3460549559619!2d115.02075306961203!3d-8.163989171977883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd19bcb57c1c79b%3A0xa5da365f3a6ef33!2sLovina%20Ocean%20Dolphin%20Tour!5e0!3m2!1sid!2sid!4v1769243435577!5m2!1sid!2sid" 
  width="600" 
  height="450" 
  style={{ border: 0 }} 
  allowFullScreen 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade"
  title="Lovina Ocean Dolphin Tours Location"
  className="w-full h-full"
/>

  {/* 2. Floating Button - Naikkan z-index ke z-30 agar selalu di atas iframe */}
  <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center pointer-events-none">
    <a 
      href="https://www.google.com/maps/dir/?api=1&destination=Lovina+Ocean+Dolphin+Tour" 
      target="_blank" 
      rel="noopener noreferrer"
      className="pointer-events-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 border-2 border-white/20 backdrop-blur-sm"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="14" 
        height="14" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="9 10 4 15 9 20"></polyline>
        <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
      </svg>
      GET DIRECTIONS
    </a>
  </div>

  {/* 3. Gradient Subtle (Opsional) - Memberikan sedikit bayangan di bawah agar tombol lebih terlihat */}
  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-20" />
</div>
      </div>
    </section>
    
  );
}