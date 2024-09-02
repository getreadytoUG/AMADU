import { db } from "../DB/database.js";
// // 품목 코드나 시장 코드는 db에서 꺼내올 수도 있으니.

// 7일 데이터 불러오는 코드
export async function getSevenDay(){
    try{
        const query = `
            SELECT *
            FROM todayPrice
            WHERE DATE(insert_date) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
            ORDER BY insert_date DESC;
        `;

        const prices = await db.query(query);

        if (prices){
            return prices;
        }
    }catch(error){
        console.error(error);
    }
}


// /*
// 현재 신청한 아이피: 121.138.56.205

// 참고사항:
// get_price = 예측 가격, get_price_d = 일일 상세 가격
// page별 1000건, 1000건 이상일 경우 pageNo 조작 필요.
// large = 대분류, mid = 품목

// 필수 요청 변수: 시장코드, 대분류코드, 품목코드, 시작일자, 끝일자

// 프론트 만들때 "시장별 조회", "품목별 조회" 나눌 것

// */

// // 시장별 조회
// export async function get_price_market(pageNo, whsalCd, str, end) {
//     try {
//         const response = await fetch(`https://at.agromarket.kr/openApi/price/dateWhsalPumSale.do?serviceKey=74FAD2A063324F919CBA176CB4123C5D&apiType=json&pageNo=${pageNo}&whsalCd=${whsalCd}&strDate=${str}&endDate=${end}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const price_json = await response.json();
//         return price_json;

//     } catch (error) {
//         console.error('Fetch error:', error);
//         return "API 연동 실패";
//     }
// }

// // 품목별 조회 -> 대분류코드, 품목코드 필요
// export async function get_price_item(pageNo, large, mid, str, end) {
//     try {
//         const response = await fetch(`https://at.agromarket.kr/openApi/price/dateWhsalPumSale.do?serviceKey=74FAD2A063324F919CBA176CB4123C5D&apiType=json&pageNo=${pageNo}&strDate=${str}&endDate=${end}&large=${large}&mid=${mid}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data_json = await response.json();
//         return data_json;

//     } catch (error) {
//         console.error('Fetch error:', error);
//         return "API 연동 실패";
//     }
// }

// // https://at.agromarket.kr/openApi/price/dateWhsalPumSale.do?serviceKey=74FAD2A063324F919CBA176CB4123C5D&apiType=json&pageNo=1&whsalCd=110001&strDate=20240607&endDate=20240614&large=12&mid=01

// export async function get_7days_price(pageNo, whsalCd, large, mid, todayDate){
//     try{
//         const response = await fetch(`https://at.agromarket.kr/openApi/price/dateWhsalPumSale.do?serviceKey=74FAD2A063324F919CBA176CB4123C5D&apiType=json&pageNo=${pageNo}&whsalCd=${whsalCd}&strDate=${todayDate}&endDate=${todayDate}&large=${large}&mid=${mid}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const responseData = await response.json(); 

//         var year = parseInt(todayDate.substring(0, 4), 10); // '2027'
//         var month = parseInt(todayDate.substring(4, 6), 10); // '17'
//         var day = parseInt(todayDate.substring(6, 8), 10); // '17'
        
//         // Date 객체 생성
//         var date = new Date(year, month - 1, day); 

//         // Unix 시간(밀리초 단위)으로 변환
//         var unixTimeMilliseconds = date.getTime();

//         // 필요에 따라 초 단위로 변환
//         var unixTimeSeconds = Math.floor(unixTimeMilliseconds / 1000);

//         var totqty = responseData.data[0]['totqty']
//         var totamt = responseData.data[0]['totamt']
//         var price = totamt / totqty

//         var data_json = {
//             "date": unixTimeSeconds,
//             "price": price
//         }

//         return data_json;

//     }catch (error) {
//         console.error('Fetch error:', error);
//         return "API 연동 실패";
//     }
// }