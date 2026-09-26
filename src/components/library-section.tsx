"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { fetchWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";
import WorkoutCard from "./workout-card";
import SortDropdown, { SortKey } from "./sort-dropdown";
import Loader from "./loader";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchWorkouts()
      .then((data) => {
        if (!cancelled) {
          setWorkouts(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.categories.some((c) => c.toLowerCase().includes(q)) ||
        w.equipment.toLowerCase().includes(q)
    );
  }, [workouts, query]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      if (sortKey === "rating") return b.rating - a.rating;
      if (sortKey === "calories") return a.calories - b.calories;
      return a.duration - b.duration;
    });
    return copy;
  }, [filtered, sortKey]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            The Library
          </h2>
          <p className="mt-1 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        {status === "ready" && workouts.length > 0 && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or tag…"
                className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-white outline-none transition-colors placeholder:text-muted hover:border-accent focus:border-accent sm:w-56"
              />
            </div>
            <SortDropdown value={sortKey} onChange={setSortKey} />
          </div>
        )}
      </div>

      {status === "loading" && <Loader />}

      {status === "error" && (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <p className="font-display text-lg uppercase tracking-wide text-white">
            Couldn&apos;t load the library
          </p>
          <p className="mt-2 text-sm text-muted">
            Please check your connection and try refreshing the page.
          </p>
        </div>
      )}

      {status === "ready" && sorted.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="font-display text-lg uppercase tracking-wide text-white">
            No lifts match &quot;{query}&quot;
          </p>
          <p className="mt-2 text-sm text-muted">Try a different name, muscle group, or equipment.</p>
        </div>
      )}

      {status === "ready" && sorted.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
