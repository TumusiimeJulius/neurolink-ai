import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Hero(){

const navigate = useNavigate();


return (

<section className="flex flex-col items-center text-center py-20">


<motion.div

animate={{
scale:[1,1.1,1]
}}

transition={{
duration:3,
repeat:Infinity
}}

>

<BrainCircuit size={120}/>

</motion.div>



<h1 className="text-6xl font-bold mt-8">

Every Brain

<br/>

Learns Differently

</h1>



<p className="text-xl mt-6 max-w-2xl text-gray-600">

NeuroLink AI creates a Digital Learning Twin
that understands how you learn and adapts
education specifically for you.

</p>



<div className="flex gap-5 mt-10">


<button

onClick={()=>navigate("/dashboard")}

className="bg-blue-600 text-white px-8 py-3 rounded-xl"

>

Create Learning Twin

</button>



<button className="border px-8 py-3 rounded-xl">

Watch Demo

</button>


</div>


</section>

)

}


export default Hero;