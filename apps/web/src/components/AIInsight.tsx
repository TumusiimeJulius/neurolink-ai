import { analyzeLearning } from "../ai/learningAnalyzer";


function AIInsight({

subject

}:{

subject:any

}){


if(!subject){

return (

<div className="bg-white p-6 rounded-2xl shadow">

<h2 className="text-xl font-bold">

🤖 NeuroLink AI Insight

</h2>


<p className="text-gray-500 mt-3">

Select a learning node to analyze.

</p>


</div>

)

}



const insight = analyzeLearning(subject);



return (

<div className="bg-white p-6 rounded-2xl shadow">


<h2 className="text-xl font-bold">

🤖 NeuroLink AI Analysis

</h2>



<h3 className="text-2xl font-bold mt-5">

{insight.subject}

</h3>



<p className="mt-3">

Mastery:

<b>

{" "}{insight.mastery}%

</b>

</p>



<p className="mt-3">

Status:

{insight.status}

</p>



<p className="mt-5 text-gray-600">

Recommendation:

<br/>

{insight.recommendation}

</p>



</div>

)

}


export default AIInsight;