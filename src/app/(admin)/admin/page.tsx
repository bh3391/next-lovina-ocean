import { Package, FileText, Image as ImageIcon } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  // Ambil jumlah data dari Neon
  const packageCount = await prisma.package.count();
  
  const stats = [
    { label: "Total Packages", value: packageCount, icon: Package, color: "text-blue-600" },
    { label: "Blog Posts", value: 0, icon: FileText, color: "text-orange-600" },
    { label: "Gallery Photos", value: 0, icon: ImageIcon, color: "text-emerald-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm">Welcome back, Admin Lovina Ocean.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className={`p-4 rounded-xl bg-slate-50 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}