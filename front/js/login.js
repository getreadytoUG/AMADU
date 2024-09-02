document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = document.getElementById("userid").value.trim();
    const password = document.getElementById("userpassword").value.trim();

    if (!id){
        alert("아이디를 입력해 주세요");
        return;
    }

    if(!password){
        alert("비밀번호를 입력해 주세요");
        return;
    }

    const data = {
        id,
        password
    };

    try{
        const response = await fetch("https://port-0-amadu-server-lxfwnt5855f2efd1.sel5.cloudtype.app/join/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(response.status == 201){
            const token = result.token;
            const now = new Date();

            // 7일 동안의 로그인 허용 JWT
            // const newExpiryTime = now.getTime() + ( 7 * 24 * 60 * 60 * 1000);
            // 한시간으로 우선 설정
            const newExpiryTime = now.getTime() + ( 60 * 60 * 1000);

            result.expiry = newExpiryTime;

            localStorage.setItem("userInfo", JSON.stringify(result));
  
            alert("로그인에 성공했습니다.");
            window.location.href = "../html/index.html";

        } else {
            alert(result.message || "로그인에 실패했습니다.");
            return;
        }
    } catch(error){
        console.error(error);
        alert("로그인에 실패했습니다.");
        return;
    }
});