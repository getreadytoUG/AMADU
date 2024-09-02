document.addEventListener('DOMContentLoaded', async function() {
    await get_marketInfo(); // await를 사용하여 비동기 함수가 끝날 때까지 기다립니다.
});

async function get_marketInfo() {
    try {
        const response = await fetch('https://port-0-amadu-server-lxfwnt5855f2efd1.sel5.cloudtype.app/market', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json(); // JSON 데이터를 파싱한 결과를 변수에 저장합니다.
        const market_box = document.getElementById('market_box')
        const div_box = document.getElementById('tab-4')

        for (let i = 0; i < result[0].length; i++) {
            // 각 시장 정보를 담을 div 요소 생성
            let market_box = document.createElement('div');
            market_box.classList.add('market_box');
        
            // 도매 시장 이름
            let market_name_box = document.createElement('div');
            market_name_box.classList.add('market_name_box');
        
            let market_name1 = document.createElement('i');
            market_name1.classList.add('xi-market');
        
            let market_name2 = document.createElement('p');
            market_name2.classList.add('market_name2');
            market_name2.textContent = result[0][i]['marketname'];
        
            market_name_box.appendChild(market_name1);
            market_name_box.appendChild(market_name2);
            market_box.appendChild(market_name_box);
        
            // 도매 시장 전화 번호
            let market_phone_box = document.createElement('div');
            market_phone_box.classList.add('market_phone_box');
        
            let market_phone1 = document.createElement('i');
            market_phone1.classList.add('xi-call');
        
            let market_phone2 = document.createElement('p');
            market_phone2.classList.add('market_phone2');
            market_phone2.textContent = result[0][i]['number'];
        
            market_phone_box.appendChild(market_phone1);
            market_phone_box.appendChild(market_phone2);
            market_box.appendChild(market_phone_box);
        
            // 도매 시장 위치
            let market_local_box = document.createElement('div');
            market_local_box.classList.add('market_local_box');

            let market_local1 = document.createElement('i');
            market_local1.classList.add('xi-maker');
        
            let market_local2 = document.createElement('p');
            market_local2.classList.add('market_local2');
            market_local2.textContent = result[0][i]['address'];

            market_local_box.appendChild(market_local1);
            market_local_box.appendChild(market_local2);
            market_box.appendChild(market_local_box);
        
            // 도매 시장 주차 가능한 차량 수
            let market_car_count = document.createElement('div');
            market_car_count.classList.add('market_car_count');
            
            let car_mark = document.createElement('i');
            car_mark.classList.add('xi-park');
            
            let market_car1 = document.createElement('p');
            market_car1.classList.add('market_car1');
            market_car1.textContent = '주차 가능 차량: ';
        
            let market_car2 = document.createElement('p');
            market_car2.classList.add('market_car2');
            market_car2.textContent = result[0][i]['parking']+' 대';
        
            market_car_count.appendChild(car_mark);
            market_car_count.appendChild(market_car1);
            market_car_count.appendChild(market_car2);
            market_box.appendChild(market_car_count);
        
            // 문서에 추가
            div_box.appendChild(market_box);
        }
    } catch (error) {
        console.error('Error fetching market info:', error);
    }
}
