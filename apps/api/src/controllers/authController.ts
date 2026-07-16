import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";


const JWT_SECRET = process.env.JWT_SECRET || "neurolink_secret";



// REGISTER

export async function register(
req:Request,
res:Response
){

try{


const {
name,
email,
password

}=req.body;



const existingUser = await prisma.student.findUnique({

where:{
email
}

});



if(existingUser){

return res.status(400).json({

message:"Email already registered"

});

}



const hashedPassword = await bcrypt.hash(password, 10);

const defaultProfiles = [
  { subject: "Programming", mastery: 92, recommendation: "Great progress! Try advanced algorithms next." },
  { subject: "Mathematics", mastery: 74, recommendation: "Focus on calculus fundamentals for better foundation." },
  { subject: "Physics", mastery: 61, recommendation: "Practice mechanics problems to improve understanding." },
  { subject: "Design Systems", mastery: 88, recommendation: "Ready to explore component patterns and best practices." },
  { subject: "Writing", mastery: 69, recommendation: "Work on clarity and structure in technical writing." },
];

const student = await prisma.student.create({
  data: {
    name,
    email,
    password: hashedPassword,
    learningProfiles: {
      create: defaultProfiles,
    },
  },
  include: {
    learningProfiles: true,
  },
});

res.status(201).json({
  message: "Student created successfully",

student:{

id:student.id,

name:student.name,

email:student.email

}

});


}

catch(error){


res.status(500).json({

message:"Registration failed",

error

});


}

}




// LOGIN

export async function login(

req:Request,

res:Response

){


try{


const {

email,

password

}=req.body;



const student = await prisma.student.findUnique({

where:{
email
}

});



if(!student){

return res.status(404).json({

message:"User not found"

});

}



const validPassword = await bcrypt.compare(

password,

student.password

);



if(!validPassword){

return res.status(401).json({

message:"Invalid password"

});

}




const token = jwt.sign(

{

id:student.id,

email:student.email

},

JWT_SECRET,

{

expiresIn:"7d"

}

);




res.json({

message:"Login successful",

token,

student:{

id:student.id,

name:student.name,

email:student.email

}

});


}


  } catch (error) {
    res.status(500).json({
      message: "Login failed.",
    });
  }
}
