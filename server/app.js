import express from "express";
import morgan from "morgan";
import cors from "cors";
import joinRouter from './router/join.js';
import itemRouter from "./router/item.js";
import pythonRouter from "./router/python.js"
import weatherRouter from "./router/weather.js";
import marketRouter from "./router/market.js";
import priceRouter from "./router/price.js";
import scheduleRouter from "./router/schedule.js";
import predictRouter from "./router/predict.js";
import { db } from "./DB/database.js";
import { config } from "./config.js";
import { insertToday, isData } from "./controller/todayPrice.js"
import { format } from "date-fns-tz"
import moment from "moment-timezone";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// 회원 라우터
app.use('/join', joinRouter);

// 품목 라우터
app.use("/item", itemRouter);

// 파이썬 서버 연동 라우터
app.use("/python", pythonRouter);

// 날씨 라우터
app.use("/weather", weatherRouter);

// 도매시장 라우터
app.use("/market", marketRouter);

// 가격 상세 정보 라우터
app.use("/price", priceRouter);

// 스케쥴 정보 라우터
app.use("/schedule", scheduleRouter);

// 예측 정보 라우터
app.use("/predict", predictRouter)

app.use((req, res, next) => {
    res.sendStatus(404);
});

// MySQL 연결 테스트
db.getConnection()
    .then(connection => {
        todayPrice();
        connection.release();  // 연결 반환
    })
    .catch(error => {
        console.error("MySQL connection error:", error);
    });

const server = app.listen(config.host.port, () => {
    console.log(`Server is running on port ${config.host.port}`);
});

async function todayPrice(){
    let todaySeoul = moment.tz("Asia/Seoul");
    // 오늘이 아니라 어제의 데이터를 불러와야함

    let useDate = todaySeoul.subtract(1, "days").format("YYYYMMDD");
    
    try{
        const isDataResult = await isData(useDate);
        if (isDataResult){
            console.log("오늘치 데이터 이미 삽입 되어있음");
            return;
        };
    
        const result = await insertToday(useDate);
    
        if(result){
            return;
        }else{
            throw new Error("app.js 에서 문제 발생");
        }

    }catch(error){
        console.error(error);
    }
}