export default function Loader({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent" />
      <p className="font-display text-sm uppercase tracking-wider text-muted">
        {label}
      </p>
    </div>
  );
}
