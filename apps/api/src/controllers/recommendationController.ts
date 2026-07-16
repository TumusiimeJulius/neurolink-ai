import { Request, Response } from "express";
import prisma from "../config/prisma";
import { generateRecommendation } from "../services/aiService";



export async function getRecommendations(

req:Request,

res:Response

){


try{


const studentId = Number(req.params.id);



const profile = await prisma.learningProfile.findMany({

where:{

studentId

}

});



const recommendations = generateRecommendation(

profile.map(item=>({

subject:item.subject,

mastery:item.mastery

}))

);



res.json({

recommendations

});


}

catch(error){


res.status(500).json({

message:"AI analysis failed"

});


}


}