export async function get_price() {
    try {
        const response = await fetch('https://port-0-amadu-python-lxu675jy68972031.sel5.cloudtype.app/model', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const price_list = await response.json();
        return price_list;

    } catch (error) {
        console.error('Fetch error:', error);
        return "Python 서버 연동 실패";
    }
}
