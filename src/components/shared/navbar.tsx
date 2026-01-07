"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Anchor } from "lucide-react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact" },
  // { name: "Gallery", href: "/gallery" },
  // { name: "Blog", href: "/blog" },
  
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
        <Link href="/" className="flex items-center space-x-2">
          <Anchor className={`w-8 h-8 ${scrolled ? "text-blue-600" : "text-white"}`} />
          <span className={`text-xl font-serif italic tracking-tighter ${
            scrolled ? "text-slate-900" : "text-white"
          }`}>
            Lovina Ocean
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
  className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
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
          <span className="text-xs font-bold tracking-widest border-b border-slate-900">IG</span>
          <span className="text-xs font-bold tracking-widest border-b border-slate-900">FB</span>
          <span className="text-xs font-bold tracking-widest border-b border-slate-900">WA</span>
       </div>
    </div>
  </div>
</div>
    </nav>
  );
}