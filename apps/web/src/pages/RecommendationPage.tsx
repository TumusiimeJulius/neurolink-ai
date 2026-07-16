import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecommendationCard from "../components/RecommendationCard";
import { getRecommendations } from "../services/recommendation";
import { getStudentProfile } from "../services/profile";
import { useStudent } from "../context/StudentContext";

function RecommendationPage() {
  const { student } = useStudent();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!student) return;

    setIsLoading(true);
    Promise.all([getStudentProfile(student.id), getRecommendations(student.id)])
      .then(([profileData, recommendationData]) => {
        setProfile(profileData);
        setRecommendations(recommendationData?.recommendations || []);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load recommendations.");
        setProfile(null);
        setRecommendations([]);
      })
      .finally(() => setIsLoading(false));
  }, [student]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Recommendations</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">AI recommendations</h1>
            <p className="mt-2 text-slate-500">Explore focused suggestions to keep your next study step clear and actionable.</p>
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

        <RecommendationCard recommendations={recommendations} selectedSubject={profile?.learningProfiles?.[0]} />

        {isLoading ? (
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">Loading AI recommendations…</div>
        ) : null}
      </div>
    </div>
  );
}

export default RecommendationPage;
