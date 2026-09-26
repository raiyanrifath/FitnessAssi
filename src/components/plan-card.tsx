"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, CheckCircle2, X } from "lucide-react";
import { PlanItem } from "@/lib/types";

export default function PlanCard({
  item,
  onRemove,
  onMarkDone,
}: {
  item: PlanItem;
  onRemove: () => void;
  onMarkDone?: () => void;
}) {
  const { workout, done } = item;

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border bg-surface p-4 transition-colors sm:flex-row sm:items-center ${
        done ? "border-accent/50" : "border-border"
      }`}
    >
      <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-surface2 sm:h-20 sm:w-28">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-display text-base font-bold uppercase tracking-wide">
          {workout.name}
          {done && (
            <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-wider text-accent">
              Done
            </span>
          )}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-accent" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={13} className="text-accent" /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 self-stretch sm:self-center">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {onMarkDone && (
          <button
            onClick={onMarkDone}
            title="Mark as done"
            aria-label="Mark workout as done"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent"
          >
            <CheckCircle2 size={16} />
          </button>
        )}
        <button
          onClick={onRemove}
          title="Remove"
          aria-label="Remove workout"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted hover:border-red-400 hover:text-red-400"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
