import { db } from "../DB/database.js";

// 품목 스케쥴 불러오기
export async function findSchedule(itemid){
    try{
        const query = `SELECT * FROM schedule WHERE itemid=${itemid};`
        const schedule = await db.query(query)

        if(schedule){
            return schedule;
        }
    }catch(error){
        console.error(error);
    }
}