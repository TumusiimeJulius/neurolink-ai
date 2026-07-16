interface LearningTwinCardProps {
  profiles?: Array<{ subject: string; mastery: number; recommendation?: string }>;
}

function LearningTwinCard({ profiles = [] }: LearningTwinCardProps) {
  const displayProfiles = profiles.length
    ? profiles
    : [
        { subject: "Programming", mastery: 92 },
        { subject: "Mathematics", mastery: 74 },
        { subject: "Physics", mastery: 61 },
        { subject: "Design systems", mastery: 88 },
      ];

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Learning twin chart</h2>
          <p className="mt-2 text-sm text-slate-500">Real subject mastery from your profile, shown as a performance chart.</p>
        </div>
        <div className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600">Live data</div>
      </div>

      <div className="mt-6 space-y-4">
        {displayProfiles.map((item) => (
          <div key={item.subject}>
            <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
              <span>{item.subject}</span>
              <span className="font-semibold">{item.mastery}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                style={{ width: `${item.mastery}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningTwinCard;