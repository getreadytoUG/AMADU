import * as weatherRepository from "../data/weather.js";

export async function get_weather(req, res){
    try{
        var location_id = '서울'
        const weather_info = await weatherRepository.get_weather(location_id);
        if(weather_info){
            return res.status(201).json(weather_info);
        }
    }catch(error){
        console.error(error);
    }
}