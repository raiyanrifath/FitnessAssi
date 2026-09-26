"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePlan } from "@/context/plan-context";

const NAV_LINKS = [
  { href: "/#library", label: "Workout", match: "/" },
  { href: "/my-plan", label: "My Plan", match: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-xl font-bold tracking-wide">
            FIT<span className="text-accent">LOG</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.match;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-display text-sm font-medium uppercase tracking-wider transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-bg transition-transform hover:scale-105"
          >
            Plan {planCount}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-border px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-accent hover:text-accent"
          >
            Saved {savedCount}
          </Link>
          <button
            className="ml-1 text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-border bg-bg px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 font-display text-sm uppercase tracking-wider text-muted hover:bg-surface hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
