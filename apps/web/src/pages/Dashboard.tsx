import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { useStudent } from "../context/StudentContext";
import { getStudentProfile } from "../services/profile";
import { getRecommendations } from "../services/recommendation";

function Dashboard() {
  const { student, logout } = useStudent();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(student));

  useEffect(() => {
    async function loadDashboard() {
      if (!student) {
        setProfile(null);
        setRecommendations([]);
        setSelectedSubject(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [profileData, recommendationData] = await Promise.all([
          getStudentProfile(student.id),
          getRecommendations(student.id),
        ]);

        setProfile(profileData);
        setRecommendations(recommendationData?.recommendations || []);
        setSelectedSubject(profileData?.learningProfiles?.[0] || null);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [student]);

  const availableSubjects = useMemo(
    () => [...(profile?.learningProfiles ?? [])],
    [profile]
  );

  const overviewCards = useMemo(
    () => [
      {
        label: "Current focus",
        value: selectedSubject?.subject || "Choose a topic",
        hint: "Pick a topic from your profile or create a new one.",
      },
      {
        label: "Confidence",
        value: selectedSubject?.confidenceLevel ? `${selectedSubject.confidenceLevel}%` : "Ready",
        hint: "Adaptive pacing is active.",
      },
      {
        label: "Next review",
        value: recommendations[0] ?? "Keep your rhythm steady",
        hint: "Personalized coaching is ready.",
      },
      {
        label: "Focus streak",
        value: `${Math.max(3, availableSubjects.length || 3)} days`,
        hint: "Momentum is building.",
      },
    ],
    [availableSubjects, recommendations, selectedSubject]
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back, {student?.name || "student"}</h1>
              <p className="mt-2 text-slate-500">
                {student
                  ? "Your learning twin is tracking your rhythm and surfacing the next best step."
                  : "Sign in or create an account to load your personalized learning twin."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {student ? (
                <>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Logout
                  </button>
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                    <Sparkles size={16} />
                    Adaptive focus mode
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
                    Sign in
                  </Link>
                  <Link to="/register" className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {overviewCards.map((card) => (
              <div key={card.label} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{card.label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{card.value}</p>
                <p className="mt-1 text-sm text-slate-500">{card.hint}</p>
              </div>
            ))}
          </div>



        </div>
      </main>
    </div>
  );
}

export default Dashboard;
