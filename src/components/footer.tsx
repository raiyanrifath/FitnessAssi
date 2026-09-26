import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={24} height={24} />
          <span className="font-display text-lg font-bold tracking-wide">
            FIT<span className="text-accent">LOG</span>
          </span>
        </div>
        <p className="text-center text-sm text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
