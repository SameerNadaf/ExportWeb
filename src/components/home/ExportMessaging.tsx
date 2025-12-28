export function ExportMessaging() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-heading text-primary mb-12">
          Global Export Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
            <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Packaging</h3>
            <p className="text-muted-foreground text-sm">
              International standard packaging to ensure freshness and prevent
              damage during transit.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
            <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Global Logistics</h3>
            <p className="text-muted-foreground text-sm">
              Efficient supply chain network covering all major ports in Europe,
              Americas, and Asia.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-sm border border-border">
            <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Documentation</h3>
            <p className="text-muted-foreground text-sm">
              Full support with phytosanitary certificates, origin forms, and
              custom clearance docs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
