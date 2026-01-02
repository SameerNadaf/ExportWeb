import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-bold font-heading text-primary/20 mb-4">
        404
      </h1>
      <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
        Page Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Oops! The page you are looking for seems to have wandered off. It might
        have been moved, deleted, or possibly never existed.
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Return Home
      </Link>
    </div>
  );
}
