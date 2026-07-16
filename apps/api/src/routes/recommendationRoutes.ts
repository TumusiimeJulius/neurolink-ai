import { Router } from "express";

import {
getRecommendations

} from "../controllers/recommendationController";
import { askTwin } from "../controllers/twinController";


const router = Router();



router.get(

"/:id",

getRecommendations

);



router.post(

"/twin",

askTwin

);

export default router;