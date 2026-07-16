import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import predictionRoutes from "./routes/predictionRoutes";
import { authenticateToken } from "./middleware/authMiddleware";

dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());
app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/predictions",
  authenticateToken,
  predictionRoutes
);
app.use(
  "/api/profile",
  authenticateToken,
  profileRoutes
);
app.use(
  "/api/recommendations",
  authenticateToken,
  recommendationRoutes
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