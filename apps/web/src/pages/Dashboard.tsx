import { useState } from "react";

import Sidebar from "../components/Sidebar";
import LearningTwinCard from "../components/LearningTwinCard";
import RecommendationCard from "../components/RecommendationCard";
import ProgressChart from "../components/ProgressChart";
import DigitalBrain from "../components/DigitalBrain";
import SubjectInfo from "../components/SubjectInfo";


function Dashboard(){


const [selectedSubject,setSelectedSubject] = useState<any>(null);



return (

<div className="flex bg-gray-50">


<Sidebar/>



<main className="flex-1 p-10">



<h1 className="text-4xl font-bold">

Welcome Back 👋

</h1>



<p className="mt-2 text-gray-500">

Your AI learning assistant is ready.

</p>




<div className="bg-white rounded-2xl shadow p-6 mt-10">


<h2 className="text-2xl font-bold mb-4">

Your Digital Learning Twin 🧠

</h2>




<DigitalBrain

onSelect={setSelectedSubject}

/>




<SubjectInfo

subject={selectedSubject}

/>



</div>





<div className="grid md:grid-cols-2 gap-8 mt-10">



<LearningTwinCard/>




<RecommendationCard/>




<ProgressChart/>




</div>



</main>



</div>

)

}



export default Dashboard;