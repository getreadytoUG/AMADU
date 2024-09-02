document.addEventListener('DOMContentLoaded', (event) => {
    const userInfo = localStorage.getItem("userInfo");

    const userObject = JSON.parse(userInfo);
    let name = userObject['name']
    let local = userObject['local']
    let phone = userObject['phone']

    document.getElementById('name_box').textContent = `${name}`;
    document.getElementById('location_box').textContent = `${local}`;
    document.getElementById('phone_box').textContent = `${phone}`;


    // 로그아웃 버튼에 이벤트 리스너 추가
    const logoutButton = document.getElementById('logoutBT');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

function handleLogout() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("key");
    localStorage.removeItem("currentItem");
    localStorage.removeItem("currentArea");
    localStorage.removeItem("currentGrowDate");
    localStorage.removeItem("7daysPrice");
    window.location.href = 'login.html';
}