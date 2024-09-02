import express from "express";
import * as marketController from "../controller/market.js"

const router = express.Router();

// 품목 전체 출력
router.get("/", marketController.marketInfo);

export default router;