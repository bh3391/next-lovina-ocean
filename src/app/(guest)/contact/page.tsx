"use client";

import React, { useState } from 'react';
import { MessageCircle, MapPin, Phone} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "6283115300070"; // Ganti dengan nomor Anda
    const text = `Hi Lovina Ocean! My name is ${name}. ${message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 py-24 text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold font-serif italic mb-4">Get in Touch</h1>
        <p className="text-slate-400 max-w-xl mx-auto">{ "Have questions about the dolphins or need a custom tour? We're just a message away." }</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-900/5">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Our Base</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
               jln, Spice beach club, <br />Kaliasem, Kec. Buleleng, Kabupaten Buleleng, Bali 81152
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-900/5">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">WhatsApp</h3>
              <p className="text-slate-500 text-sm">+6283115300070</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-900/5">
            <form onSubmit={handleWhatsApp} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                  <input 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Inquiry Type</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all appearance-none">
                    <option>Dolphin Watching</option>
                    <option>Snorkeling Trip</option>
                    <option>Pickup Service</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Message</label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell us your plans..." 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none"
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3">
                <MessageCircle className="w-5 h-5" />
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto h-[450px] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.3842066914194!2d115.0213968!3d-8.163990499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd19bcb57c1c79b%3A0xa5da365f3a6ef33!2sLovina%20Ocean%20Dolphin%20Tour!5e0!3m2!1sid!2sid!4v1767772940834!5m2!1sid!2sid" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </section>
    </main>
  );
}