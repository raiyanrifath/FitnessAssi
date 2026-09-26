import { PlanItem } from "@/lib/types";

export default function MetricsRow({ items }: { items: PlanItem[] }) {
  const exercises = items.length;
  const minutes = items.reduce((sum, p) => sum + (p.workout.duration || 0), 0);
  const calories = items.reduce((sum, p) => sum + (p.workout.calories || 0), 0);

  const stats = [
    { label: "Exercises", value: exercises },
    { label: "Minutes", value: minutes },
    { label: "Calories", value: calories },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-border bg-surface px-4 py-5 text-center sm:px-6"
        >
          <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
            {s.value}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
