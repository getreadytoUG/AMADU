let isVerified = false;

// 유효성 검사 함수
function validateInput() {
    const userid = document.getElementById('userid').value.trim();
    const userpassword = document.getElementById('userpassword').value;
    const checkuserpassword = document.getElementById('checkuserpassword').value;

    // 아이디
    if (userid.length > 20) {
        alert('사용자 아이디는 20자를 초과할 수 없습니다.');
        return false;
    }

    if (/\s/.test(userid)) {
        alert('아이디에 띄어쓰기를 사용할 수 없습니다.');
        return false;
    }


    // 비밀번호 일치 여부
    if(userpassword !== checkuserpassword){
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }
    return true;
}

function formatPhoneNumber(phnumber) {
    phnumber = phnumber.trim();
    phnumber = phnumber.replace(/-/g, '');
    const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneRegex.test(phnumber)) {
        alert('올바른 전화번호 형식이 아닙니다.');
        return null;
    }
    return phnumber;
}


// 회원가입 폼 제출 이벤트 리스너
document.getElementById('registForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id = document.getElementById('userid').value.trim();
    const password = document.getElementById('userpassword').value;
    const name = document.getElementById('username').value;
    const phone = `${document.getElementById('phnumber').value.trim()}`;
    const local = document.getElementById('local').value.trim();
// "2023-12-14"

    if (!id || !password || !name || !phone || !local) {
        alert('모든 값을 입력해 주세요.');
        return;
    }

    // 서버로 전송할 데이터 객체
    const data = {
        id,
        password,
        name,
        phone,
        local
    };

    // 서버 요청 부분
    try {
        const response = await fetch('https://port-0-amadu-server-lxfwnt5855f2efd1.sel5.cloudtype.app/join/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json()

        if (response.status == 201) {
            alert('회원가입이 완료되었습니다.');
            window.location.href = "../html/login.html"
        } else {
            alert(result.message || '회원가입에 실패했습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('회원가입에 실패했습니다.');
    }
});