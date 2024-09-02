import * as predictRepository from "../data/predict.js";

export async function predictInfo(req, res){
    try{
        const {itemid} = req.body;

        const predict_info = await predictRepository.predictJSON(itemid);

        if(predict_info){
            return res.status(201).json(predict_info);
        }
    }catch(error){
        console.error(error);
    }
}