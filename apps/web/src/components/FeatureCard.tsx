interface Props{

title:string;

description:string;

}


function FeatureCard({
title,
description
}:Props){


return (

<div className="p-6 rounded-2xl shadow bg-white">

<h3 className="text-xl font-bold">

{title}

</h3>


<p className="mt-3 text-gray-600">

{description}

</p>


</div>

)


}


export default FeatureCard;