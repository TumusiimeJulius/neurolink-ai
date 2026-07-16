import { BarChart, BookOpen, Brain, Home, Target, Cpu, Sparkles, Clock } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { id: "overview", label: "Dashboard", icon: Home, path: "/dashboard" },
  { id: "learning-twin", label: "Learning Twin", icon: Brain, path: "/learning-twin" },
  { id: "focus-plan", label: "Focus Plan", icon: BookOpen, path: "/focus-plan" },
  { id: "ai-recommendation", label: "AI Recommendation", icon: Sparkles, path: "/recommendations" },
  { id: "ai-insight", label: "AI Insight", icon: Cpu, path: "/ai-insight" },
  { id: "study-timer", label: "Study Timer", icon: Clock, path: "/study-focus" },
] as const;

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-slate-200 bg-white p-6 shadow-sm">
      <div className="rounded-2xl bg-indigo-50 p-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">NeuroLink</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">Adaptive workspace</h2>
        <p className="mt-2 text-sm text-slate-600">A calm, structured view of your study rhythm.</p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Today</p>
        <div className="mt-3 space-y-2 text-sm text-slate-600">
          <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
            <span>Focus block</span>
            <span className="font-semibold text-slate-900">1</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
            <span>Review depth</span>
            <span className="font-semibold text-slate-900">Balanced</span>
          </div>
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/10" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Target size={16} />
          <span className="text-sm font-semibold">Daily goal</span>
        </div>
        <p className="mt-2 text-sm text-slate-500">Finish one focused review block before the next session.</p>
        <div className="mt-3 h-2 rounded-full bg-slate-200">
          <div className="h-2 w-3/4 rounded-full bg-indigo-500" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;