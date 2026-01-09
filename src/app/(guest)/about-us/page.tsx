
import Image from "next/image";
import { getSmartImage } from "@/lib/image-loader";
import { ShieldCheck, Globe, Anchor, Users, Heart } from "lucide-react";


export default function AboutUs() {
  return (
    
    <main className="bg-white">
      {/* Hero Section - Text Overlay on Serene Sea Image */}
      
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image 
          src={getSmartImage("https://res.cloudinary.com/doiaj5zz1/image/upload/v1767765948/Snorkeling_y2gmy9.png", 1200)}
          alt="Lovina Sunrise" 
          fill 
          className="object-cover"
        />
        
        <div className="absolute inset-0 bg-slate-900/40" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white font-serif italic mb-4">
            A Legacy Born from the Sea
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light tracking-wide">
            From traditional nets to marine conservation—our family story.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs">Our Heritage</span>
            <h2 className="text-4xl font-bold text-slate-900 font-serif leading-tight">
              Navigating Tides for Generations
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p>
                Founded by a local fisherman family who has navigated the North Bali tides for generations, 
                Lovina Ocean is more than just a tour provider—we are a living bridge between the ancient 
                traditions of Lovina and the modern world of eco-tourism.
              </p>
              <p>
                For decades, our family relied on the ocean’s bounty. We didn’t just learn to sail; we learned 
                to listen to the sea, to understand the migration of the pods, and to respect the delicate 
                balance of the reef.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src={getSmartImage("https://res.cloudinary.com/doiaj5zz1/image/upload/v1767764347/photo_6078126705735743735_y-768x1024_l8nity.jpg", 800)}
              alt="Traditional Balinese Boat" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mb-4">The Lovina Ocean Dolphin Tour Pillars</h2>
            <p className="text-slate-500">The values that guide every sunrise we meet at sea.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <ShieldCheck className="w-6 h-6" />, 
                title: "Ethical Encounters", 
                desc: "Strict 'No-Chase' policy. We wait for dolphins to approach us on their own terms." 
              },
              { 
                icon: <Globe className="w-6 h-6" />, 
                title: "Marine Conservation", 
                desc: "A portion of every booking goes toward reef restoration and plastic-free beaches." 
              },
              { 
                icon: <Anchor className="w-6 h-6" />, 
                title: "Local Expertise", 
                desc: "You are a guest of a family that knows every secret cove along the coast." 
              },
              { 
                icon: <Users className="w-6 h-6" />, 
                title: "Community Growth", 
                desc: "Directly supporting the North Bali economy and traditional families." 
              }
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-blue-600 text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <Heart className="w-10 h-10 mx-auto mb-8 opacity-50" />
          <blockquote className="text-3xl md:text-4xl font-serif italic leading-snug mb-8">
            {" Our father taught us that the ocean gives what you give to it. Today, we give it our protection, and it gives our guests the memory of a lifetime."}
          </blockquote>
          <p className="uppercase tracking-[0.2em] font-bold text-blue-200">— The Lovina Ocean Team</p>
        </div>
      </section>

      {/* FAQ Section (AEO Optimized) */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 font-serif mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { 
              q: "What makes Lovina Ocean Dolphin Tours different?", 
              a: "Lovina Ocean is uniquely owned and operated by a local fisherman family. We prioritize animal welfare over 'getting the shot', combining traditional knowledge with modern eco-tourism." 
            },
            { 
              q: "Does Lovina Ocean support the local community?", 
              a: "Yes. We employ local guides, use traditional outrigger boats (Jukung) maintained by local craftsmen, and lead beach clean-up initiatives." 
            },
            { 
              q: "Is Lovina Ocean a licensed tour provider?", 
              a: "Yes, we are a fully licensed tour operator specializing in marine activities in North Bali, adhering to all safety and environmental regulations." 
            }
          ].map((faq, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-3 flex items-start gap-3">
                <span className="text-blue-600">Q:</span> {faq.q}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
