import express from "express";
import * as predictController from "../controller/predict.js"

const router = express.Router();

// 예측 리스트 반환
router.post("/", predictController.predictInfo);

export default router;