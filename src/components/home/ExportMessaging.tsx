export function ExportMessaging() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -left-[10%] top-[20%] w-[40%] h-[40%] bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-[10%] bottom-[20%] w-[40%] h-[40%] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
            Why Choose Us?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
            Global Export Capabilities
          </h2>
          <p className="text-lg text-muted-foreground">
            We bridge the gap between premium organic farms and international
            markets with our robust logistics and quality assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {/* Card 1 */}
          <div className="group bg-card hover:bg-card/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-0" />
            <div className="h-14 w-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
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
            <h3 className="text-xl font-bold mb-3 font-heading relative z-10">
              Secure Packaging
            </h3>
            <p className="text-muted-foreground relative z-10">
              International standard packaging to ensure freshness and prevent
              damage during transit, tailored for sensitive produce.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-card hover:bg-card/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-0" />
            <div className="h-14 w-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
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
            <h3 className="text-xl font-bold mb-3 font-heading relative z-10">
              Global Logistics
            </h3>
            <p className="text-muted-foreground relative z-10">
              Efficient supply chain network covering all major ports in Europe,
              Americas, and Asia, ensuring timely delivery.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-card hover:bg-card/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-0" />
            <div className="h-14 w-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
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
            <h3 className="text-xl font-bold mb-3 font-heading relative z-10">
              Documentation Support
            </h3>
            <p className="text-muted-foreground relative z-10">
              Full support with phytosanitary certificates, origin forms, and
              custom clearance docs for hassle-free imports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
