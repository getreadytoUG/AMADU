import requests 
from bs4 import BeautifulSoup as bs

class GoogleWeather():
    url = 'https://www.google.com/search?q={}&sca_esv=b41f59bb11203993&sxsrf=ADLYWILnCllKBGttECA4knfa8GU4syBG9g%3A1718268828675&ei=nLNqZpXqKJfe2roP7O6bsAg&udm=&ved=0ahUKEwiVqKWZmtiGAxUXr1YBHWz3BoYQ4dUDCBA&uact=5&oq=%EC%84%9C%EC%9A%B8%EB%82%A0%EC%94%A8&gs_lp=Egxnd3Mtd2l6LXNlcnAiDOyEnOyauOuCoOyUqDIKEAAYgAQYQxiKBTIKEAAYgAQYFBiHAjIKEAAYgAQYQxiKBTIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgYQABgHGB4yBRAAGIAESMQbUJEWWJgacAR4AZABApgBmgOgAYEHqgEHMC40LjQtMbgBA8gBAPgBAZgCBqACiQLCAgoQABiwAxjWBBhHmAMAiAYBkAYKkgcDNC4yoAfaIQ&sclient=gws-wiz-serp'

    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    }

    result = []

    def __init__(self, keyword = None):
        self.keyword = keyword
    
    def set_keyword(self, keyword):
        self.keyword = keyword

    def run(self):
        res = requests.get(self.url.format(self.keyword), headers = self.headers)
        self.paras_html(res.text)
        return res

    def paras_html(self, text):
        html = bs(text, 'html.parser')

        temperature_now = html.find('span', {'id': 'wob_tm'})
        temperature_now = temperature_now.text.strip() if temperature_now else None

        precipitation = html.find('span', {'id': 'wob_pp'})
        precipitation  = precipitation.text.strip() if temperature_now else None

        humidity = html.find('span', {'id': 'wob_hm'})
        humidity  = humidity.text.strip() if temperature_now else None

        wind_speed = html.find('span', {'id': 'wob_ws'})
        wind_speed  = wind_speed.text.strip() if temperature_now else None

        # 오늫 최고 및 최저 온도
        date_1_max_tem = html.select_one('#wob_dp > div.wob_df.wob_ds > div.wNE31c > div.gNCp2e > span:nth-child(1)').text
        date_1_min_tem = html.select_one('#wob_dp > div.wob_df.wob_ds > div.wNE31c > div.QrNVmd.ZXCv8e > span:nth-child(1)').text

        # 1주일치 최고 및 최저 온도
        weekly_temperatures = {}
        for num in range(2, 9): 
            max_temp = html.select_one(f'#wob_dp > div:nth-child({num}) > div.wNE31c > div.gNCp2e > span:nth-child(1)')
            min_temp = html.select_one(f'#wob_dp > div:nth-child({num}) > div.wNE31c > div.QrNVmd.ZXCv8e > span:nth-child(1)')
            weekly_temperatures[f'{num-1}일뒤최고온도'] = max_temp.text.strip() if max_temp else None
            weekly_temperatures[f'{num-1}일뒤최저온도'] = min_temp.text.strip() if min_temp else None

        self.result.append({
            '현재 온도': temperature_now,
            '강수 확률': precipitation,
            '습도': humidity,
            '풍속': wind_speed,
            '오늘최고온도': date_1_max_tem,
            '오늘최저온도': date_1_min_tem,
            **weekly_temperatures 
        })

    def get_result(self):
        if self.result:
            return self.result[-1]
        else:
            return None

def weather(location_id):
    try:
        crawler = GoogleWeather()
        crawler.set_keyword(location_id + '날씨')
        crawler.run()
        data = crawler.get_result()

        return data
    except Exception as e:
        print(f"An error occurred in weather function: {e}")
        return None