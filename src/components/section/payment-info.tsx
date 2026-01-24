"use client"

import { CreditCard, Landmark, ShieldCheck, Copy, Check } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function PaymentInfo() {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Data Rekening Update
  const accountNumber = "8271200633"
  const accountName = "Kadek Astiti"
  const bankName = "BCA (Bank Central Asia)"

  // Pencegahan Hydration Error
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  // Menghindari mismatch UI antara Server dan Client
  if (!mounted) return null

  return (
    <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm max-w-md mx-auto">
      {/* Header */}
      <div className="bg-slate-900 p-8 text-white text-center">
        <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/50">
          <ShieldCheck size={24} />
        </div>
        <h3 className="text-2xl font-bold mb-1 italic">SECURE PAYMENT</h3>
        <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-medium">Safe & Reliable Booking</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Credit Card Section - Prioritas untuk Turis */}
        <div className="group flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 transition-all hover:shadow-md">
          <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600">
            <CreditCard size={20} />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 text-sm">We Accept Credit / Debit Card</h4>
            <p className="text-xs text-blue-700/70 mb-3 leading-relaxed">Accepted globally. Fast and secure checkout.</p>
            <div className="flex gap-3 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-slate-300">or Direct Transfer</span></div>
        </div>

        {/* Bank Transfer Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-5 border border-slate-100 rounded-3xl bg-slate-50/50">
            <div className="bg-white p-3 rounded-xl shadow-sm text-slate-400">
              <Landmark size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bank Provider</p>
              <p className="text-sm font-bold text-slate-800 tracking-tight">{bankName}</p>
            </div>
          </div>

          <div className="p-6 border-2 border-dashed border-slate-100 rounded-[2rem] relative bg-white transition-all hover:border-blue-200">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Account Number</p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xl font-mono font-black text-slate-900 tracking-widest">{accountNumber}</span>
              <button 
                onClick={handleCopy}
                className={`p-3 rounded-2xl transition-all ${copied ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-blue-600 text-white shadow-blue-200'} shadow-lg hover:scale-110 active:scale-95`}
                title="Copy Number"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Account Holder Name</p>
              <p className="text-sm font-bold text-slate-700 italic">{accountName}</p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Tag */}
        <p className="text-[9px] text-center text-slate-400 leading-relaxed px-4">
          *Please send your payment receipt via WhatsApp to confirm your booking immediately.
        </p>
      </div>
    </div>
  )
}