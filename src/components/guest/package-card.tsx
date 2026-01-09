"use client";

import Image from "next/image";
import Link from "next/link";
import { getSmartImage } from "@/lib/image-loader";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function PackageCard({ pkg }: { pkg: any }) {
  // Ambil durasi sederhana dari jumlah itinerary
  const itineraryCount = Array.isArray(pkg.itinerary) ? pkg.itinerary.length : 0;

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* Image Header */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={getSmartImage(pkg.image || "/placeholder-dolphin.jpg", 600)}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6">
          <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-serif">
            {pkg.title}
          </h3>
          <div className="text-right">
            <p className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">Starts from</p>
            <p className="text-lg font-black text-blue-600">IDR {pkg.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Info Icons */}
        <div className="flex items-center space-x-4 mb-6 text-slate-500 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{itineraryCount > 0 ? `${itineraryCount} Steps` : 'Full Day'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant Booking</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="space-y-2 mb-8">
          {pkg.features.slice(0, 3).map((feature: string, i: number) => (
            <div key={i} className="flex items-center text-xs text-slate-600">
              <div className="w-1 h-1 bg-blue-400 rounded-full mr-2" />
              {feature}
            </div>
          ))}
        </div>

        <Link 
          href={`/packages/${pkg.slug}`}
          className="flex items-center justify-center w-full py-4 bg-slate-50 group-hover:bg-blue-600 text-slate-900 group-hover:text-white rounded-xl font-bold transition-all duration-300 space-x-2"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}