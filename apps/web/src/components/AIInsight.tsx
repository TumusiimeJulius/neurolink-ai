import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Sparkles } from "lucide-react";
import { analyzeLearning } from "../ai/learningAnalyzer";
import { askLearningTwin } from "../services/ai";
import { useStudent } from "../context/StudentContext";

interface AIInsightProps {
  subject: any;
  recommendations?: string[];
}

const quickPrompts = [
  { label: "Plan my session", value: "Plan my session" },
  { label: "Review weak spots", value: "Review weak spots" },
  { label: "Challenge me", value: "Challenge me" },
];

function AIInsight({ subject, recommendations = [] }: AIInsightProps) {
  const { student } = useStudent();
  const [prompt, setPrompt] = useState("How should I focus today?");
  const [reply, setReply] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const insight = useMemo(() => {
    if (!subject) return null;
    return analyzeLearning(subject);
  }, [subject]);

  useEffect(() => {
    if (!subject) {
      setReply("Select a topic to get personalized guidance from your learning twin.");
      return;
    }

    if (!insight) {
      setReply("Preparing a personalized recommendation for your selected topic...");
      return;
    }

    const subjectName = subject.subject || subject.name || "your selected topic";
    setReply(`For ${subjectName}, ${insight.recommendation} ${insight.focusTip}`);
  }, [insight, subject]);

  function buildReply(promptText: string) {
    if (!subject) {
      return "Choose a topic first so your twin can guide you with a relevant plan.";
    }

    const subjectName = subject.subject || subject.name || "your selected topic";
    const mastery = insight?.mastery ?? subject.mastery ?? 0;
    const topRecommendation = recommendations[0] || insight?.recommendation || "Keep a calm pace and review the essentials.";
    const focusTip = insight?.focusTip || "Keep your session short and steady.";
    const challenge = insight?.challenge || "Try a short challenge set.";
    const normalizedPrompt = promptText.toLowerCase();

    if (normalizedPrompt.includes("review") || normalizedPrompt.includes("weak") || normalizedPrompt.includes("struggling")) {
      return `For ${subjectName}, ${topRecommendation.toLowerCase()} ${focusTip} Start with the weakest concept and review it until it feels clear.`;
    }

    if (normalizedPrompt.includes("challenge") || normalizedPrompt.includes("hard") || normalizedPrompt.includes("push")) {
      return `For ${subjectName}, ${challenge}. Use a tougher problem to test your understanding and then reflect on what you learned.`;
    }

    if (normalizedPrompt.includes("plan") || normalizedPrompt.includes("focus") || normalizedPrompt.includes("session")) {
      return `For ${subjectName}, your mastery is ${mastery}%. ${topRecommendation} ${focusTip} Build a short session around the concept that still feels uncertain.`;
    }

    if (normalizedPrompt.includes("why") || normalizedPrompt.includes("how") || normalizedPrompt.includes("what")) {
      return `Because ${subjectName} is at ${mastery}% mastery, I recommend ${topRecommendation.toLowerCase()} ${focusTip} This will help you strengthen the area that matters most.`;
    }

    if (normalizedPrompt.includes("next") || normalizedPrompt.includes("do") || normalizedPrompt.includes("help")) {
      return `For ${subjectName}, ${topRecommendation.toLowerCase()} ${focusTip} Then test yourself with one quick question to confirm your progress.`;
    }

    return `For ${subjectName}, ${topRecommendation.toLowerCase()} ${focusTip} Ask me for a review plan, a challenge, or the fastest way to improve this topic.`;
  }

  async function handleAskTwin(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const promptText = prompt.trim() || "How should I focus today?";

    if (!subject) {
      setReply("Choose a topic first so your twin can guide you with a relevant plan.");
      return;
    }

    if (!student?.id) {
      setReply("Sign in first so your twin can access your profile and personalize the response.");
      return;
    }

    setReply("Preparing your twin response...");
    setIsThinking(true);
    console.log("Ask twin clicked", { promptText, subject, studentId: student.id });

    try {
      const response = await askLearningTwin({
        subject,
        prompt: promptText,
      });
      setReply(response.reply || response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Unknown error";
      console.error("Ask twin failed", errorMessage);
      setReply(`Twin unavailable: ${errorMessage}. ${buildReply(promptText)}`);
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <div className="mt-6 rounded-[1.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">AI insight</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">Adaptive guidance for your next move</h3>
        </div>
        <div className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm">Live</div>
      </div>

      {subject ? (
        <div className="mt-5 rounded-2xl bg-white/80 p-4">
          <p className="text-sm text-slate-500">Selected topic</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{subject.subject || subject.name}</p>
          <p className="mt-1 text-sm text-slate-600">Mastery is at {subject.mastery}% and continues to improve.</p>
        </div>
      ) : null}

      <form onSubmit={handleAskTwin} className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Sparkles size={16} className="text-indigo-500" />
          Ask your learning twin
        </div>
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-0"
          placeholder="Ask for a study plan or focus tip"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {quickPrompts.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setPrompt(item.value);
                setReply(buildReply(item.value));
              }}
              className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAskTwin}
          className="mt-3 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          {isThinking ? "Thinking..." : "Ask twin"}
        </button>
      </form>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-700 shadow-sm">
        <p className="font-semibold text-slate-900">Twin response</p>
        <p className="mt-2 leading-6">{reply}</p>
      </div>

      <h4 className="mt-6 text-lg font-semibold text-slate-900">Personal recommendations</h4>
      {recommendations.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {recommendations.map((item, index) => (
            <li key={`${item}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-500">No AI recommendations were returned from the backend.</p>
      )}
    </div>
  );
}

export default AIInsight;
