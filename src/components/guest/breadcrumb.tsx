"use client"

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbProps {
  title: string;
}

export default function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide"
    >
      <Link 
        href="/" 
        className="hover:text-blue-600 flex items-center gap-1 transition-colors min-w-fit"
      >
        <Home size={14} />
        <span>Home</span>
      </Link>
      
      <ChevronRight size={14} className="flex-shrink-0 text-slate-300" />
      
      <Link 
        href="/blog" 
        className="hover:text-blue-600 transition-colors min-w-fit"
      >
        Blog
      </Link>
      
      <ChevronRight size={14} className="flex-shrink-0 text-slate-300" />
      
      <span className="text-slate-900 font-medium truncate max-w-[180px] md:max-w-none">
        {title}
      </span>
    </nav>
  )
}