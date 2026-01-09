"use client";

import React from 'react';
import Image from 'next/image';
import { getSmartImage } from "@/lib/image-loader";
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';


export default function Hero() {
  return (
    


    <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Image - Optimized for Mobile Load */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-950 z-10" />
        <Image
          src={getSmartImage("https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=1200", 1200)}
          alt="Dolphin watching in Lovina Bali"
          fill
          priority
          className="object-cover scale-110 md:scale-105 animate-slow-zoom"
          sizes="100vw"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center">
        {/* Badge - Minimalist & Compact on Mobile */}
        <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full mb-6 md:mb-8 animate-fade-in-up">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
          </span>
          <span className="text-[9px] md:text-[10px] text-blue-200 uppercase tracking-[0.3em] font-medium">
            {"Bali's Best Kept Secret"}
          </span>
        </div>

        {/* Heading - Dynamic Sizing */}
        <h1 className="text-[2.8rem] leading-[0.95] md:text-8xl lg:text-9xl text-white font-serif italic mb-5 tracking-tighter">
          Wild & <br />
          <span className="not-italic font-sans font-black uppercase bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Beautiful
          </span>
        </h1>

        {/* Description - Optimized readability on small screens */}
        <p className="text-white/60 text-xs md:text-lg max-w-[280px] md:max-w-lg mx-auto mb-10 font-light leading-relaxed tracking-wide">
          Witness the sunrise magic with dolphins in the pristine waters of Lovina.
        </p>
        
        {/* Buttons - High Ergonomics for Mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-[280px] sm:max-w-none">
          <Link href="/packages" className="active:scale-95 w-full sm:w-auto bg-blue-600 text-white px-8 py-4 md:py-5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center space-x-3 shadow-lg shadow-blue-900/40">
            <span>Explore Tour</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a 
  href="https://wa.me/6283115300070?text=Hi%20Lovina%20Ocean,%20I'd%20like%20to%20inquire%20about%20the%20dolphin%20tour." 
  target="_blank" 
  rel="noopener noreferrer"
  className="w-full sm:w-auto"
>
  <button className="active:scale-95 w-full bg-white/5 border border-white/20 text-white backdrop-blur-md px-8 py-4 md:py-5 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center space-x-3 hover:bg-white/10 hover:border-white/40">
    <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
    <span>WhatsApp</span>
  </button>
</a>
        </div>
      </div>

      {/* Hide Scroll Indicator on Mobile to save space */}
      <div className="absolute bottom-10 hidden md:flex flex-col items-center gap-4">
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
      </div>
    </section>
  );
}