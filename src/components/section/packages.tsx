import prisma from "@/lib/prisma";
import PackageCard from "@/components/guest/package-card";
import Link from "next/link";

export default async function PackagesSection() {
  const rawPackages = await prisma.package.findMany({
    take: 6, // Tampilkan 3 paket terpopuler di homepage
    orderBy: { createdAt: 'asc' }
  });

  const packages = rawPackages.map(pkg => ({
    ...pkg,
    createdAt: pkg.createdAt.toISOString(), // Ubah Date ke String
    price: Number(pkg.price), // Pastikan Float/Decimal jadi Number
  }));

  if (packages.length === 0) return null;

  return (
    
  
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-1 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs mb-4">
            Our Experience
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-6 italic">
            Most Popular Tour Packages
          </h3>
          <p className="text-slate-500 leading-relaxed">
            {"Choose from our curated selection of Lovina's best adventures. From sunrise dolphin watching to hidden waterfall expeditions."}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg) => (
       <PackageCard key={pkg.id} pkg={pkg} />
    ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link 
    href="/packages"
    className="inline-block px-8 py-4 border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-600 font-bold rounded-full transition-all active:scale-95"
  >
    Explore All Packages
  </Link>
        </div>
      </div>
    </section>
  );
}