"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Lovina Ocean Dolphin Tour</h3>
            <p className="text-gray-400">
              {"Experience the magic of dolphin tours in Bali's stunning Lovina Beach."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/policy" className="hover:text-white transition">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Lovina Beach, Bali</li>
              <li>Phone: +6283115300070</li>
              
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-gray-400">
              
              <li>
                <Instagram className="inline-block mr-2" />
                <a href="https://www.instagram.com/lovina_paket_dolphin_tour?igsh=MTAwNjAwOGx3c2FpMg==&utm_source=ig_contact_invite" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
  <a href="https://www.tiktok.com/@lovinapaketdolphintour?_r=1&_t=ZS-93Ktz2pLu0W" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition">
    <svg role="img" className="inline-block mr-2 w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>TikTok</title>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.74-4.63 2.58-5.91 1.08-.78 2.39-1.2 3.73-1.22 1.35-.02 2.7.35 3.82 1.13V8.47c-1.01-.6-2.18-.91-3.35-.91-1.17 0-2.33.31-3.34.91-1.69 1.01-2.61 2.87-2.34 4.8.27 1.93 1.54 3.63 3.32 4.39 1.08.46 2.27.63 3.44.47 1.17-.16 2.28-.68 3.14-1.47.86-.79 1.39-1.89 1.48-3.05.09-1.16-.14-2.33-.67-3.37v-8.3z"/>
    </svg>
    TikTok
  </a>
</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex justify-between items-center text-gray-400 text-sm">
            <p>&copy; {currentYear} Lovina Ocean Dolphin Tours. All rights reserved.</p>
            <ul className="flex space-x-6">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
