"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Minus, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection() {
  const [faqs, setFaqs] = useState<{ q: string; a: string }[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/api/faq')
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error("Failed to load FAQ", err));
  }, []);

  if (faqs.length === 0) return null;

  // Logika menampilkan data: tampilkan semua jika showAll true, jika tidak hanya 5
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl text-blue-600 mb-6 shadow-sm">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">
            Common Questions
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif italic mb-4">
            Everything You Need to Know
          </h3>
          <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Quick answers to our most frequently asked questions about dolphin tours, pickup services, and ethics.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="relative">
          <div className="space-y-4">
            {displayedFaqs.map((faq, i) => (
              <div 
                key={i} 
                className={`group overflow-hidden rounded-[2rem] border transition-all duration-300 ${
                  openIndex === i 
                  ? "bg-white border-blue-200 shadow-xl shadow-blue-900/5" 
                  : "bg-white/50 border-slate-100 hover:border-slate-200"
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-8 py-7 flex items-center justify-between text-left"
                >
                  <span className={`text-base md:text-lg font-bold transition-colors pr-4 ${
                    openIndex === i ? "text-blue-600" : "text-slate-800"
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
                    openIndex === i ? "bg-blue-600 text-white rotate-180" : "bg-slate-100 text-slate-400"
                  }`}>
                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-8 text-slate-500 leading-relaxed border-t border-slate-50 pt-5 text-sm md:text-base">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Overlay (Hanya muncul jika belum showAll) */}
          {!showAll && faqs.length > 5 && (
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent flex items-end justify-center pb-4 pointer-events-none">
              <button 
                onClick={() => setShowAll(true)}
                className="pointer-events-auto flex items-center gap-2 px-10 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 group"
              >
                <span>Read all {faqs.length} questions</span>
                <ChevronDown className="w-4 h-4 text-blue-600 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Show Less Button (Muncul di bawah setelah semua terbuka) */}
        {showAll && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => {
                setShowAll(false);
                setOpenIndex(0); // Kembali ke item pertama
                window.scrollTo({ top: document.getElementById('faq-top')?.offsetTop || 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-8 py-3 text-slate-400 hover:text-blue-600 font-medium transition-colors group"
            >
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              <span>Show Less</span>
            </button>
          </div>
        )}

        {/* Floating ID for Scroll anchor (Optional) */}
        <div id="faq-top" />

        {/* CTA Section */}
        <div className={`mt-20 text-center bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white transition-all duration-700 relative overflow-hidden`}>
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h4 className="text-2xl md:text-3xl font-bold mb-3 font-serif italic">Still have a question?</h4>
            <p className="text-slate-400 mb-10 text-sm md:text-base max-w-md mx-auto">
              {"If you couldn't find what you're looking for, our local family team is ready to chat with you directly."}
            </p>
            <a 
              href="https://wa.me/6283115300070?text=Hi Lovina Ocean, I have a question about..."
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50"
            >
              Message us on WhatsApp
            </a>
            <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Typically replies within 15 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}