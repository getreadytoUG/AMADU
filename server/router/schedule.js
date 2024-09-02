import express from "express";
import * as scheduleController from "../controller/schedule.js";

const router = express.Router();

// 지정 품목 스케줄 출력
router.post("/", scheduleController.scheduleInfo);

export default router;
