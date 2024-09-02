const API_KEY = "adb6683d0afbc98d17362ca80575cbce";
const weatherEndpoint = "https://api.openweathermap.org/data/2.5/weather";
const localWeatherEndpoint = "https://port-0-amadu-python-lxu675jy68972031.sel5.cloudtype.app/weather/";


const tempInfo = document.querySelector('.temp');
const placeInfo = document.querySelector('.place');
const weatherInfo = document.querySelector('.weatherInfo');
const weatherIconImg = document.querySelector('.weatherIcon');

function init() {
    askForCoords();
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function handleSuccess(position) {
    const { latitude, longitude } = position.coords;
    const coordsObj = { latitude, longitude };
    getRemoteWeather(latitude, longitude);
}

function handleError(error) {
    console.error("Cannot access location:", error);
}

async function getRemoteWeather(lat, lon) {
    try {
        const weatherUrl = `${weatherEndpoint}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
        const response = await fetch(weatherUrl);
        const data = await response.json();
        updateWeatherUI(data);
        
        // Fetch additional weather details based on local stored information
        let userInfo = localStorage.getItem("userInfo");
        let userObject = JSON.parse(userInfo);
        let local = userObject['local'];
        
        const localWeatherUrl = `${localWeatherEndpoint}${local}`;
        const localResponse = await fetch(localWeatherUrl);
        const localData = await localResponse.json();
        
        updateAdditionalWeatherInfo(localData);
        makeWeatherChart(localData)
        makeWeatherTable(localData)
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

function updateWeatherUI(data) {
    const { main, name, weather } = data;
    const temperature = main.temp;
    const weatherDescription = weather[0].description;
    const weatherIcon = weather[0].icon;
    const weatherIconAdrs = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    tempInfo.textContent = `${temperature} °C`;
    placeInfo.textContent = `${name}`;
    weatherInfo.textContent = `${weatherDescription}`;
    weatherIconImg.setAttribute('src', weatherIconAdrs);
}

function updateAdditionalWeatherInfo(data) {
    let rain = document.getElementById('rain');
    rain.textContent = data['강수 확률'];

    let simdo = document.getElementById('simdo');
    simdo.textContent = data['습도'];

    let wind = document.getElementById('wind');
    wind.textContent = data['풍속'];
}

function makeWeatherChart(localData) {
    let data = [];
    let temp_avg = [];
    
    let date_time = new Date();
    
    for (let i = 0; i < 7; i++) {
        let data_set = [];
    
        if (i === 0) {
            date_time.setHours(9, 0, 0, 0);
            let timestamp = date_time.getTime();
    
            let max_temp = fromFtoC(Number(localData['오늘최고온도']));
            let min_temp = fromFtoC(Number(localData['오늘최저온도']));
            temp_avg = (max_temp + min_temp) / 2;
    
            data_set.push(timestamp, temp_avg);
        } else {
            let new_date = new Date(date_time);
            new_date.setDate(date_time.getDate() + i);
            new_date.setHours(9, 0, 0, 0);
            let new_date_timestamp = new_date.getTime();
    
            let max_temp = fromFtoC(Number(localData[`${i}일뒤최고온도`]));
            let min_temp = fromFtoC(Number(localData[`${i}일뒤최저온도`]));
            temp_avg = (max_temp + min_temp) / 2;
    
            data_set.push(new_date_timestamp, temp_avg);
        }
    
        data.push(data_set);
    }

    Highcharts.chart('weather_chart', {
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
                text: '최고 온도 (°C)'
            }
        },
        title: {
            text: '일주일 평균 온도'
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
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
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
            name: '평균 온도',
            data: data
        }]
    });
}

 
function makeWeatherTable(localData) {
    let dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    let today = new Date();
    let dayOfWeek = today.getDay();

    const date_table = document.getElementById('weather_table');
    date_table.innerHTML = ''; // 기존 테이블 내용 초기화

    for (let i = 0; i < 7; i++) {
        let max_temp, min_temp;
        if (i === 0) {
            max_temp = fromFtoC(Number(localData['오늘최고온도']));
            min_temp = fromFtoC(Number(localData['오늘최저온도']));
        } else {
            max_temp = fromFtoC(Number(localData[`${i}일뒤최고온도`]));
            min_temp = fromFtoC(Number(localData[`${i}일뒤최저온도`]));
        }

        let date_box = document.createElement('div');
        date_box.classList.add('date_box');

        let date_day = document.createElement('div');
        date_day.classList.add('date_day');
        date_day.textContent = dayNames[(dayOfWeek + i) % 7]; // 요일 순환 처리

        let max_temp_box = document.createElement('p');
        max_temp_box.classList.add('max_temp');
        max_temp_box.textContent = `${max_temp} °`;

        let min_temp_box = document.createElement('p');
        min_temp_box.classList.add('min_temp');
        min_temp_box.textContent = `${min_temp} °`;

        date_box.appendChild(date_day);
        date_box.appendChild(max_temp_box);
        date_box.appendChild(min_temp_box);

        date_table.appendChild(date_box);
    }
}

function fromFtoC(F){
    let C = (F - 32) * 0.55;
    C = parseFloat(C.toFixed(2));
    return C;
}


init();
