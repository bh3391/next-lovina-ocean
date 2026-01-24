"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Anchor } from "lucide-react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  
  // Cleanup function untuk mengembalikan scroll jika komponen unmount
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isOpen]);

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
  <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
    {/* Logo Putih - Muncul saat di atas (scrolled = false) */}
    <Image
      src="/logo-putih.png"
      alt="Lovina Ocean Logo"
      fill
      className={`object-contain transition-opacity duration-500 ${
        scrolled ? "opacity-0" : "opacity-100"
      }`}
      priority
    />

    {/* Logo Biru - Muncul saat di-scroll (scrolled = true) */}
    <Image
      src="/logo-biru-crop.png"
      alt="Lovina Ocean Logo"
      fill
      className={`object-contain transition-opacity duration-500 absolute top-0 left-0 ${
        scrolled ? "opacity-100" : "opacity-0"
      }`}
    />
  </div>
  
  {/* Teks Nama Brand (Opsional) */}
  <span className={`font-serif italic text-md transition-colors duration-300 ${
    scrolled ? "text-slate-800" : "text-white"
  }`}>
    Lovina Ocean Dolphin Tour
  </span>
</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm uppercase tracking-[0.2em] hover:text-blue-500 transition-colors ${
                scrolled ? "text-slate-600" : "text-white"
              } ${pathname === link.href ? "font-bold border-b-2 border-blue-500" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Clerk Authentication */}
          <SignedOut>
            <Link 
              href="/sign-in"
              className="text-sm uppercase tracking-[0.2em] hover:text-blue-500 transition-colors"
            >
              Sign In
            </Link>
          </SignedOut>
          
          <SignedIn>
            <UserButton />
          </SignedIn>
          
          <Link 
            href="/contact"
            className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-blue-700 transition-all"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden outline-none"
          aria-label="Open Navigation Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={scrolled ? "text-slate-900" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-slate-900" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {/* Mobile Menu Overlay */}
<div
  className={`fixed inset-0 h-[100dvh] bg-white/95 backdrop-blur-xl z-[999] top-0 left-0 right-0 -translate-y-full overflow-y-auto flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
    isOpen 
      ? "opacity-100 pointer-events-auto translate-y-0" 
      : "opacity-0 pointer-events-none -translate-y-10"
  }`}
>
  <div className="flex flex-col items-center space-y-8">
    {navLinks.map((link, index) => (
      <Link
        key={link.name}
        href={link.href}
        onClick={() => setIsOpen(false)}
        style={{ transitionDelay: `${index * 50}ms` }}
        className={`text-2xl font-serif italic text-slate-800 hover:text-blue-600 transition-all ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {link.name}
      </Link>
    ))}
    
    <div className={`pt-12 text-center transition-all duration-700 delay-300 ${
      isOpen ? "opacity-100" : "opacity-0"
    }`}>
       <p className="text-gray-400 text-[10px] uppercase tracking-[0.5em] mb-6">Connect With Us</p>
       <div className="flex space-x-8 justify-center text-slate-900">
          <span className="text-xs font-bold tracking-widest border-b border-slate-900"><a href="https://www.instagram.com/lovina_paket_dolphin_tour?igsh=MTAwNjAwOGx3c2FpMg==&utm_source=ig_contact_invite">IG</a></span>
          <span className="text-xs font-bold tracking-widest border-b border-slate-900"><a href="https://wa.me/6283115300070">WA</a></span>
          
       </div>
    </div>
  </div>
</div>
    </nav>
  );
}