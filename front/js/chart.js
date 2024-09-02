document.addEventListener('DOMContentLoaded', async function () {
    const itemid = localStorage.getItem("currentItem");
    const sevenDayPrice = JSON.parse(localStorage.getItem("7daysPrice"))[itemid];
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const username = userInfo.name;
    const currentArea = Number(localStorage.getItem("currentArea"));
    const growDate = localStorage.getItem("currentGrowDate");

    try {
        const data = []
        let today = new Date();

        for (let i = 7; i > 0; i--) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() - i);

            let formDate = currentDate.toISOString().slice(0, 10);
            let price = sevenDayPrice[formDate]
            let insertDate = [
                new Date(formDate).getTime(),
                price
            ]

            data.push(insertDate);
        }
        

        // 차트 생성
        Highcharts.chart('price_graph', {
            chart: {
                zoomType: 'x'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: '가격 (원/kg)'
                }
            },
            title: {
                text: ''
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [
                                1,
                                Highcharts.color(Highcharts.getOptions().colors[0])
                                    .setOpacity(0).get('rgba')
                            ]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: "가격",
                data: data
            }]
        });

        const response = await fetch("https://port-0-amadu-server-lxfwnt5855f2efd1.sel5.cloudtype.app/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemid })
        })

        const predictData = await response.json();

        if (predictData) {
            const lastPredict = Number(predictData[0]);
            
            
            get_picture_price(itemid, data, username, currentArea, lastPredict, growDate)
        }


    } catch (error) {
        console.error('Fetch error:', error);
        // 오류 처리 로직 추가
    }
});

function get_picture_price(itemid, data, username, currentArea, lastPredict, growDate) {

    const index_all = {
        '1': '양파',
        '2': '당근',
        '3': '감자'
    };
    
    // 1 평 당 수확 kg
    const wonPerArea = {
        "1": 22.443,
        "2": 10.876,
        "3": 8.053
    }

    // 수확 예정 일자
    const growPlus = {
        "1": 300,
        "2": 140,
        "3": 190
    }

    // 사진 적용
    const picture = document.querySelectorAll('#picture');
    picture.forEach(pic => {
        pic.src = `../img/${index_all[itemid]}.jfif`;
    })

    // 재배 이름
    const picName = document.querySelectorAll('.picName')
    picName.forEach(name => {
        name.textContent = index_all[itemid]
    })

    // 이름
    const chartusername = document.getElementById("chartusername");
    chartusername.textContent = username;

    // 재배 면적 설정
    const area = document.getElementById("area");
    area.textContent = currentArea;

    // 판매 가격 설정
    const price = document.getElementById("price");
    const predictPrice = Math.floor(lastPredict * wonPerArea[itemid] * currentArea).toLocaleString();
    price.textContent = predictPrice;

    // 수확 예정 일자 설정
    const duedate = document.getElementById("duedate");

    const gettingDate = new Date(growDate);
    gettingDate.setDate(gettingDate.getDate() + growPlus[itemid]);

    const formattedDate = `${gettingDate.getFullYear()}년 ${gettingDate.getMonth() + 1}월 ${gettingDate.getDate()}일`;

    duedate.textContent = formattedDate;

    // 프론트에 적용
    const picturePrice = document.getElementById('picturePrice')
    picturePrice.textContent = `${data[6][1]}원`
}

