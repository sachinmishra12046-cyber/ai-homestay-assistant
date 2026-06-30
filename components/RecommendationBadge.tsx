import { Sparkles } from "lucide-react";

interface RecommendationBadgeProps {
  reasons?: string[];
  compact?: boolean;
}

export default function RecommendationBadge({
  reasons = ["AI Recommended"],
  compact = false,
}: RecommendationBadgeProps) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-emerald-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
        <Sparkles className="h-3 w-3" strokeWidth={2} />
        AI Pick
      </span>
    );
  }

  return (
    <div className="rounded-xl border border-violet-200/60 bg-gradient-to-br from-violet-50 to-emerald-50 p-3 dark:border-violet-900/40 dark:from-violet-950/40 dark:to-emerald-950/30">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" strokeWidth={2} />
        <span className="text-xs font-bold text-violet-700 dark:text-violet-300">
          AI Recommended
        </span>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {reasons.map((reason) => (
          <li
            key={reason}
            className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-medium text-gray-700 dark:bg-gray-900/60 dark:text-gray-300"
          >
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
