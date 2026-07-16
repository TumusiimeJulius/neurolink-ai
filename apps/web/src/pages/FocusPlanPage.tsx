import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createLearningProfile,
  deleteLearningProfile,
  getStudentProfile,
  updateLearningProfile,
} from "../services/profile";
import { useStudent } from "../context/StudentContext";

function FocusPlanPage() {
  const { student } = useStudent();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [subjectName, setSubjectName] = useState("");
  const [mastery, setMastery] = useState(35);
  const [recommendation, setRecommendation] = useState("");
  const [editingProfileId, setEditingProfileId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadProfiles() {
    if (!student) return;
    setIsLoading(true);
    try {
      const data = await getStudentProfile(student.id);
      const learningProfiles = data.learningProfiles ?? [];
      setProfiles(learningProfiles);
      if (!selectedSubject && learningProfiles.length) {
        setSelectedSubject(learningProfiles[0]);
      } else if (selectedSubject) {
        const refreshed = learningProfiles.find((item: any) => item.id === selectedSubject.id);
        setSelectedSubject(refreshed || learningProfiles[0] || null);
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load focus plan subjects.");
      setProfiles([]);
      setSelectedSubject(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProfiles();
  }, [student]);

  function resetForm() {
    setSubjectName("");
    setMastery(35);
    setRecommendation("");
    setEditingProfileId(null);
  }

  async function handleSaveSubject() {
    if (!student) return;
    const trimmedSubject = subjectName.trim();
    if (!trimmedSubject) {
      setError("Please enter a subject name.");
      return;
    }

    setIsLoading(true);
    try {
      if (editingProfileId) {
        await updateLearningProfile(student.id, editingProfileId, {
          subject: trimmedSubject,
          mastery,
          recommendation: recommendation.trim(),
        });
      } else {
        await createLearningProfile(student.id, {
          subject: trimmedSubject,
          mastery,
          recommendation: recommendation.trim(),
        });
      }
      await loadProfiles();
      resetForm();
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to save subject. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleEditSubject(subject: any) {
    setSubjectName(subject.subject || "");
    setMastery(subject.mastery ?? 35);
    setRecommendation(subject.recommendation || "");
    setEditingProfileId(subject.id);
    setSelectedSubject(subject);
    setError(null);
  }

  async function handleDeleteSubject(profileId: number) {
    if (!student) return;
    if (!window.confirm("Delete this subject from your profile?")) return;

    setIsLoading(true);
    try {
      await deleteLearningProfile(student.id, profileId);
      await loadProfiles();
      if (selectedSubject?.id === profileId) {
        setSelectedSubject(null);
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to delete subject. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Focus plan</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Focus planning page</h1>
            <p className="mt-2 text-slate-500">Manage your subjects with live data and keep only the topics you want.</p>
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

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Subject details</p>
              <p className="mt-2 text-sm text-slate-500">Add, edit, or remove subjects directly from your live profile.</p>
            </div>
            <div className="space-y-3">
              <input
                value={subjectName}
                onChange={(event) => setSubjectName(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400"
                placeholder="Subject name"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={mastery}
                  onChange={(event) => setMastery(Number(event.target.value))}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400"
                  placeholder="Mastery %"
                />
                <input
                  value={recommendation}
                  onChange={(event) => setRecommendation(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400"
                  placeholder="Recommendation text"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSaveSubject}
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  {editingProfileId ? "Save changes" : "Add subject"}
                </button>
                {editingProfileId ? (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">Loading focus subjects…</div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Focus subjects</p>
            <div className="mt-4 space-y-3">
              {profiles.length > 0 ? (
                profiles.map((subject) => (
                  <div
                    key={subject.id}
                    className={`rounded-2xl border px-4 py-4 transition ${
                      selectedSubject?.id === subject.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedSubject(subject)}
                        className="text-left"
                      >
                        <div className="text-sm font-semibold text-slate-900">{subject.subject}</div>
                        <p className="mt-1 text-sm text-slate-600">{subject.recommendation || "Use this subject to shape your next session."}</p>
                      </button>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditSubject(subject)}
                          className="rounded-2xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSubject(subject.id)}
                          className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-500">No focus subjects found yet. Add one to start your plan.</div>
              )}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Focus plan summary</p>
            <div className="mt-6 rounded-2xl bg-slate-50 p-6">
              {selectedSubject ? (
                <>
                  <h2 className="text-xl font-semibold text-slate-900">{selectedSubject.subject}</h2>
                  <p className="mt-3 text-sm text-slate-600">Mastery: {selectedSubject.mastery}%</p>
                  <p className="mt-3 text-sm text-slate-600">{selectedSubject.recommendation || "Keep your plan steady and review key ideas."}</p>
                </>
              ) : (
                <p className="text-sm text-slate-500">Pick a subject to see a quick planning summary.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusPlanPage;
