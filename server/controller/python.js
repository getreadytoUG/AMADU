import * as pythonRepository from "../data/python.js";

export async function get_model(req, res){
    try{
        const price_list = await pythonRepository.get_price();
        if(price_list){
            return res.status(201).json(price_list);
        }
    }catch(error){
        console.error(error);
    }
}