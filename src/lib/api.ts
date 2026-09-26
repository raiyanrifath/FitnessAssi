import { Workout } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://api.abcz.workers.dev/api/fitlog";

const FALLBACK_IMAGES = [
  "/assets/illustration-1.png",
  "/assets/illustration-2.png",
  "/assets/illustration-3.png",
  "/assets/illustration-4.png",
  "/assets/photo-1.jpg",
  "/assets/photo-2.jpg",
  "/assets/photo-3.jpg",
  "/assets/photo-4.jpg",
];

/**
 * The live API's exact field names aren't guaranteed, so this normalizer
 * accepts a handful of common aliases for each field and always returns
 * a fully-shaped Workout, with sane fallbacks for anything missing.
 */
function pick(obj: Record<string, any>, keys: string[], fallback: any = undefined) {
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
  }
  return fallback;
}

function toArray(val: any): string[] {
  if (Array.isArray(val)) return val.filter(Boolean).map(String);
  if (typeof val === "string" && val.length) {
    return val
      .split(/[,/]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

let fallbackCursor = 0;
function nextFallbackImage() {
  const img = FALLBACK_IMAGES[fallbackCursor % FALLBACK_IMAGES.length];
  fallbackCursor += 1;
  return img;
}

export function normalizeWorkout(raw: any, index = 0): Workout {
  const id = String(
    pick(raw, ["id", "_id", "workoutId", "slug"], `workout-${index}`)
  );

  const name = String(
    pick(raw, ["name", "title", "workoutName", "exercise"], "Untitled Lift")
  ).toUpperCase();

  const categories = toArray(
    pick(raw, ["categories", "category", "tags", "muscleGroups", "muscle_group"], [])
  );

  const equipment = String(
    pick(raw, ["equipment", "equipments", "gear"], "Bodyweight")
  );

  const duration = Number(
    pick(raw, ["duration", "durationMinutes", "time", "minutes"], 20)
  );

  const calories = Number(
    pick(raw, ["calories", "kcal", "caloriesBurned"], 150)
  );

  const rating = Number(
    pick(raw, ["rating", "stars", "score"], 4.5)
  );

  const image = String(
    pick(raw, ["image", "img", "thumbnail", "imageUrl", "photo"], nextFallbackImage())
  );

  const description = String(
    pick(
      raw,
      ["description", "desc", "summary", "about"],
      "A focused, effective movement that belongs in every well-rounded plan."
    )
  );

  const difficulty = String(
    pick(raw, ["difficulty", "level"], "Intermediate")
  );

  const sets = pick(raw, ["sets", "setsCount"], 3);
  const reps = String(pick(raw, ["reps", "repsRange", "repetitions"], "8-12"));

  let instructions = toArray(
    pick(raw, ["instructions", "steps", "howTo", "directions"], [])
  );
  if (instructions.length === 0) {
    instructions = [
      "Set up in a stable, controlled starting position.",
      "Engage your core and brace before the first rep.",
      "Move through a full, controlled range of motion.",
      "Reset and repeat for the prescribed sets and reps.",
    ];
  }

  return {
    id,
    name,
    categories: categories.length ? categories : ["FULL BODY"],
    equipment,
    duration: Number.isFinite(duration) ? duration : 20,
    calories: Number.isFinite(calories) ? calories : 150,
    rating: Number.isFinite(rating) ? rating : 4.5,
    image,
    description,
    difficulty,
    sets,
    reps,
    instructions,
  };
}

function extractList(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.workouts)) return payload.workouts;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

export async function fetchWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load workouts (${res.status})`);
  const json = await res.json();
  const list = extractList(json);
  return list.map((item, i) => normalizeWorkout(item, i));
}

export async function fetchWorkoutById(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      const raw = json?.data ?? json;
      if (raw && !Array.isArray(raw)) return normalizeWorkout(raw);
    }
  } catch {
    // fall through to list-based lookup
  }
  // Fallback: some APIs only reliably support the list endpoint.
  const all = await fetchWorkouts();
  return all.find((w) => w.id === id) ?? null;
}
