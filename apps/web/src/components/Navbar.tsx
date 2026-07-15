import { Brain } from "lucide-react";


function Navbar(){

return (

<nav className="flex items-center justify-between px-10 py-6">

<div className="flex items-center gap-3">

<Brain size={32}/>

<h1 className="text-2xl font-bold">
NeuroLink AI
</h1>

</div>


<div className="flex gap-8">

<a>
Features
</a>

<a>
Technology
</a>

<a>
About
</a>


<button className="px-5 py-2 rounded-xl bg-blue-600 text-white">

Get Started

</button>


</div>

</nav>

)

}


export default Navbar;