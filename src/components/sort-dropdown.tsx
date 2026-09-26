"use client";

import { ChevronDown } from "lucide-react";

export type SortKey = "duration" | "calories" | "rating";

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  return (
    <label className="relative inline-flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
        Sort By
      </span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="appearance-none rounded-full border border-border bg-surface py-2 pl-4 pr-9 text-sm font-medium text-white outline-none transition-colors hover:border-accent focus:border-accent"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-accent"
        />
      </span>
    </label>
  );
}
