export interface LearningInsight {
  subject: string;
  mastery: number;
  status: string;
  recommendation: string;
  focusTip: string;
  challenge: string;
}

export function analyzeLearning(subject: any): LearningInsight {
  const subjectName = subject?.subject || subject?.name || "this topic";
  const mastery = typeof subject?.mastery === "number" ? subject.mastery : 0;

  let status = "";
  let recommendation = "";
  let focusTip = "";
  let challenge = "";

  if (mastery >= 80) {
    status = "Strong 🟢";
    recommendation = `Keep advancing ${subjectName} with challenging projects and mixed review.`;
    focusTip = "Practice with varied problems so your understanding becomes automatic.";
    challenge = `Try a harder ${subjectName} problem that connects multiple concepts.`;
  } else if (mastery >= 50) {
    status = "Improving 🟡";
    recommendation = `Build momentum in ${subjectName} by revisiting the hardest examples first.`;
    focusTip = "Spend extra time on the concepts you still hesitate on.";
    challenge = `Set a focused 20-minute review sprint on one weak area of ${subjectName}.`;
  } else {
    status = "Needs Attention 🔴";
    recommendation = `Strengthen ${subjectName} through clear fundamentals and steady practice.`;
    focusTip = "Break the topic into small pieces and move through them one step at a time.";
    challenge = `Explain one basic ${subjectName} concept in your own words and practice it with a simple exercise.`;
  }

  return {
    subject: subjectName,
    mastery,
    status,
    recommendation,
    focusTip,
    challenge,
  };
}
