import { motion } from "framer-motion";
import { Pause, Play, RotateCcw, Sparkles } from "lucide-react";

interface StudyFocusPanelProps {
  selectedSubject?: any;
  studySeconds: number;
  isRunning: boolean;
  onToggleRun: () => void;
  onReset: () => void;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function StudyFocusPanel({ selectedSubject, studySeconds, isRunning, onToggleRun, onReset }: StudyFocusPanelProps) {
  const subjectName = selectedSubject?.subject || selectedSubject?.name || "your focus topic";
  const mastery = selectedSubject?.mastery ?? 74;
  const goalSeconds = 25 * 60;
  const progress = Math.min(100, Math.round((studySeconds / goalSeconds) * 100));
  const streak = Math.max(3, Math.round(mastery / 10) + Math.floor(studySeconds / 900));

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Live study timer</h2>
          <p className="mt-2 text-sm text-slate-500">Stay in flow and let your twin reinforce {subjectName} with every minute.</p>
        </div>
        <div className="rounded-2xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-600">Active</div>
      </div>

      <div className="mt-6 rounded-[1.25rem] bg-slate-950 p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Focus clock</p>
            <motion.p
              key={studySeconds}
              initial={{ opacity: 0.7, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-4xl font-semibold tracking-tight"
            >
              {formatTime(studySeconds)}
            </motion.p>
          </div>
          <div className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-200">
            {isRunning ? "In session" : "Ready"}
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleRun}
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/20"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <Sparkles size={16} />
          <span className="text-sm font-semibold">Focus streak</span>
        </div>
        <p className="mt-2 text-3xl font-semibold text-slate-900">{streak} day streak</p>
        <p className="mt-2 text-sm text-slate-600">
          {isRunning
            ? `Your twin is reinforcing ${subjectName} while the timer is live.`
            : `Start a session to build momentum around ${subjectName}.`}
        </p>
      </div>
    </div>
  );
}

export default StudyFocusPanel;
