import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AIInsight from "../components/AIInsight";
import { getRecommendations } from "../services/recommendation";
import { getStudentProfile } from "../services/profile";
import { useStudent } from "../context/StudentContext";

function AIInsightPage() {
  const { student } = useStudent();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!student) return;

    setIsLoading(true);
    Promise.all([getStudentProfile(student.id), getRecommendations(student.id)])
      .then(([profileData, recommendationData]) => {
        const subjects = profileData.learningProfiles ?? [];
        setProfiles(subjects);
        setSelectedSubject(subjects[0] ?? null);
        setRecommendations(recommendationData?.recommendations || []);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load AI insight data.");
        setProfiles([]);
        setSelectedSubject(null);
        setRecommendations([]);
      })
      .finally(() => setIsLoading(false));
  }, [student]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">AI insight</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Adaptive guidance</h1>
            <p className="mt-2 text-slate-500">Ask your twin for a focused plan, review strategy, or challenge to sharpen your next study move.</p>
          </div>
          <Link
            to="/dashboard"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to dashboard
          </Link>
        </div>

        {error ? (
          <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">{error}</div>
        ) : null}

        {profiles.length > 0 ? (
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {profiles.map((subject) => (
                <button
                  key={subject.subject}
                  type="button"
                  onClick={() => setSelectedSubject(subject)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedSubject?.subject === subject.subject
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {subject.subject}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <AIInsight subject={selectedSubject} recommendations={recommendations} />

        {isLoading ? (
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">Loading AI insight…</div>
        ) : null}
      </div>
    </div>
  );
}

export default AIInsightPage;
