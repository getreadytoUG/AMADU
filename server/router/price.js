import express from "express";
import * as priceController from "../controller/price.js"

const router = express.Router();

// // 가격 전체 출력(시장별, 품목별)
// // 시장별
// router.post("/market", priceController.get_price_market);

// // 품목별
// router.post("/item", priceController.get_price_item);

// // 시장별 작년 가격
// router.post("/lastyear", priceController.lastYearPriceByMarket);

// 7일 동안에 날짜 및 가격 
router.get('/', priceController.sevenDayPrice)

export default router;