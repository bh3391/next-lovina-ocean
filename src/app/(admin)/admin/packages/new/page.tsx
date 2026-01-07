import React from 'react';
import { createPackage } from "../action";
import { ArrowLeft, Save, ImageIcon, ListChecks, Info } from "lucide-react";
import Link from "next/link";
import ItineraryForm from '@/components/admin/itineraryform';

export default function NewPackagePage() {
  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/admin/packages" 
            className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create New Package</h1>
            <p className="text-sm text-slate-500">Add a new tour experience to your catalog.</p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <form action={createPackage} className="p-8 space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
              <Info className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Basic Information</h2>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Package Title</label>
              <input 
                name="title"
                type="text" 
                required
                placeholder="e.g., Sunrise Dolphin & Snorkeling"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Price (IDR)</label>
                <input 
                  name="price"
                  type="number" 
                  required
                  placeholder="500000"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>

              {/* Image URL Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Image URL</label>
                <div className="relative">
                  <input 
                    name="image"
                    type="text" 
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all pl-12"
                  />
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Details & Features */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
              <ListChecks className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Details & Features</h2>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Description</label>
              <textarea 
                name="description"
                rows={4}
                required
                placeholder="Describe the tour itinerary and what makes it special..."
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Features Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Features (Separate with comma)</label>
              <input 
                name="features"
                type="text" 
                placeholder="Boat included, Snorkeling Gear, Breakfast, Hotel Pickup"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              />
              <p className="text-[10px] text-slate-400 italic ml-1">*Enter features separated by commas to display them as a list.</p>
            </div>
          </div>
          <ItineraryForm />

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center space-x-3 active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              <span>Publish Package</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}