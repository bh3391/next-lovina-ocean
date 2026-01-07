"use client"

import React from 'react';
import Image from 'next/image';
import { Anchor, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutHome() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side - Mobile First: Stack on top */}
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl shadow-2xl">
              <Image 
                src="https://res.cloudinary.com/doiaj5zz1/image/upload/v1767764347/photo_6078126705735743735_y-768x1024_l8nity.jpg" // Gambar nelayan/perahu lokal
                alt="Local Lovina Fisherman"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Badge - Desktop Only */}
            <div className="hidden md:block absolute -bottom-10 -right-10 bg-blue-600 p-8 rounded-2xl text-white shadow-xl animate-bounce-slow">
              <p className="text-4xl font-serif italic mb-1">15+</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">Years of Experience</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.3em]">Our Heritage</span>
              <h2 className="text-4xl md:text-5xl font-serif italic leading-tight text-slate-900">
                Preserving the Magic of <br />
                <span className="not-italic font-sans font-bold text-blue-600">Lovina's Waters</span>
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
              A Legacy Born from the Sea
Founded by a local fisherman family who has navigated the North Bali tides for generations, Lovina Ocean is more than just a tour provider—we are a living bridge between the ancient traditions of Lovina and the modern world of eco-tourism.

For decades, our family relied on the ocean’s bounty. We didn’t just learn to sail; we learned to listen to the sea, to understand the migration of the pods, and to respect the delicate balance of the reef. Today, we have traded our nets for cameras and snorkel gear, transforming our deep local knowledge into a mission to protect the very waters that have sustained us for a century.
            </p>

            {/* Feature Points - Optimized for Mobile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-left">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Anchor className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Local Wisdom</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Guided by generations of local knowledge.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Eco-Friendly</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Respectful distances & sustainable boats.</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/about-us" className="inline-flex items-center space-x-3 text-slate-900 font-bold text-xs uppercase tracking-widest border-b-2 border-slate-900 pb-2 hover:text-blue-600 hover:border-blue-600 transition-all">
                <span>Read More About Us</span>
                <Heart className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}