export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-heading text-foreground">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total Products
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">24</p>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Active Categories
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">2</p>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Recent Inquiries
          </h3>
          <p className="text-3xl font-bold text-primary mt-2">12</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
        <p>Welcome to the Greenary Export Admin Panel.</p>
        <p className="text-sm mt-2">Use the sidebar to manage your catalog.</p>
      </div>
    </div>
  );
}
