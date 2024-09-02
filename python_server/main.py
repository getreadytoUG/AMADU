from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
# model 불어오기
from model.model import model
# 날씨 정보 
from weather.weather import weather
from datas import num_list_1, num_list_2, num_list_3
# 병해충정보 
from diseaseInfo.diseaseInfo import diseaseInfo

app = FastAPI()

# CORS Error 방지를 목적으로 하며 요청 페이지 주소를 넣으면 해당 url 에 대한 CORS Error 막아준다
origins = [
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    # 브라우저 요청에 인증 정보를 포함
    allow_methods=["*"],
    allow_headers=["*"]
)

# 모델랑 연동
@app.get('/model/{item_id}')
async def get_price(item_id: str):
    try:
        item_id = item_id
        if (item_id == "1"):
            use_list = num_list_1
        elif ( item_id == "2"):
            use_list = num_list_2
        elif (item_id == "3"):
            use_list = num_list_3
        
        num_dict = model(item_id, use_list)
        return num_dict

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"내부 서버 오류: {str(e)}")

@app.get('/weather/{location_id}')
async def get_price(location_id: str):
    try:
        location_id = location_id
        weather_list = weather(location_id)
        
        return weather_list

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"내부 서버 오류: {str(e)}")

@app.get('/diseaseInfoGet')
async def get_diseaseInfo():
    try:
        data = diseaseInfo()
        return data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"내부 서버 오류: {str(e)}")
