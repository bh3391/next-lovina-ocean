import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from "@/lib/prisma";
import { Plus, Edit, Trash2, MapPin, Tag } from 'lucide-react';

// Memastikan data selalu terbaru (tidak di-cache)
export const dynamic = 'force-dynamic';

export default async function PackagesPage() {
  // Ambil data dari Neon
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif italic">Tour Packages</h1>
          <p className="text-slate-500 text-sm">Manage your dolphin tours and expeditions</p>
        </div>
        
        <Link 
          href="/admin/packages/new" 
          className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all font-bold shadow-lg shadow-blue-900/20 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </Link>
      </div>

      {/* Grid Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <PackageSearch className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No packages found. Start by adding a new one!</p>
          </div>
        ) : (
          packages.map((pkg) => (
            <div key={pkg.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
              {/* Image Preview */}
              <div className="relative h-48 w-full bg-slate-100">
                {pkg.image ? (
                  <Image 
                    src={pkg.image} 
                    alt={pkg.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 italic text-xs">No Image</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                  <span className="text-xs font-bold text-blue-600">IDR {pkg.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{pkg.title}</h3>
                <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                  {pkg.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                    Draft
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Icon bantuan jika data kosong
function PackageSearch(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/></svg>
  )
}