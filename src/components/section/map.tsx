import React from 'react';

export default function MapSection() {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Our Meeting Point
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find us easily at Lovina Beach. This is where our journey to see the dolphins begins.
          </p>
        </div>

        {/* Map Container */}
        <div className="h-[450px] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl relative">
          <iframe 
            // Pastikan URL src ini adalah URL Embed yang benar dari Google Maps
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63190.147227953006!2d115.021397!3d-8.163991!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd19bcb57c1c79b%3A0xa5da365f3a6ef33!2sLovina%20Ocean%20Dolphin%20Tour!5e0!3m2!1sen!2sus!4v1767969902426!5m2!1sen!2sus"
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
    
  );
}