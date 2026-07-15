import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());
app.use(
"/api/auth",
authRoutes
);
app.use(
"/api/profile",
profileRoutes
);


app.get("/",(req,res)=>{


res.json({

message:"NeuroLink AI API running 🚀"

});


});



const PORT = 5000;


app.listen(PORT,()=>{


console.log(
`Server running on port ${PORT}`
);


});