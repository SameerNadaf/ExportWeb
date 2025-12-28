import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-xl font-bold font-heading text-primary">
              Greenary<span className="text-accent">Export</span>
            </span>
            <p className="text-sm text-muted-foreground">
              Premium quality organic spices and fruits exported directly from
              the finest farms.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/products/spices"
                  className="hover:text-primary transition-colors"
                >
                  Spices
                </Link>
              </li>
              <li>
                <Link
                  href="/products/fruits"
                  className="hover:text-primary transition-colors"
                >
                  Fruits
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/certifications"
                  className="hover:text-primary transition-colors"
                >
                  Certifications
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@greenaryexport.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Greenary Export. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
