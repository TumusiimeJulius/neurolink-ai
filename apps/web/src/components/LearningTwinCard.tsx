function LearningTwinCard(){


const skills=[

{
name:"Visual Learning",
score:92
},

{
name:"Practical Learning",
score:85
},

{
name:"Reading",
score:65
},

{
name:"Audio",
score:58
}

]


return (

<div className="bg-white rounded-2xl shadow p-6">


<h2 className="text-2xl font-bold">

Digital Learning Twin 🧠

</h2>


<p className="text-gray-500 mt-2">

Your AI-generated learning profile

</p>



<div className="mt-6 space-y-5">


{
skills.map(skill=>(


<div key={skill.name}>


<div className="flex justify-between">

<span>
{skill.name}
</span>

<span>
{skill.score}%
</span>

</div>



<div className="h-3 bg-gray-200 rounded-full">

<div

className="h-3 bg-blue-600 rounded-full"

style={{
width:`${skill.score}%`
}}

/>


</div>


</div>


))

}



</div>


</div>


)


}


export default LearningTwinCard;