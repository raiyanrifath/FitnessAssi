"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { PlanItem, Workout } from "@/lib/types";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_CAP = 5;

interface PlanContextValue {
  plan: PlanItem[];
  saved: PlanItem[];
  planCount: number;
  savedCount: number;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  toggleDone: (id: string) => void;
  hydrated: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

function readStorage(key: string): PlanItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(key: string, value: PlanItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable (private mode, quota) — fail silently
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(PLAN_KEY, plan);
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(SAVED_KEY, saved);
  }, [saved, hydrated]);

  const isInPlan = useCallback(
    (id: string) => plan.some((p) => p.workout.id === id),
    [plan]
  );
  const isSaved = useCallback(
    (id: string) => saved.some((p) => p.workout.id === id),
    [saved]
  );

  const addToPlan = useCallback(
    (workout: Workout) => {
      if (isInPlan(workout.id)) {
        toast("Already in today's plan");
        return;
      }
      if (plan.length >= PLAN_CAP) {
        toast.error("Today's plan is full (5 lifts max)");
        return;
      }
      setPlan((prev) => [...prev, { workout, addedAt: Date.now(), done: false }]);
      toast.success("Added to today's plan");
    },
    [plan, isInPlan]
  );

  const addToSaved = useCallback(
    (workout: Workout) => {
      if (isSaved(workout.id)) {
        toast("Already saved");
        return;
      }
      setSaved((prev) => [...prev, { workout, addedAt: Date.now(), done: false }]);
      toast.success("Saved for later");
    },
    [saved, isSaved]
  );

  const removeFromPlan = useCallback((id: string) => {
    setPlan((prev) => prev.filter((p) => p.workout.id !== id));
    toast("Removed from today's plan");
  }, []);

  const removeFromSaved = useCallback((id: string) => {
    setSaved((prev) => prev.filter((p) => p.workout.id !== id));
    toast("Removed from saved");
  }, []);

  const toggleDone = useCallback((id: string) => {
    setPlan((prev) =>
      prev.map((p) =>
        p.workout.id === id ? { ...p, done: !p.done } : p
      )
    );
    toast.success("Marked as done");
  }, []);

  const value = useMemo(
    () => ({
      plan,
      saved,
      planCount: plan.length,
      savedCount: saved.length,
      isInPlan,
      isSaved,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
      hydrated,
    }),
    [plan, saved, isInPlan, isSaved, addToPlan, addToSaved, removeFromPlan, removeFromSaved, toggleDone, hydrated]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}

export const PLAN_CAP_VALUE = PLAN_CAP;
