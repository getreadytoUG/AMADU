const itemid = localStorage.getItem("currentItem");
const userid = JSON.parse(localStorage.getItem("userInfo"))["id"];


document.getElementById("selectItemForm").addEventListener("submit", async function(event){
    event.preventDefault();

    const area = document.getElementById("area").value.trim();
    const pattern = /^\d+$/;

    if (!area) {
        alert("값을 입력해 주세요");
    } else if (!pattern.test(area)){
        alert("연속된 숫자만 입력해 주세요");
    }

    const data = {
        userid,
        itemid,
        area
    }

    try {
        const response = await fetch("https://port-0-amadu-server-lxfwnt5855f2efd1.sel5.cloudtype.app/item/area", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.status == 201){
            alert("재배 면적이 설정되었습니다.");
            window.location.href = "../html/chart.html";
            return;
        } else {
            alert(result.message || "서버에 오류가 발생했습니다.");
        }
    } catch(error){
        console.error(error);
        alert("오류가 발생했습니다.")
    }

})