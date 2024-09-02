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
