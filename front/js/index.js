async function clickButton(item){
    const userInfo = localStorage.getItem("userInfo");
    const userid = await JSON.parse(userInfo)["id"];
    
    
    // 지금은 품목이 세개라 세개만 작성,  이후에는 직접 DB 에서 불러오는걸 목표
    const items = {
        "양파": "1",
        "당근": "2",
        "감자": "3"
    }
    
    localStorage.setItem("currentItem", items[item]);


    try {
        const response = await fetch("https://port-0-amadu-server-lxfwnt5855f2efd1.sel5.cloudtype.app/item/grow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userid})
        })

        const data = await response.json();

        for (let i=0; i<data.length; i++){
            if ( data[i]["itemid"] == items[item]){
                localStorage.setItem("currentArea", data[i]["area"]);
                localStorage.setItem("currentGrowDate", data[i]["growdate"]);
                window.location.href = "./chart.html";
                return;
            }
        }
        window.location.href = "./select.html";

    } catch(error){
        console.error(error);
    }
}