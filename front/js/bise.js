document.addEventListener('DOMContentLoaded', async function() {
    // URL 파라미터에서 itemid 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('itemid');
    let start_date = formatKoreanDate(urlParams.get('startdate'))

    // 서버에서 데이터 가져오기
    let events_list = await get_data(itemId);

    // FullCalendar를 사용하여 캘린더 초기화
    var calendarEl = document.getElementById('calendar');
    var events = []

    let event_dic = {}
    let events_titles
    let monthKey;

    for (let key in events_list) {
        if (key.startsWith('a')) {
            start_date = start_date.replace(/\s/g, '');
    
            let eventTitle = events_list[key];
    
            if (eventTitle.includes(',')) {
                let titleList = eventTitle.split(',').map(item => item.trim());
                titleList.forEach(title => {
                    let bar_color = getRandomColor();

                    if (start_date.split('.')[1][0] === '0') {
                        monthKey = `${start_date.split('.')[0]}-${start_date.split('.')[1][1]}`;
                    } else {
                        monthKey = `${start_date.split('.')[0]}-${start_date.split('.')[1]}`;
                    }
                    
                    let newSubObj = {};
                    newSubObj[title] = bar_color;

                    Object.keys(event_dic).forEach(monthKey => {
                        // 각 monthKey에 대한 내부 객체를 가져와서 그 안의 키-값 쌍을 출력
                        Object.keys(event_dic[monthKey]).forEach(dic_title => {
                            if(dic_title === title){
                                event_dic[monthKey][dic_title] = bar_color
                            }
                        });
                    });
                    
                    if (!event_dic[monthKey]) {
                        event_dic[monthKey] = newSubObj; // 새로운 키와 값을 추가
                    } else {
                        event_dic[monthKey] = Object.assign({}, event_dic[monthKey], newSubObj);
                    }

                    let end_date = calculateDateOneDaysLater(start_date);
    
                    let new_start = start_date.replace(/[.]/g, '-')
                    if (new_start.endsWith('-')) {
                        new_start = new_start.slice(0, -1);
                    }
                    let new_end = end_date.replace(/[.]/g, '-')
    
                    let event_set = {
                        start: new_start, 
                        end: new_end, 
                        color: bar_color,
                        title: title
                    };

                    events.forEach(event => {
                        if (event.title === title) {
                            event.color = bar_color;
                        }
                    });
                    events.push(event_set);
                });
            } else {
                let bar_color = getRandomColor();

                if (start_date.split('.')[1][0] === '0') {
                    monthKey = `${start_date.split('.')[0]}-${start_date.split('.')[1][1]}`;
                } else {
                    monthKey = `${start_date.split('.')[0]}-${start_date.split('.')[1]}`;
                }

                let newSubObj = {};
                newSubObj[eventTitle] = bar_color;

                Object.keys(event_dic).forEach(monthKey => {
                    // 각 monthKey에 대한 내부 객체를 가져와서 그 안의 키-값 쌍을 출력
                    Object.keys(event_dic[monthKey]).forEach(dic_title => {
                        if(dic_title === eventTitle){
                            event_dic[monthKey][dic_title] = bar_color
                        }
                    });
                });

                if (!event_dic[monthKey]) {
                    event_dic[monthKey] = newSubObj; // 새로운 키와 값을 추가
                } else {
                    event_dic[monthKey] = Object.assign({}, event_dic[monthKey], newSubObj);
                }
    
                let end_date = calculateDateOneDaysLater(start_date);
    
                let new_start = start_date.replace(/[.]/g, '-')
                if (new_start.endsWith('-')) {
                    new_start = new_start.slice(0, -1);
                }
                let new_end = end_date.replace(/[.]/g, '-')
    
                let event_set = {
                    start: new_start, 
                    end: new_end, 
                    color: bar_color,
                    title: eventTitle
                };

                events.forEach(event => {
                    if (event.title === eventTitle) {
                        event.color = bar_color;
                    }
                });

                events.push(event_set);
            }
            start_date = calculateDateTenDaysLater(start_date); 
        }
    }

    for (let event of events) {
        delete event.title;
    }

    var calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: true,
        selectMirror: true,
        editable: true,
        dayMaxEvents: true, 
        events: events, // 초기 이벤트 설정
        locale: 'ko', // 한국어 설정
        contentHeight: "auto",
        handleWindowResize: true,
    });
    calendar.render(); // 캘린더를 화면에 렌더링

    // 바 생성
    let now_date = document.getElementById('fc-dom-1').textContent
    let month = `${now_date.slice(0, 4)}-${now_date.slice(-3, -1).replace(' ', '')}`;
    events_titles = event_dic[month]

    var scale_bar = document.getElementById('scale_bar');
    scale_bar.innerHTML = ''
    // 객체의 모든 키(key)와 값(value) 추출
    Object.entries(events_titles).forEach(([title, color]) => {
        let bar_box = document.createElement('div');
        bar_box.classList.add('bar_box');
    
        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.backgroundColor = color;
    
        let text = document.createElement('p');
        text.classList.add('bar_text');
        text.textContent = title;
    
        bar_box.appendChild(bar);
        bar_box.appendChild(text);

        scale_bar.appendChild(bar_box);
    });

    // "오늘" 버튼에 클릭 이벤트 리스너 추가
    const button_today = document.querySelector('.fc-today-button');
    button_today.addEventListener('click', function() {
        clickEvent(event_dic);
    });

    // "이전" 버튼에 클릭 이벤트 리스너 추가
    const buttons_prev = document.getElementsByClassName('fc-prev-button');
    Array.from(buttons_prev).forEach(function(button) {
        button.addEventListener('click', function() {
            clickEvent(event_dic);
        });
    });

    // "다음" 버튼에 클릭 이벤트 리스너 추가
    const buttons_next = document.getElementsByClassName('fc-next-button');
    Array.from(buttons_next).forEach(function(button) {
        button.addEventListener('click', function() {
            clickEvent(event_dic);
        });
    });

    // 탭 기능 초기화
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');

        if (tab_id === 'tab-2') {
            $("#tab_2").css({
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'height': '10rem'
            });
            $("#tab_1").css('display', 'none'); 
        } else {
            $("#tab_1").css({
                'display': 'flex',
                'height': '10rem'
            });
            $("#tab_2").css('display', 'none');
        }
    });
    
    await diseaseInfo()
});

