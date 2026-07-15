import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { learningProfile } from "../utils/learningData";


interface DigitalBrainProps {

onSelect: (subject:any)=>void;

}



function BrainCore(){

return (

<Float

speed={2}

rotationIntensity={1}

floatIntensity={2}

>

<mesh>

<sphereGeometry
args={[1.5,32,32]}
/>


<meshStandardMaterial

color="#6366f1"

emissive="#4338ca"

emissiveIntensity={0.8}

/>


</mesh>


</Float>

)

}





function LearningNode({

position,

color,

size,

onClick


}:{

position:[number,number,number],

color:string,

size:number,

onClick:()=>void

}){


return (

<mesh

position={position}

onClick={onClick}

>


<sphereGeometry

args={[size,20,20]}

/>


<meshStandardMaterial

color={color}

emissive={color}

emissiveIntensity={2}

/>


</mesh>

)

}





function DigitalBrain({

onSelect

}:DigitalBrainProps){



return (

<div className="h-[500px] w-full">


<Canvas>


<ambientLight

intensity={1}

/>



<pointLight

position={[5,5,5]}

intensity={3}

/>



<BrainCore/>




{

learningProfile.subjects.map((subject,index)=>(


<LearningNode


key={subject.name}



position={[

(index - 1) * 2,

1,

0

]}



color={subject.color}



size={subject.mastery / 150}



onClick={()=>onSelect(subject)}


/>


))

}




<OrbitControls />


</Canvas>


</div>

)

}



export default DigitalBrain;