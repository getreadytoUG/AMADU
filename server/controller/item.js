import e from "express";
import * as itemRepository from "../data/item.js";

// 품목 전체 정보 불러오기
export async function itemInfo(req, res){
    try{
        const items = await itemRepository.findAll();
        if(items){
            return res.status(201).json(items);
        }
    }catch(error){
        console.error(error);
    }
}

// 품목 선택 시 grow DB 에 저장하기
export async function itemOne(req, res){
    const {userid, itemid} = req.body;
    try{
        const result = await itemRepository.getItem(userid, itemid);

    }catch(error){
        console.error(error);
    }
}

// 재배 면적 결정
export async function decisionArea(req, res){
    const {userid, itemid, area} = req.body;
    try{
        const result = await itemRepository.setArea(userid, itemid, area);

        if(!result){
            res.status(200).json({message: "이미 데이터가 있거나 오류가 발생했습니다."});
        }

        res.status(201).json({message: "성공적으로 입력되었습니다."});
    }catch(error){
        console.error(error);
    }
}

// 재배 품목 출력
export async function grow(req, res){
    const {userid} = req.body;
    try{
        const result = await itemRepository.selectGrow(userid);

        res.status(201).json(result);
    } catch(error){
        console.error(error)
    }
}