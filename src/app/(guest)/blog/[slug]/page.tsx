// src/app/blog/[slug]/page.tsx
import prisma from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Info } from 'lucide-react'
import Breadcrumb from '@/components/guest/breadcrumb'

export default async function BlogPostDetail({ params }: { params: { slug: string } }) {
  const post = await prisma.blog.findUnique({ where: { slug: params.slug } });
  if (!post) return notFound();
  const breadcrumbDetail = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://lovinaoceandolphintour.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://lovinaoceandolphintour.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": post.title, // Dinamis sesuai judul artikel
      "item": `https://lovinaoceandolphintour.com/blog/${post.slug}`
    }
  ]
};

  return (
    <div className="bg-slate-50 min-h-screen">
     <div className='h-20 bg-slate-900 w-full mx-auto'></div>
    <article className="max-w-4xl mx-auto bg-white px-4 py-16">
      {/* Schema.org JSON-LD untuk AEO (AI Search) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbDetail) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "author": { "@type": "Organization", "name": "Lovina Ocean Dolphin" }
      })}} />
       <Breadcrumb title={post.title} />
      <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter text-slate-900">
        {post.title}
      </h1>

      <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <Image src={post.image!} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          {/* AEO Answer Box */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl mb-10">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Info size={18} /> Quick Summary
            </h4>
            <p className="text-blue-800 text-sm italic">
              "Best Time For Dolphin Watching in Lovina is Early Morning between 6 AM to 8 AM when dolphins are most active and visible. Book a tour with Lovina Ocean Dolphin for the best experience."
            </p>
          </div>

          <div className="prose prose-lg prose-blue max-w-none" 
               dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>

        {/* Sidebar Sticky (Banyak Link Konversi) */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 italic">Ready to see Dolphins?</h3>
              <p className="text-slate-400 text-sm mb-6">Book Now For Beeter Dolphin Watching Price.</p>
              <div className="space-y-3">
                <Link href="/packages/sunrise-and-dolphin-watching-tour" className="block w-full text-center bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">Sunrise Dolphin</Link>
                <Link href="/packages/dolphin-watching-swim-with-dolphin-and-snorkeling-at-coral-reef" className="block w-full text-center border border-slate-700 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">Dolphin & Snorkeling</Link>
                <Link href="/packages" className="block w-full text-center border border-slate-700 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">See All Packages</Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
    </div>
  )
}