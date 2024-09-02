import requests
from bs4 import BeautifulSoup
import os

url = "https://www.opinet.co.kr/user/ofdoptd/getOfdoptdSelect.do"

response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

for link in soup.find_all('a'):
    href = link.get('href')
    print(href)
    
    if href and href.endswith(".pdf"):
        pdf_url = url + href if href.startswith("/") else href
        
        pdf_response = requests.get(pdf_url)
        
        pdf_filename = os.path.basename(href)
        
        with open(pdf_filename, "wb") as pdf_file:
            pdf_file.write(pdf_response.content)
            
        print("완료")