interface Props {
  subject: any;
}

function SubjectInfo({ subject }: Props) {
  if (!subject) {
    return (
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Enter a subject</h2>
        <p className="mt-2 text-sm text-slate-500">Type a subject to begin monitoring it immediately. Your progress, mastery, and next best move will all start tracking from that topic.</p>
      </div>
    );
  }

  const status = subject.mastery >= 80 ? "Strong" : subject.mastery >= 50 ? "Improving" : "Needs attention";
  const statusTone = subject.mastery >= 80 ? "text-emerald-600" : subject.mastery >= 50 ? "text-amber-600" : "text-rose-600";

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Topic focus</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{subject.name}</h2>
        </div>
        <div className={`rounded-full px-3 py-1 text-sm font-semibold ${statusTone}`}>{status}</div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Mastery</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{subject.mastery}%</p>
        </div>
        <div className="rounded-2xl bg-indigo-50 p-4">
          <p className="text-sm text-indigo-600">Next move</p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {subject.mastery >= 80
              ? "Move to advanced examples and longer-form problem solving."
              : subject.mastery >= 50
                ? "Practice more examples and revisit your weak spots."
                : "Rebuild the fundamentals with short, guided exercises."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SubjectInfo;