document.addEventListener('DOMContentLoaded', async function() {
    const itemid = localStorage.getItem("currentItem");
    const sevenDayPrice = JSON.parse(localStorage.getItem("7daysPrice"))[itemid];
    // table에 적용 
    const table = document.getElementById('val_box')
    
    let start_index = 0
    let yes_val = 0
    const data_dic = {}

    let keys = Object.keys(sevenDayPrice).reverse();

    for (let key of keys) {
        let date = key
        let avg_val = sevenDayPrice[key]

        if(avg_val === 0){
            yes_rate = 0
        }else{
            if(yes_val === 0){
                yes_rate = 0
            }else{
                yes_rate = (avg_val - yes_val) / yes_val
            }
        }

        yes_val = avg_val

        let data = {
            date,
            avg_val,
            yes_rate
        }

        data_dic[start_index] = data
        start_index += 1
    }


    for (let index = 6; index >= 0; index--) {
        let tr = document.createElement('tr')

        let date_val = document.createElement('td')
        date_val.classList.add('date_val')
        date_val.textContent = data_dic[index]['date']
    
        let avg_val = document.createElement('td')
        avg_val.classList.add('avg_val')
        avg_val.textContent = data_dic[index]['avg_val']
    
        let yes_rate = document.createElement('td')
        yes_rate.classList.add('yes_rate')

        rate_Data = parseFloat(data_dic[index]['yes_rate'])
        let percentage = (rate_Data * 100).toFixed(2) + "%"
        yes_rate.textContent = percentage
    
        tr.appendChild(date_val)
        tr.appendChild(avg_val)
        tr.appendChild(yes_rate)
    
        table.appendChild(tr);
    }
    
})