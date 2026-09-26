"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, Bookmark, ArrowLeft } from "lucide-react";
import { fetchWorkoutById } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan, PLAN_CAP_VALUE } from "@/context/plan-context";
import Loader from "./loader";

const SPECS = (w: Workout) => [
  { label: "Equipment", value: w.equipment },
  { label: "Difficulty", value: w.difficulty },
  { label: "Sets", value: String(w.sets) },
  { label: "Reps", value: w.reps },
  { label: "Duration", value: `${w.duration} min` },
  { label: "Calories", value: `${w.calories} kcal` },
  { label: "Rating", value: String(w.rating) },
];

export default function WorkoutDetail({ id }: { id: string }) {
  const [workout, setWorkout] = useState<Workout | null | undefined>(undefined);
  const { addToPlan, addToSaved, isInPlan, isSaved, planCount } = usePlan();

  useEffect(() => {
    let cancelled = false;
    fetchWorkoutById(id).then((w) => {
      if (!cancelled) setWorkout(w);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (workout === undefined) return <Loader label="Loading workout…" />;

  if (workout === null) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide">
          Workout not found
        </h1>
        <p className="mt-2 text-sm text-muted">
          This lift may have been removed from the library.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-bg"
        >
          <ArrowLeft size={16} /> Back to library
        </Link>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planFull = planCount >= PLAN_CAP_VALUE;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted hover:text-accent"
      >
        <ArrowLeft size={14} /> Back to library
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {workout.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted"
              >
                {cat}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {workout.description}
          </p>

          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
            {SPECS(workout).map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="font-display uppercase tracking-wider text-muted">
                  {spec.label}
                </span>
                <span className="font-semibold text-white">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-bg">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              disabled={inPlan || planFull}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-bg transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarPlus size={16} />
              {inPlan
                ? "In today's plan"
                : planFull
                  ? "Today's plan is full"
                  : "Add to today's plan"}
            </button>
            <button
              onClick={() => addToSaved(workout)}
              disabled={saved}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Bookmark size={16} />
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
