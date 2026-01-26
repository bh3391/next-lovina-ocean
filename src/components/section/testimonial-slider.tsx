"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
            <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
              Guest Stories
            </h2>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">
              {reviews.length} / 725 Happy Travelers
            </p>
            
            {/* Navigation & See All Link */}
            <div className="pt-6 space-y-4">
               <div className="flex justify-center md:justify-start gap-4">
                <button onClick={slidePrev} className="p-2 border border-slate-100 rounded-full hover:bg-slate-50 hover:text-blue-600 transition-all" aria-label="Previous">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={slideNext} className="p-2 border border-slate-100 rounded-full hover:bg-slate-50 hover:text-blue-600 transition-all" aria-label="Next">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Tautan See All */}
              <div className="flex justify-center md:justify-start pt-2">
                <a 
                  href="https://search.google.com/local/reviews?placeid=ChIJm8fBV8ub0S0RM--m82WjXQo&q=Lovina+Ocean+Dolphin+Tour&hl=id&gl=ID" 
                  className="group inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-tighter transition-colors"
                >
                  See all our guest reviews
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Animated Content */}
          <div className="w-full md:w-2/3 relative min-h-[250px] md:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {/* Review Card */}
                <div className="space-y-6">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(reviews[currentIndex].stars || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed italic">
                    {`"${reviews[currentIndex].text}"`}
                  </p>

                  {/* Profile Section */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                      <span className="text-xs font-bold text-blue-700 uppercase">
                        {reviews[currentIndex].name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>

                    <div>
                      <p className="font-bold text-slate-900 text-sm leading-none mb-1">
                        {reviews[currentIndex].name}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        {reviews[currentIndex].country}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}