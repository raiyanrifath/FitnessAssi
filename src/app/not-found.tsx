import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-display text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-bg transition-transform hover:scale-105"
      >
        <ArrowLeft size={16} /> Back to home
      </Link>
    </div>
  );
}
