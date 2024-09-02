import * as todayPriceRepository from "../data/todayPrice.js";

const itemsInfo = [
    { //양파
        "itemid": "1",
        "large": "12",
        "mid": "01"
    },
    { //당근
        "itemid": "2", 
        "large": "11",
        "mid": "03"
    }, 
    { //감자
        "itemid": "3",
        "large": "05",
        "mid": "01"
    }
];

// todayPrice 에 오늘치 데이터가 있는지 확인하기
export async function isData(today){
    try {
        const isData = await todayPriceRepository.findToday(today);

        if(isData){
            return true;
        }
        return false;
    }catch(error){
        console.error(error);
    }
}

// 오늘치 데이터를 삽입하는 함수
export async function insertToday(today){
    itemsInfo.forEach( async (itemInfo) => {
        let result = await todayPriceRepository.insertTodayPriceByMarket(today, itemInfo);

        if (!result){
            throw new Error("controller/todayPrice.js 에서 에러 발생");
        }
    });

    return true;
}