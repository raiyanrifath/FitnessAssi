import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted"
            >
              {cat}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold uppercase leading-snug tracking-wide">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-auto flex items-center gap-4 border-t border-border pt-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-accent" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-accent" /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-accent" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
