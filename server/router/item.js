import express from "express";
import * as itemController from "../controller/item.js"

const router = express.Router();

// 품목 전체 출력
router.get("/all", itemController.itemInfo);

// 품목 선택
router.post("/one", itemController.itemOne);

// 이 위는 프론트단과의 조율이 필요해 보임. 
// 품목이 적어 선택할 필요가 없는 것으로 파악


// 재배 면적 선택
router.post("/area", itemController.decisionArea);

// 유저 재배 품목 목록
router.post("/grow", itemController.grow);

export default router;