// 랜덤 색상 생성 함수
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 서버에서 데이터 가져오는 함수
async function get_data(itemid){
    let body_data = JSON.stringify({"itemid": itemid});

    try{
        const response = await fetch("https://port-0-amadu-server-lxfwnt5855f2efd1.sel5.cloudtype.app/schedule", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: body_data
        });
        const data = await response.json();

        return data;

    }catch (error) {
        console.error('Error fetching bise info:', error);
    }
}

// 한국 시간 기준으로 전환 
function formatKoreanDate(isoString) {
    const date = new Date(isoString);
    
    // Options for formatting
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Seoul'
    };

    // Using toLocaleDateString to format date as per the specified options
    return date.toLocaleDateString('ko-KR', options);
}

// 10일뒤 날짜 구하기 
function calculateDateTenDaysLater(inputDate) {
    // 입력된 날짜를 JavaScript Date 객체로 변환
    let dateParts = inputDate.split('.');
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1; // 월은 0부터 시작하므로 -1
    let day = parseInt(dateParts[2]);
    
    let currentDate = new Date(year, month, day);
    
    // 10일을 더한 후의 날짜를 계산
    let tenDaysLater = new Date(currentDate);
    tenDaysLater.setDate(tenDaysLater.getDate() + 10);
    
    // 날짜를 원하는 형식으로 포맷팅 (yyyy.MM.dd)
    let formattedDate = `${tenDaysLater.getFullYear()}.${padNumber(tenDaysLater.getMonth() + 1)}.${padNumber(tenDaysLater.getDate())}`;
    
    return formattedDate;
}

function calculateDateOneDaysLater(inputDate) {
    // 입력된 날짜를 JavaScript Date 객체로 변환
    let dateParts = inputDate.split('.');
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1; // 월은 0부터 시작하므로 -1
    let day = parseInt(dateParts[2]);
    
    let currentDate = new Date(year, month, day);
    
    // 1일을 더한 후의 날짜를 계산
    let oneDaysLater = new Date(currentDate);
    oneDaysLater.setDate(oneDaysLater.getDate() + 1);
    
    // 날짜를 원하는 형식으로 포맷팅 (yyyy.MM.dd)
    let formattedDate = `${oneDaysLater.getFullYear()}.${padNumber(oneDaysLater.getMonth() + 1)}.${padNumber(oneDaysLater.getDate())}`;
    
    return formattedDate;
}

// 숫자를 두 자리로 패딩하는 함수
function padNumber(number) {
    return number.toString().padStart(2, '0');
}

// 클릭 이벤트
function clickEvent(event_dic){
    var scale_bar = document.getElementById('scale_bar');
    scale_bar.innerHTML = ''
    // 바 생성
    let now_date = document.getElementById('fc-dom-1').textContent
    let month = `${now_date.slice(0, 4)}-${now_date.slice(-3, -1).replace(' ', '')}`;
    events_titles = event_dic[month]

    var scale_bar = document.getElementById('scale_bar');
    // 객체의 모든 키(key)와 값(value) 추출

    Object.entries(events_titles).forEach(([title, color]) => {
        let bar_box = document.createElement('div');
        bar_box.classList.add('bar_box');
    
        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.backgroundColor = color;
    
        let text = document.createElement('p');
        text.classList.add('bar_text');
        text.textContent = title;
    
        bar_box.appendChild(bar);
        bar_box.appendChild(text);

        scale_bar.appendChild(bar_box);
    });
}

async function diseaseInfo() {
    let diseaseInfo_url = 'https://port-0-amadu-python-lxu675jy68972031.sel5.cloudtype.app/diseaseInfoGet';
    try {
        const diseaseInfo_res = await fetch(diseaseInfo_url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!diseaseInfo_res.ok) {
            throw new Error(`HTTP error! status: ${diseaseInfo_res.status}`);
        }
        const diseaseInfo = await diseaseInfo_res.json();

        const list_name = ['red', 'yellow', 'green']

        for(let name of list_name){
            let list = document.getElementById(`${name}`)
            for(let count = 0; count < diseaseInfo[name].length; count ++){
                let li = document.createElement('li')
                li.textContent = diseaseInfo[name][count]
                list.appendChild(li)
            }
        }

    } catch (error) {
        console.error('Error fetching disease info:', error);
    }
}
