"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialSliderMinimal() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        const testimonialData = Array.isArray(data) ? data : (data?.value || []);
        setReviews(testimonialData);
      })
      .catch(err => console.error("Error loading reviews", err));
  }, []);

  const slideNext = useCallback(() => {
    setReviews(prev => {
      if (prev.length === 0) return prev;
      setCurrentIndex((curr) => (curr + 1) % prev.length);
      return prev;
    });
  }, []);

  const slidePrev = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 bg-white border-y border-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          
          {/* Left Side: Static Info */}
          <div className="w-full md:w-1/3 text-center md:text-left space-y-2">
            <div className="flex justify-center md:justify-start gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-blue-600 text-blue-600" />
              ))}
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
              Guest Stories
            </h3>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">
              {reviews.length} Happy Travelers
            </p>
            
            {/* Minimal Navigation */}
            <div className="flex justify-center md:justify-start gap-4 pt-6">
              <button onClick={slidePrev} className="p-2 hover:text-blue-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={slideNext} className="p-2 hover:text-blue-600 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side: Animated Content */}
          <div className="w-full md:w-2/3 relative h-[220px] md:h-[180px]">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0"
    >
      {/* Stars & Rating */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(reviews[currentIndex].stars || 5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <div className="flex items-center gap-4">
        {/* Avatar Inisial */}
        <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">
            {reviews[currentIndex].name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
          </span>
        </div>

        <div>
          <p className="font-bold text-slate-900 text-sm leading-none mb-1">
            {reviews[currentIndex].name}
          </p>
          <p className="text-xs text-slate-400">
            {reviews[currentIndex].country}
          </p>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-lg md:text-xl text-slate-700 leading-relaxed italic mb-8">
  {`"${reviews[currentIndex].text}"`}
</p>

      {/* Profile Section */}
      
    </motion.div>
  </AnimatePresence>
</div>
        </div>
      </div>
    </section>
  );
}