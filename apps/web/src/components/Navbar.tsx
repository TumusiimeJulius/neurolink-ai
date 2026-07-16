import { Brain } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
      <Link to="/" className="flex items-center gap-3">
        <div className="rounded-2xl bg-indigo-500/15 p-2 text-indigo-300">
          <Brain size={24} />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">NeuroLink AI</p>
          <p className="text-xs text-slate-400">Digital learning twin</p>
        </div>
      </Link>

      <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
        <a href="#features" className="transition hover:text-white">Features</a>
        <a href="#journey" className="transition hover:text-white">Journey</a>
        <a href="#about" className="transition hover:text-white">About</a>
      </div>

      <button
        onClick={() => navigate("/register")}
        className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
      >
        Get started
      </button>
    </nav>
  );
}

export default Navbar;