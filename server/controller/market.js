import * as marketRepository from "../data/market.js";

// 품목 전체 정보 불러오기
export async function marketInfo(req, res){
    try{
        const market_info = await marketRepository.findAll();
        if(market_info){
            return res.status(201).json(market_info);
        }
    }catch(error){
        console.error(error);
    }
}