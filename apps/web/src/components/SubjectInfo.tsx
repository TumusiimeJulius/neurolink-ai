interface Props{

subject:any;

}


function SubjectInfo({subject}:Props){

if(!subject){

return (

<div className="bg-white p-6 rounded-2xl shadow">

<h2 className="text-xl font-bold">

Select a learning node 🧠

</h2>

<p className="text-gray-500 mt-2">

Click a brain node to view details.

</p>

</div>

)

}


return (

<div className="bg-white p-6 rounded-2xl shadow">


<h2 className="text-2xl font-bold">

{subject.name}

</h2>


<p className="mt-4">

Mastery:

<span className="font-bold">

{" "}{subject.mastery}%

</span>

</p>



<p className="mt-3">

Status:

{

subject.mastery >= 80

?

"Strong 🟢"

:

subject.mastery >=50

?

"Improving 🟡"

:

"Weak 🔴"

}

</p>



<p className="mt-4 text-gray-600">

AI Recommendation:

{

subject.mastery >=80

?

"Move to advanced concepts."

:

subject.mastery >=50

?

"Practice more examples."

:

"Review fundamentals."

}

</p>


</div>

)

}


export default SubjectInfo;