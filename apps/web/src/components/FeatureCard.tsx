import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

function FeatureCard({ title, description, icon, isActive = false, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-3xl border p-6 text-left shadow-sm backdrop-blur transition ${
        isActive
          ? "border-indigo-300 bg-indigo-600 text-white shadow-indigo-950/20"
          : "border-slate-200 bg-white/90 text-slate-900 shadow-slate-200/70"
      }`}
    >
      <div className={`mb-4 inline-flex rounded-2xl p-3 ${isActive ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-600"}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${isActive ? "text-indigo-50" : "text-slate-600"}`}>{description}</p>
    </button>
  );
}

export default FeatureCard;