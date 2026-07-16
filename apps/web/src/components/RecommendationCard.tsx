import { useState } from "react";

function RecommendationCard({
  recommendations,
  selectedSubject,
  onStartReview,
}: {
  recommendations?: string[];
  selectedSubject?: any;
  onStartReview?: () => void;
}) {
  const [isStarted, setIsStarted] = useState(false);
  const hasRecommendations = recommendations && recommendations.length > 0;
  const items = recommendations ?? [];

  const handleStartReview = () => {
    setIsStarted(true);
    onStartReview?.();
  };

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">AI recommendation</h2>
          <p className="mt-2 text-sm text-slate-500">Your twin is nudging you toward the next best learning move.</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600">Focused</div>
      </div>

      {hasRecommendations ? (
        <ul className="mt-6 space-y-3">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5 text-sm text-slate-600">
          No AI recommendations were returned from the backend.
        </div>
      )}

      <button
        onClick={handleStartReview}
        className={`mt-6 rounded-2xl px-5 py-2.5 font-semibold text-white transition ${isStarted ? "bg-emerald-600 hover:bg-emerald-500" : "bg-indigo-600 hover:bg-indigo-500"}`}
      >
        {isStarted ? "Review plan active" : "Start review"}
      </button>

      {isStarted ? (
        <p className="mt-3 text-sm text-slate-600">
          Review plan is ready for {selectedSubject?.subject || selectedSubject?.name || "your focus topic"}.
        </p>
      ) : null}
    </div>
  );
}

export default RecommendationCard;