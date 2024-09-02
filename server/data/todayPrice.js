import { config } from "../config.js";
import { db } from "../DB/database.js";
import fetch from "node-fetch";

const localInfo = {
    "110001" : 1, 
    "110008" : 2, 
    "210009" : 3, 
    "210005" : 4, 
    "210001" : 5, 
    "220001" : 6, 
    "230001" : 7, 
    "230003" : 8, 
    "240001" : 9, 
    "240004" : 10, 
    "250001" : 11, 
    "250003" : 12, 
    "380201" : 13, 
    "310101" : 14, 
    "310401" : 15, 
    "310901" : 16, 
    "311201" : 17, 
    "320101" : 18, 
    "320201" : 19, 
    "320301" : 20, 
    "330101" : 21, 
    "330201" : 22, 
    "340101" : 23, 
    "350101" : 24, 
    "350301" : 25, 
    "350402" : 26, 
    "360301" : 27, 
    "370101" : 28, 
    "370401" : 29, 
    "371501" : 30,
    "380101" : 31,
    "380303" : 32,
    "380401" : 33 
}

// 오늘치 데이터가 이미 들어갔는지 확인
export async function findToday(today){
    try{
        let formatToday = `${today.substring(0, 4)}-${today.substring(4, 6)}-${today.substring(6, 8)}`;
        const query = "SELECT * FROM todayPrice WHERE insert_date=?;";
        const result = await db.query(query, [formatToday]);

        if(result[0].length > 0){
            return true;
        }
        return false;
    }catch(error){
        console.error(error);
    }
}

// 오늘치 데이터 삽입하는 함수
export async function insertTodayPriceByMarket(today, itemInfo){
    try {
        const large = itemInfo.large;
        const mid = itemInfo.mid;
        const junKey = config.api.junKey;

        const response = await fetch(`https://at.agromarket.kr/openApi/price/dateWhsalPumSale.do?serviceKey=${junKey}&apiType=json&pageNo=1&large=${large}&mid=${mid}&strDate=${today}&endDate=${today}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok){
            throw new Error("data/todayPrice.js 에서 에러 발생")
        }   

        const result = await response.json();
        const data = result.data;

        // 제대로 fetch 했는지 확인용
        if(data.length == 0){
            console.log("데이터 없음")
        } else{
            console.log(data[0]);
        }

        data.forEach(async (element) => {
            let marketid = localInfo[element.whsalcd];
            let itemid = itemInfo["itemid"];
            let price = parseInt(element.totamt / element.totqty);
            let result = await insertToDB(marketid, itemid, price);

            if (!result){
                throw new Error("data/todayPrice.js 에서 에러 발생")
            }
        });

        return true;


    }catch(error){
        console.error(error);
    }
}

// 오늘치 데이터를 삽입하는 함수 2
async function insertToDB(marketid, itemid, price){
    try {
        const query = "INSERT IGNORE INTO todayPrice (marketid, itemid, price) VALUES (?, ?, ?);";
        const result = await db.query(query, [marketid, itemid, price]);

        if(result){
            return true;
        }else{
            return false;
        }

    }catch(error){
        console.error(error);
    }
}