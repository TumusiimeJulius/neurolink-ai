interface LearningSubject {

subject:string;

mastery:number;

}



export function generateRecommendation(

subjects:LearningSubject[]

){



const recommendations:string[] = [];



subjects.forEach((item)=>{


if(item.mastery < 50){


recommendations.push(

`Improve ${item.subject}. Your mastery level is ${item.mastery}%. Focus on practice and revision.`

);


}



else if(item.mastery < 80){


recommendations.push(

`${item.subject} is improving. Continue practicing to reach advanced level.`

);


}



else{


recommendations.push(

`Excellent performance in ${item.subject}. Try advanced challenges.`

);


}



});



return recommendations;

}

export function generateTwinResponse(
  subjects: LearningSubject[],
  selectedSubject: any,
  prompt: string
) {
  const subjectName = selectedSubject?.subject || selectedSubject?.name || "your topic";
  const mastery = typeof selectedSubject?.mastery === "number" ? selectedSubject.mastery : 0;
  const normalizedPrompt = prompt.toLowerCase();

  if (normalizedPrompt.includes("review") || normalizedPrompt.includes("weak") || normalizedPrompt.includes("struggling")) {
    return `For ${subjectName}, I recommend reviewing your weakest subtopic first. At ${mastery}% mastery, reinforce the core concepts with a few targeted practice problems.`;
  }

  if (normalizedPrompt.includes("challenge") || normalizedPrompt.includes("hard") || normalizedPrompt.includes("push")) {
    return `For ${subjectName}, try a slightly harder problem that connects multiple concepts. This will reveal the gaps in your understanding and help you build confidence.`;
  }

  if (normalizedPrompt.includes("plan") || normalizedPrompt.includes("focus") || normalizedPrompt.includes("session")) {
    return `For ${subjectName}, create a short session that starts with a quick review, then spends most time on the area where mastery is lowest. Aim for 20-30 minutes of active practice.`;
  }

  if (normalizedPrompt.includes("why") || normalizedPrompt.includes("how") || normalizedPrompt.includes("what")) {
    return `Because ${subjectName} is currently at ${mastery}% mastery, focus on the concepts you still find uncertain. I recommend reviewing the key examples and testing yourself afterward.`;
  }

  return `For ${subjectName}, keep your study focused and practical. Use short review cycles, move to one challenge, and then reflect on what felt unclear.`;
}
