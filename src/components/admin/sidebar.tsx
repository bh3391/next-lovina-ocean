import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Package, Image as ImageIcon, FileText, LogOut, FileQuestion, TreePalm } from "lucide-react";

const menuItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Tour Packages", href: "/admin/packages", icon: Package },
  { name: "FAQ", href: "/admin/faq", icon: FileQuestion },
  
  {name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Testimonial", href: "/admin/testimonial", icon: TreePalm },
  { name: "Logout", href: "/sign-out", icon: LogOut },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div className="p-8">
        <h2 className="text-xl font-bold text-blue-600 tracking-tighter">Lovina Admin</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserButton afterSignOutUrl="/" />
          <span className="text-xs font-semibold text-slate-700">Account</span>
        </div>
      </div>
    </aside>
  );
}