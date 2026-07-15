import { useState } from "react";
import api from "../services/api";


function Login(){


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



async function handleLogin(){


try{


const response = await api.post(

"/auth/login",

{

email,

password

}

);



localStorage.setItem(

"token",

response.data.token

);



localStorage.setItem(

"student",

JSON.stringify(response.data.student)

);



window.location.href="/dashboard";


}

catch(error){


console.log(error);


}


}




return (

<div className="min-h-screen flex items-center justify-center">


<div className="bg-white p-8 rounded-2xl shadow w-96">


<h1 className="text-3xl font-bold mb-6">

Welcome Back 🧠

</h1>



<input

className="border p-3 w-full mb-3"

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>




<input

className="border p-3 w-full mb-3"

type="password"

placeholder="Password"

onChange={(e)=>setPassword(e.target.value)}

/>




<button

onClick={handleLogin}

className="bg-blue-600 text-white p-3 rounded-xl w-full"

>

Login

</button>



</div>


</div>

)

}


export default Login;