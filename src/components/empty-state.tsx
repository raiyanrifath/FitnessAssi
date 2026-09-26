import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-20 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide">
        Nothing here yet
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-full bg-accent px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-bg transition-transform hover:scale-105"
      >
        Go to workouts
      </Link>
    </div>
  );
}
