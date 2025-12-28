import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="fixed inset-y-0 left-0 z-50 hidden md:block w-64">
        <AdminSidebar />
      </aside>

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between md:hidden">
          <span className="font-bold">Admin Panel</span>
          {/* Mobile Menu Toggle would go here */}
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
