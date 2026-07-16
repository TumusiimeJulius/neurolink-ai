import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudyFocusPanel from "../components/StudyFocusPanel";
import { getStudentProfile } from "../services/profile";
import { useStudent } from "../context/StudentContext";

function StudyFocusPage() {
  const { student } = useStudent();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [studySeconds, setStudySeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!student) return;

    setIsLoading(true);
    getStudentProfile(student.id)
      .then((data) => {
        const subjects = data.learningProfiles ?? [];
        setProfiles(subjects);
        setSelectedSubject(subjects[0] ?? null);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load study focus subjects.");
        setProfiles([]);
        setSelectedSubject(null);
      })
      .finally(() => setIsLoading(false));
  }, [student]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = window.setInterval(() => {
      setStudySeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">Study focus</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Live study timer</h1>
            <p className="mt-2 text-slate-500">Use a dedicated session page to keep your focus streak and study clock visible while you learn.</p>
          </div>
          <Link
            to="/dashboard"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to dashboard
          </Link>
        </div>

        {error ? (
          <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            Loading your study subjects…
          </div>
        ) : null}

        {profiles.length > 0 ? (
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Select your focus topic</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {profiles.map((subject) => (
                <button
                  key={subject.subject}
                  type="button"
                  onClick={() => setSelectedSubject(subject)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedSubject?.subject === subject.subject
                      ? "bg-amber-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {subject.subject}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <StudyFocusPanel
          selectedSubject={selectedSubject}
          studySeconds={studySeconds}
          isRunning={isRunning}
          onToggleRun={() => setIsRunning((prev) => !prev)}
          onReset={() => {
            setIsRunning(false);
            setStudySeconds(0);
          }}
        />
      </div>
    </div>
  );
}

export default StudyFocusPage;
