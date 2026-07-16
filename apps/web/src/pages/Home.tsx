import { useMemo, useState } from "react";
import { BrainCircuit, Compass, TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

function Home() {
  const features = [
    {
      title: "Digital learning twin",
      description: "An empathetic AI model that understands how your brain prefers to absorb and retain knowledge.",
      detail: "Every study session is turned into a living profile that adjusts pacing, reminders, and next steps in real time.",
      icon: <BrainCircuit size={20} />,
    },
    {
      title: "Adaptive guidance",
      description: "Every lesson is tuned to your recent focus, confidence, and mastery level for faster growth.",
      detail: "The system shifts from review to challenge the moment it detects a stronger rhythm or a weak spot.",
      icon: <Compass size={20} />,
    },
    {
      title: "Actionable insight",
      description: "Follow your momentum with clear trends, recommended reviews, and targeted coaching moments.",
      detail: "Progress is summarized into practical next moves so every click leads to a clearer plan.",
      icon: <TrendingUp size={20} />,
    },
  ];

  const [activeFeature, setActiveFeature] = useState(features[0].title);
  const activeDetail = useMemo(() => features.find((feature) => feature.title === activeFeature) ?? features[0], [activeFeature]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <Hero />

      <section id="features" className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Why students love it</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Three simple ways it helps you study better.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              isActive={activeFeature === feature.title}
              onClick={() => setActiveFeature(feature.title)}
            />
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Active experience</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{activeDetail.title}</h3>
          <p className="mt-3 max-w-2xl text-slate-300">{activeDetail.detail}</p>
        </div>
      </section>

      <section id="journey" className="mx-auto max-w-7xl px-6 pb-12 sm:px-10 lg:px-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur md:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">The journey</p>
            <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Turn scattered study sessions into a steady learning rhythm.</h3>
            <p className="mt-4 text-slate-300">The twin learns from your behavior, highlights where you are stuck, and nudges you back toward the next best step.</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: "Track", text: "See your focus patterns and study habits clearly." },
              { title: "Adapt", text: "Get guidance that fits your pace and attention level." },
              { title: "Grow", text: "Move from review to confidence with a simple next step." },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm font-semibold text-indigo-200">{step.title}</p>
                <p className="mt-2 text-sm text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/20">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">About NeuroLink</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Built to make study feel calm, adaptive, and productive.</h3>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
              Students can move from curiosity to clarity with a guided dashboard that turns each subject into an action plan.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;