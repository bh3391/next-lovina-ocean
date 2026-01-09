import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getSmartImage } from "@/lib/image-loader";
import { Clock,  MapPin, Check, ChevronRight,  } from "lucide-react";

export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = await prisma.package.findUnique({
    where: { slug: params.slug },
  });

  if (!pkg) notFound();

  // Memastikan itinerary adalah array yang valid
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full">
        <Image
          src={getSmartImage(pkg.image || "/placeholder.jpg", 1200)}
          alt={pkg.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl md:text-6xl font-black text-white font-serif mb-4 italic">
              {pkg.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90 text-sm font-medium">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" /> {itinerary.length} Activity Steps
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" /> Lovina, Bali
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {pkg.description}
            </p>
          </div>

          {/* Features / Inclusions */}
          <div className="bg-slate-50 p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-600" /> {"What's Included"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pkg.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-slate-700">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary Timeline */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-10 font-serif italic">Trip Itinerary</h2>
            
            <div className="relative ml-4 md:ml-6">
              {/* Line - Dibuat lebih halus dengan dashed effect */}
              <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-slate-100 border-l-2 border-dashed border-slate-200" />

              <div className="space-y-12">
                {itinerary.map((item: any, index: number) => (
                  <div key={index} className="relative pl-10 group">
                    
                    {/* Dot Indicator - Dibuat lebih subtle */}
                    <div className="absolute left-[-9px] top-1 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-blue-600 group-hover:bg-blue-600 transition-colors duration-300 shadow-sm" />
                      {/* Ping animation effect untuk item pertama/aktif */}
                      {index === 0 && (
                        <div className="absolute w-4 h-4 rounded-full bg-blue-600 animate-ping opacity-20" />
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                      {/* Time Column */}
                      <div className="min-w-[100px] pt-0.5">
                        <time className="text-sm font-black uppercase tracking-tighter text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                          {item.time}
                        </time>
                      </div>

                      {/* Activity Description */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                          {item.activity.split(':')[0]} 
                        </h3>
                        {/* Jika deskripsi dipisahkan oleh titik dua (:) */}
                        {item.activity.includes(':') && (
                          <p className="text-slate-500 leading-relaxed text-sm md:text-base max-w-2xl">
                            {item.activity.split(':').slice(1).join(':').trim()}
                          </p>
                        )}
                        {/* Jika tidak ada titik dua, tampilkan semua teks sebagai activity */}
                        {!item.activity.includes(':') && (
                          <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                            {item.activity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Price Per Person</p>
            <div className="space-y-3 mb-8">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-300 text-sm">Sharing Tour</span>
                <span className="text-2xl font-black text-emerald-400">IDR {pkg.priceSharing.toLocaleString()}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-300 text-sm">Private Tour</span>
                <span className="text-2xl font-black text-blue-400">IDR {pkg.pricePrivate.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span className="text-slate-400">Location</span>
                <span>Lovina, North Bali</span>
              </div>
              <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span className="text-slate-400">Availability</span>
                <span className="text-emerald-400">Everyday</span>
              </div>
            </div>

            <a 
              href={`https://wa.me/6283115300070?text=Hi, I want to book ${pkg.title}`}
              className="flex items-center justify-center w-full py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all gap-2"
            >
              Book via WhatsApp
              <ChevronRight className="w-4 h-4" />
            </a>
            <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-tighter">
              No hidden fees • Instant Confirmation
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}