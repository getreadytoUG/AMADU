import * as priceRepository from "../data/price.js";

// 7일 동안의 가격 출력
export async function sevenDayPrice(req, res){
    try {
        const sevenDayPrice = await priceRepository.getSevenDay();

        if (sevenDayPrice){
            return res.status(201).json(sevenDayPrice);
        }

    }catch(error){
        console.error(error);
    }
}



// // 시장별 가격 출력
// export async function get_price_market(req, res){
//     try{
//         const pageNo = 1;
//         // 시장코드
//         const body = req.body;
//         const whsalCd = body.whsalCd;
//         console.log(whsalCd);
//         // 오늘 날짜
//         const today = new Date();
//         const sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(today.getDate() - 7);

//         // 연도, 월, 일
//         let year = today.getFullYear();
//         let month = String(today.getMonth() + 1).padStart(2, '0'); 
//         let day = String(today.getDate()).padStart(2, '0');
//         const todayDate = `${year}${month}${day}`;

//         year = sevenDaysAgo.getFullYear();
//         month = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0'); 
//         day = String(sevenDaysAgo.getDate()).padStart(2, '0');
//         const sevenDaysAgoDate = `${year}${month}${day}`;

//         console.log(todayDate);
//         console.log(sevenDaysAgoDate);

//         const price_json = await priceRepository.get_price_market(pageNo, whsalCd, sevenDaysAgoDate, todayDate);
//         if(!price_json.errorText){
//             return res.status(201).json(price_json);
//         }
//     }catch(error){
//         console.error(error);
//     }
// }


// // 품목별
// export async function get_price_item(req, res){
//     try{
//         const pageNo = 1;

//         const body = req.body;
//         const large = body.large;
//         const mid = body.mid;

//         const today = new Date();
//         const sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(today.getDate() - 7);

//         // 연도, 월, 일
//         let year = today.getFullYear();
//         let month = String(today.getMonth() + 1).padStart(2, '0'); 
//         let day = String(today.getDate()).padStart(2, '0');
//         const todayDate = `${year}${month}${day}`;

//         year = sevenDaysAgo.getFullYear();
//         month = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0'); 
//         day = String(sevenDaysAgo.getDate()).padStart(2, '0');
//         const sevenDaysAgoDate = `${year}${month}${day}`;

//         console.log(todayDate);
//         console.log(sevenDaysAgoDate);
        
//         const price_json = await priceRepository.get_price_item(pageNo, large, mid, sevenDaysAgoDate, todayDate);
        
//         if(!price_json.errorText){
//             return res.status(201).json(price_json);
//         }
//     }catch(error){
//         console.error(error);
//     }
// }

// // item은 고정
// // 시장별 작년 가격
// export async function lastYearPriceByMarket(req, res){
//     try{
//         const pageNo = 1;

//         const body = req.body;
//         const whsalCd = body.whsalCd;

//         const today = new Date();

//         // 연도, 월, 일
//         let year = today.getFullYear();
//         let month = String(today.getMonth() + 1).padStart(2, '0'); 
//         let day = String(today.getDate()).padStart(2, '0');
//         const todayDate = `${year}${month}${day}`;

//         console.log(todayDate);
        
//         const price_json = await priceRepository.get_price_market(pageNo, whsalCd, todayDate, todayDate);
        
//         if(!price_json.errorText){
//             return res.status(201).json(price_json);
//         }
//     }catch(error){
//         console.error(error);
//     }
// }


// // 7일 동안에 날짜 및 가격
// export async function last7days_price(req, res){
//     try{
//         const pageNo = 1;

//         const body = req.body;
//         // const large = body.large;
//         // const mid = body.mid;
//         // const whsalCd = body.whsalCd;

//         const large = '12';
//         const mid = '01'
//         const whsalCd = '110001';

//         const today = new Date();
//         const sevenDaysAgo = new Date();

//         const json_data = []

//         for (let count = 7; count > 0; count--) {
//             sevenDaysAgo.setDate(today.getDate() - count);
        
//             if (sevenDaysAgo.getDay() === 6) { // 토요일인 경우
//                 sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 1); // 금요일로 이동
//             } else if (sevenDaysAgo.getDay() === 0) { // 일요일인 경우
//                 sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 2); // 금요일로 이동
//             }
        
//             let year = sevenDaysAgo.getFullYear();
//             let month = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0'); 
//             let day = String(sevenDaysAgo.getDate()).padStart(2, '0');
//             let todayDate = `${year}${month}${day}`;
        
        
//             let price_json = await priceRepository.get_7days_price(pageNo, whsalCd, large, mid, todayDate);
//             json_data.push(price_json);
//         }
//         return res.status(201).json(json_data);
//     }catch(error){
//         console.error(error);
//     }
// }
