import cors from "cors";
import express from "express";
import { config } from "./config.js"

const app = express();

app.use(cors());
const apiKey = config.api.apiKey

export async function data(){
    try {
        const downURL = `http://openapi.seoul.go.kr:8088/${apiKey}/json/GarakWeekPriceRate/1094308/1095307/`;

        const response = await fetch(downURL);
        if (response.ok){
            const data = await response.json();
            // const result = await data["GarakWeekPriceRate"]["row"];
            // console.log(result);
        }
    }
    catch (error) {
        console.error(error);
    }
}
