export const metadata = {
  title: "Distinctions & Certifications | Greenary Export",
  description:
    "Verified quality: USDA Organic, Global GAP, ISO 9001 certified.",
};

export default function CertificationsPage() {
  const certs = [
    {
      name: "ISO 9001:2015",
      desc: "Certified Quality Management System ensuring consistent product quality and customer satisfaction.",
      color: "bg-blue-50 border-blue-100 text-blue-900",
    },
    {
      name: "USDA Organic",
      desc: "Adherence to strict federal standards for organic farming, free from synthetic pesticides and fertilizers.",
      color: "bg-green-50 border-green-100 text-green-900",
    },
    {
      name: "Global G.A.P",
      desc: "Good Agricultural Practice certification ensuring safe and sustainable agriculture worldwide.",
      color: "bg-sky-50 border-sky-100 text-sky-900",
    },
    {
      name: "HACCP",
      desc: "Hazard Analysis Critical Control Point system for managing food safety risks.",
      color: "bg-orange-50 border-orange-100 text-orange-900",
    },
    {
      name: "Fair Trade",
      desc: "Commitment to fair pricing and better working conditions for farmers and workers.",
      color: "bg-emerald-50 border-emerald-100 text-emerald-900",
    },
    {
      name: "FSSAI License",
      desc: "Licensed by the Food Safety and Standards Authority of India.",
      color: "bg-purple-50 border-purple-100 text-purple-900",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
          Our Quality Promise
        </h1>
        <p className="text-lg text-muted-foreground">
          We adhere to the strictest international standards to ensure that
          every product leaving our facility is safe, pure, and of the highest
          quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certs.map((cert) => (
          <div
            key={cert.name}
            className={`p-8 rounded-xl border ${cert.color} transition-all hover:shadow-md`}
          >
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-xl font-bold">
              {cert.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold mb-3">{cert.name}</h3>
            <p className="text-sm opacity-80 leading-relaxed">{cert.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 md:p-12 bg-muted/50 rounded-2xl text-center">
        <h2 className="text-2xl font-bold font-heading text-primary mb-4">
          Request Certificates
        </h2>
        <p className="text-muted-foreground mb-8 text-sm md:text-base">
          Need to verify our credentials? We are happy to provide copies of our
          certificates upon request.
        </p>
        <a
          href="/contact"
          className="inline-flex h-10 items-center justify-center rounded-md bg-white border border-input px-8 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Contact Compliance Team
        </a>
      </div>
    </div>
  );
}
