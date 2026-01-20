import prisma from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export default async function GuestBlogList() {
  const posts = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
  })
  const breadcrumbData = {
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
      }
    ]
  };

  return (
    
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section - Menangkap perhatian langsung */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <section className="bg-sky-600 pt-24 pb-20 px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase italic">
          Lovina Ocean Story        </h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-lg">
          Tips, stories, and the ultimate guide to the best dolphin watching experience in Bali.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 -mt-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col"
            >
              {/* Thumbnail with Hover Effect */}
              <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image || "/placeholder-ocean.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Travel Guide
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-slate-400 text-xs mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> 
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> 5 min read
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt - SEO Friendly */}
                <div 
                  className="text-slate-500 text-sm line-clamp-3 mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />

                <div className="mt-auto">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider group/btn"
                  >
                    Read Story 
                    <div className="p-2 bg-slate-900 text-white rounded-full group-hover/btn:bg-blue-600 group-hover/btn:translate-x-2 transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 italic">No stories found yet. Come back later!</p>
          </div>
        )}
      </main>
    </div>
  )
}