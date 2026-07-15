import { Request, Response } from "express";
import prisma from "../config/prisma";


export async function getProfile(

req:Request,

res:Response

){

try{


const studentId = Number(req.params.id);



const student = await prisma.student.findUnique({

where:{
id:studentId
},

include:{

learningProfiles:true

}

});



if(!student){

return res.status(404).json({

message:"Student not found"

});

}



res.json(student);


}

catch(error){

res.status(500).json({

message:"Failed to load profile"

});

}


}