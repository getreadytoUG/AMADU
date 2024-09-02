export async function get_weather(location_id) {
    try {
        const response = await fetch(`https://port-0-amadu-python-lxu675jy68972031.sel5.cloudtype.app/weather/${location_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const weather_list = await response.json();
        return weather_list;

    } catch (error) {
        console.error('Fetch error:', error);
        return "Python 서버 연동 실패";
    }
}
