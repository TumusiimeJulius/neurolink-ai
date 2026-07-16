import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_45%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center lg:flex-row lg:items-start lg:text-left">
        <div className="max-w-2xl">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-100 backdrop-blur"
          >
            <Sparkles size={16} />
            A calmer, smarter way to study
          </motion.div>

          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Learn with a twin that
            <span className="block text-indigo-300">understands your pace.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 sm:text-xl">
            NeuroLink AI turns your study habits into a clear plan, helping you focus on what matters most and stay consistent.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-400"
            >
              Start learning twin <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 font-semibold text-slate-100 backdrop-blur transition hover:bg-white/20"
            >
              Explore dashboard
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-black/20 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-500/20 p-3 text-indigo-300">
              <BrainCircuit size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-200">Live insight snapshot</p>
              <p className="text-xl font-semibold text-white">Momentum is rising</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Focus retention</span>
                <span className="font-semibold text-white">91%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-700">
                <div className="h-2 w-[91%] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Weekly growth</span>
                <span className="font-semibold text-white">+14%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-700">
                <div className="h-2 w-[74%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;