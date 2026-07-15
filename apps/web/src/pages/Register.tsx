import { useState } from "react";
import api from "../services/api";


function Register(){

const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



async function handleRegister(){


const response = await api.post(

"/auth/register",

{

name,

email,

password

}

);


console.log(response.data);


}



return (

<div className="min-h-screen flex items-center justify-center">


<div className="bg-white p-8 rounded-2xl shadow w-96">


<h1 className="text-3xl font-bold mb-6">

Create NeuroLink Account 🧠

</h1>



<input

className="border p-3 w-full mb-3"

placeholder="Name"

onChange={(e)=>setName(e.target.value)}

/>



<input

className="border p-3 w-full mb-3"

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>



<input

className="border p-3 w-full mb-3"

placeholder="Password"

type="password"

onChange={(e)=>setPassword(e.target.value)}

/>




<button

onClick={handleRegister}

className="bg-blue-600 text-white p-3 rounded-xl w-full"

>

Register

</button>



</div>


</div>

)

}


export default Register;