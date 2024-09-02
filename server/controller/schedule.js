import * as scheduleRepository from "../data/schedule.js";

// 특정 품목 스케쥴 불러오기
export async function scheduleInfo(req, res){
    const {itemid} = req.body;

    try{
        const schedule_info = await scheduleRepository.findSchedule(itemid);

        if(schedule_info){
            const info = schedule_info[0][0]
            const schedule = Object.keys(info).reduce((acc, key) => {
                if (info[key] !== null){
                    acc[key] = info[key];
                }
                return acc;
            }, {});

            return res.status(201).json(schedule);
        }
    }catch(error){
        console.error(error);
    }
}