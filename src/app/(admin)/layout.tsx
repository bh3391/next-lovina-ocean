import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/sidebar";


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  const user = await currentUser();

  // 1. Cek apakah sudah login
  if (!userId || !user) {
    redirect("/sign-in");
  }

  // 2. Cek Role Administrator di metadata
  // Kita asumsikan role disimpan di user.publicMetadata.role
  const role = user.publicMetadata?.role as string;

  if (role !== "administrator") {
    // Jika bukan admin, lempar ke halaman depan atau page "Unauthorized"
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        {children}
      </main>
    </div>
  );
}