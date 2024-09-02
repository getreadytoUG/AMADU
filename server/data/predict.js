import fetch from "node-fetch";

export async function predictJSON(itemid){
    try {
        const response = await fetch(`https://port-0-amadu-python-lxu675jy68972031.sel5.cloudtype.app/model/${itemid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const price_json = await response.json();

        return price_json;

    } catch (error) {
        console.error(error);
        return;
    }
}
