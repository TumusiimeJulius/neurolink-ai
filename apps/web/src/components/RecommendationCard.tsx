function RecommendationCard(){


return (

<div className="bg-white rounded-2xl shadow p-6">


<h2 className="text-xl font-bold">

AI Recommendation 🤖

</h2>


<p className="mt-4">

Your retention for Recursion is decreasing.

Review this topic for 20 minutes today.

</p>


<button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl">

Start Review

</button>


</div>

)

}


export default RecommendationCard;