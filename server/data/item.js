import mysql2 from "mysql2";
import { db } from "../DB/database.js";

// 품목 전체 불러오기
export async function findAll(){
    try{
        const items = await db.query("SELECT * FROM items");
        if(items){
            return items[0];
        }
    }catch(error){
        console.error(error);
    }
}

// 품목 설정
export async function getItem(userid, itemid){
    try{
        const query = `INSERT INTO grow (userid, itemid) VALUES (${userid} ${itemid})`;

        const result = await db.query(query);
        if(result){
            console.log("성공");
        } 

    }catch(error){
        console.error(error);
    }
}

// 재배 면적 설정
export async function setArea(userid, itemid, area){
    try{
        const query = `INSERT INTO grow (userid, itemid, area) VALUES ("${userid}", "${itemid}", "${area}");`;
        
        const result = await db.query(query);
        if (result){
            console.log("재배면적 삽입 성공")
            return true;
        }
        return false;

    }catch(error){
        console.error(error);
    }
}

// 재배 품목 출력
export async function selectGrow(userid){
    try{ 
        const growItem = await db.query(`SELECT * FROM grow WHERE userid="${userid}"`);

        if(growItem){
            return growItem[0];
        }

    }catch(error){
        console.error(error);
    }
}