"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { usePlan, PLAN_CAP_VALUE } from "@/context/plan-context";
import MetricsRow from "@/components/metrics-row";
import PlanCard from "@/components/plan-card";
import EmptyState from "@/components/empty-state";
import Loader from "@/components/loader";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, toggleDone, hydrated } =
    usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [query, setQuery] = useState("");

  const rawItems = tab === "plan" ? plan : saved;
  const activeItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rawItems;
    return rawItems.filter(
      (item) =>
        item.workout.name.toLowerCase().includes(q) ||
        item.workout.categories.some((c) => c.toLowerCase().includes(q))
    );
  }, [rawItems, query]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8">
        <MetricsRow items={plan} />
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 border-b border-border sm:border-b-0">
          {(
            [
              { key: "plan", label: `Today's Plan (${plan.length}/${PLAN_CAP_VALUE})` },
              { key: "saved", label: `Saved (${saved.length})` },
            ] as { key: Tab; label: string }[]
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative -mb-px px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider transition-colors sm:mb-0 ${
                tab === t.key
                  ? "border-b-2 border-accent text-accent"
                  : "border-b-2 border-transparent text-muted hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {rawItems.length > 0 && (
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search this list…"
              className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-white outline-none transition-colors placeholder:text-muted hover:border-accent focus:border-accent sm:w-52"
            />
          </div>
        )}
      </div>

      <div className="mb-10 h-px bg-border sm:hidden" />

      <div className="mt-6">
        {!hydrated ? (
          <Loader label="Loading workouts…" />
        ) : rawItems.length === 0 ? (
          <EmptyState />
        ) : activeItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="font-display text-lg uppercase tracking-wide text-white">
              No matches for &quot;{query}&quot;
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {activeItems.map((item) => (
              <PlanCard
                key={item.workout.id}
                item={item}
                onRemove={() =>
                  tab === "plan"
                    ? removeFromPlan(item.workout.id)
                    : removeFromSaved(item.workout.id)
                }
                onMarkDone={
                  tab === "plan" ? () => toggleDone(item.workout.id) : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
