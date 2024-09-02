import requests 
from bs4 import BeautifulSoup as bs

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
}

def diseaseInfo():
    driver = None
    try:
        result = {}

        url = 'https://ncpms.rda.go.kr/npms/Main.np'
        res = requests.get(url, headers=headers)
        html = bs(res.text, 'html.parser')

        id_list = ['pestSectionWarning', 'pestSectionWatch', 'pestSectionForecast']
        titles = ['red', 'yellow', 'green']

        for index in range(0, len(id_list)):
            id = id_list[index]
            result_list = getInfo(html, id)
            result[titles[index]] = result_list

        return result

    except Exception as e:
        print(f"An error occurred in weather function: {e}")
        return None

def getInfo(html, id):
    ul_element = html.find('ul', {'id': id})
    li_element= ul_element.find_all('li')

    result_box = []
    for li in li_element:
        a_tag = li.find('a')
        if a_tag:
            result_box.append(a_tag.text)
    return result_box 
    