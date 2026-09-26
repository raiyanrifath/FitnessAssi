import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-border bg-bg">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div>
          <p className="mb-3 font-display text-sm font-semibold tracking-[0.3em] text-accent">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-6 max-w-md text-base text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-bg transition-transform hover:scale-105"
          >
            Browse Workouts
            <ArrowDown size={16} />
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/banner.png"
              alt="FitLog hero"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
