import mysql2 from "mysql2";
import { db } from "../DB/database.js";

// 품목 전체 불러오기
export async function findAll(){
    try{
        const markets = await db.query("SELECT * FROM markets");
        if(markets){
            return markets;
        }
    }catch(error){
        console.error(error);
    }
}