document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch("https://port-0-amadu-server-lxfwnt5855f2efd1.sel5.cloudtype.app/price/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const todayPriceResult = await response.json()

        // 평균 구하는 코드 
        const priceResult = todayPriceResult[0];
        let avgPriceDic = { '1': {}, '2': {}, '3': {} };


        // 오늘의 날짜와 7일간의 데이터 만들기
        let today = new Date();
        let dates = [];

        // 오늘부터 7일 이전까지의 날짜를 배열에 저장
        for (let i = 1; i < 8; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() - i);

            const formDate = currentDate.toISOString().slice(0, 10);

            dates.push(formDate);
        }

        dates.forEach(date => {
            avgPriceDic["1"][date] = [];
            avgPriceDic["2"][date] = [];
            avgPriceDic["3"][date] = [];

        })


        // itemid 로 1차, 날짜로 2차 거르기
        priceResult.forEach(data => {
            let dateObj = new Date(data.insert_date);
            let insertDate = dateObj.toISOString().slice(0, 10);

            let itemid = data.itemid;
            let price = Math.abs(Number(data.price));

            console.log(avgPriceDic);
            console.log(avgPriceDic[itemid])
            console.log(avgPriceDic[itemid][insertDate])
            console.log(price)

            avgPriceDic[itemid][insertDate].push(price);
        });

        dates.forEach(date => {
            ["1", "2", '3'].forEach(index => {
                let avg = makeAvg(avgPriceDic[index][date]);
                avgPriceDic[index][date] = avg;
            });
        });


        // 프론트에 적용 
        const mint_1 = document.getElementById('1_mint')
        const mint_2 = document.getElementById('2_mint')
        const mint_3 = document.getElementById('3_mint')

        mint_1.textContent = avgPriceDic['1'][dates[0]]
        mint_2.textContent = avgPriceDic['2'][dates[0]]
        mint_3.textContent = avgPriceDic['3'][dates[0]]

        localStorage.setItem("7daysPrice", JSON.stringify(avgPriceDic));

    } catch (error) {
        console.error(error);
    }
});


function makeAvg(list_data){
    if (list_data.length > 0){
        const sum = list_data.reduce((acc, val) => acc + val, 0);
        const avg = Math.floor(sum / list_data.length);

        return avg;
    }else{
        return 0;
    }
}
