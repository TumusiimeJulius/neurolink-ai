export interface LearningInsight {

subject:string;

mastery:number;

status:string;

recommendation:string;

}



export function analyzeLearning(subject:any):LearningInsight{


let status="";

let recommendation="";



if(subject.mastery >= 80){

status="Strong 🟢";

recommendation=
"Move to advanced concepts and challenging projects.";

}


else if(subject.mastery >=50){

status="Improving 🟡";

recommendation=
"Practice more examples and revise difficult topics.";

}


else{

status="Needs Attention 🔴";

recommendation=
"Review the fundamentals and practice regularly.";

}



return {

subject:subject.name,

mastery:subject.mastery,

status,

recommendation

};


}