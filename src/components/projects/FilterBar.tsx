"use client";

type FilterBarProps = {
  labels: string[];
  active: string | null;
  onChange: (label: string | null) => void;
};

export function FilterBar({ labels, active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por disciplina">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1.5 text-sm transition ${
          active === null
            ? "bg-ink-900 text-white dark:bg-ink-100 dark:text-ink-900"
            : "bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-ink-900 dark:text-ink-200 dark:hover:bg-ink-800"
        }`}
      >
        Todos
      </button>
      {labels.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(label)}
          className={`rounded-full px-3 py-1.5 text-sm transition ${
            active === label
              ? "bg-accent text-white dark:bg-accent-muted dark:text-ink-950"
              : "bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-ink-900 dark:text-ink-200 dark:hover:bg-ink-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
