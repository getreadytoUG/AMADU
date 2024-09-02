document.addEventListener('DOMContentLoaded', async function() {
    let user_id = await get_userId();
    await get_biseInfo(user_id);
});

// userid 가져오기
async function get_userId(){
    try {
        const userInfo = localStorage.getItem("userInfo");
        const userObject = JSON.parse(userInfo);
        return userObject['id'];
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

// 유저가 만들어진 비서 목록 가져오기
async function get_biseInfo(userId){
    try {
        let body_data = JSON.stringify({"userid": userId});
        
        const response = await fetch("https://port-0-amadu-server-lxfwnt5855f2efd1.sel5.cloudtype.app/item/grow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body_data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        makeTable(data);

    } catch (error) {
        console.error('Error fetching bise info:', error);
    }
}

const itemIcons = {
    1: '양파',   // 양파 아이콘
    2: '당근',  // 당근 아이콘
    3: '감자'   // 감자 아이콘
    // 추가적인 아이템 ID와 경로를 필요에 따라 여기에 추가할 수 있습니다
};

// 테이블 만들기
function makeTable(data){
    const container = document.getElementById('container');
    container.innerHTML = ''; 

    data.forEach(item => {
        let bise_box = document.createElement('div');
        bise_box.classList.add('bise_box');

        let pic_box = document.createElement('div');
        pic_box.classList.add('pic_box');

        let itemId = item['itemid'];
        let bise_pic = document.createElement('img');
        bise_pic.classList.add('bise_pic');
        bise_pic.src = `../img/${itemIcons[itemId]}.jfif`;

        let bise_date = document.createElement('div');
        bise_date.classList.add('bise_date');

        let formattedDate = formatKoreanDate(item['growdate']);
        let start_date = formattedDate.slice(0, -1);
        bise_date.textContent = start_date;

        let area = document.createElement('div')
        area.classList.add('area')
        area.textContent = item['area'] + '평'

        bise_box.addEventListener('click', () => {
            // ISO 형식으로 날짜 변환
            let isoDate = new Date(item['growdate']).toISOString();
            
            // URL에 포함될 수 있도록 encodeURIComponent() 사용
            let url = `./bise.html?itemid=${itemId}&startdate=${encodeURIComponent(isoDate)}`;
            window.location.href = url;
        });

        pic_box.appendChild(bise_pic); // bise_pic을 pic_box에 추가
        bise_box.appendChild(pic_box); // pic_box를 bise_box에 추가
        bise_box.appendChild(bise_date);
        bise_box.appendChild(area)
        
        container.appendChild(bise_box);
    });
}

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
