"use client";

import Image from "next/image";
import Link from "next/link";
import { getSmartImage } from "@/lib/image-loader";
import { Clock, CheckCircle2, ArrowRight, Users, UserRound } from "lucide-react";

interface PackageProps {
  pkg: {
    id: string;
    title: string;
    slug: string;
    image: string;
    priceSharing: number; // Field baru
    pricePrivate: number; // Field baru
    itinerary: any[];
    features: string[];
  };
}

export default function PackageCard({ pkg }: PackageProps) {
  const itineraryCount = Array.isArray(pkg.itinerary) ? pkg.itinerary.length : 0;

  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
      {/* Image Header */}
      <div className="relative h-56 md:h-64 w-full overflow-hidden">
        <Image
          src={getSmartImage(pkg.image || "/placeholder-dolphin.jpg", 600)}
          alt={pkg.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        
        {/* Badge Status */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            Best Value
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-serif leading-tight mb-4">
          {pkg.title}
        </h3>

        {/* Price Section - Mobile Friendly Comparison */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50">
            <div className="flex items-center space-x-1 mb-1">
              <Users className="w-3 h-3 text-blue-500" />
              <p className="text-[10px] text-blue-600 uppercase font-bold tracking-wider">Sharing</p>
            </div>
            <p className="text-sm md:text-base font-black text-slate-900">
              IDR {pkg.priceSharing?.toLocaleString() || "150,000"}
            </p>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/50">
            <div className="flex items-center space-x-1 mb-1">
              <UserRound className="w-3 h-3 text-slate-500" />
              <p className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Private</p>
            </div>
            <p className="text-sm md:text-base font-black text-slate-900">
              IDR {pkg.pricePrivate?.toLocaleString() || "500,000"}
            </p>
          </div>
        </div>

        {/* Info Icons */}
        <div className="flex items-center space-x-4 mb-6 text-slate-600 text-xs md:text-sm font-medium">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{itineraryCount > 0 ? `${itineraryCount} Steps` : 'Full Day'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Instant Booking</span>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-2.5 mb-8 flex-grow">
          {pkg.features.slice(0, 3).map((feature: string, i: number) => (
            <div key={i} className="flex items-start text-[13px] text-slate-600 leading-snug">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link 
          href={`/packages/${pkg.slug}`}
          className="group/btn flex items-center justify-center w-full py-4 bg-slate-900 text-white rounded-2xl font-bold transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 space-x-2"
          aria-label={`View details for ${pkg.title}`}
        >
          <span>Explore Tour</span>
          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}