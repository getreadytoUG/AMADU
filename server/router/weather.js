import express from "express";
import * as weatherController from "../controller/weather.js"

const router = express.Router();

// python서버랑 연동
router.get("/", weatherController.get_weather)

export default router;