"use client";

import React from 'react';
import { Car, MapPin, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export default function PickupSection() {
  const locations = [
    { area: "South Bali", spots: "Kuta, Seminyak, Canggu, Jimbaran", price: "750k", duration: "3-3.5h" },
    { area: "Ubud Center", spots: "Ubud, Tegallalang, Gianyar", price: "650k", duration: "2-2.5h" },
    { area: "Sanur / Denpasar", spots: "Sanur Port, Denpasar City", price: "700k", duration: "2.5-3h" },
    { area: "Munduk / Bedugul", spots: "Munduk, Wanagiri, Bedugul", price: "450k", duration: "1-1.5h" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">Island-wide Access</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif leading-tight italic">
                Door-to-Shore <br /> Private Transfer
              </h3>
            </div>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              {"Don't worry about the long drive to the north. Our professional drivers will pick you up directly from your hotel lobby in a clean, air-conditioned private car, ensuring you arrive at Lovina refreshed and ready for the dolphins."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Safety First</h4>
                  <p className="text-sm text-slate-500">Experienced drivers & well-maintained fleet.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">On-Time</h4>
                  <p className="text-sm text-slate-500">Punctual pickup for sunrise departures.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
               <a 
                href="https://wa.me/6283115300070?text=I'd like to book a private pickup to Lovina"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all group"
              >
                Book a Transfer
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Content: Pricing Table Card */}
          <div className="relative">
            {/* Background Decorative Element */}
            <div className="absolute -inset-4 bg-blue-100/50 rounded-[3rem] -rotate-2" />
            
            <div className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-xl overflow-hidden">
              <div className="bg-slate-900 p-8 text-white">
                <div className="flex items-center gap-3">
                  <Car className="w-6 h-6 text-blue-400" />
                  <h4 className="text-xl font-bold">Standard Rates</h4>
                </div>
                <p className="text-slate-400 text-sm mt-1">Private car, up to 4-5 persons with luggage.</p>
              </div>
              
              <div className="p-2">
                {locations.map((loc, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-6 hover:bg-slate-50 rounded-2xl transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      <div>
                        <h5 className="font-bold text-slate-900">{loc.area}</h5>
                        <p className="text-xs text-slate-400">{loc.spots}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-blue-600">IDR {loc.price}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400">± {loc.duration}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-blue-50/50 border-t border-blue-50 text-center">
                <p className="text-xs text-blue-600 font-medium">
                  *Prices are per car (one-way). Includes petrol, driver, and parking.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}