"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "6283115300070"; // Ganti dengan nomor WA Anda (awali dengan 62)
  const message = "Hi Lovina Ocean! I'm interested in booking a Dolphin Tour. Can you help me?";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[80] group"
      aria-label="Chat on WhatsApp"
    >
      {/* Ripple Effect Animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 group-hover:opacity-40"></span>
      
      {/* Button Body */}
      <div className="relative bg-green-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 flex items-center justify-center">
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 fill-current" />
        
        {/* Tooltip - Only Desktop */}
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          Need Help? Chat Us
        </span>
      </div>
    </a>
  );
}