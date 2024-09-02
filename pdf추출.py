from PyPDF2 import PdfReader
import os
import csv

# 파일만 받아서 넣으면 csv 에 자동적으로 측정되게 설정


directory = "유가"

files = []

dict = {}

for filename in os.listdir(directory):
    if (os.path.isfile(os.path.join(directory, filename))):
        files.append(os.path.join(directory, filename))
    

for path in files:
    reader = PdfReader(path)

    pages = reader.pages

    text = ""

    l = []


    for page in pages:
        sub = page.extract_text()
        l.append(sub)
            
    use = l[0]

    ll = use.split()
        
    for i in range(len(ll)):
        if ( ll[i] == "경유"):
            for j in range(10):
                if (ll[i+j] == "원/ℓ"):
                    dict[path.split("_")[-1].split(".")[0]] = ll[i+j-1].replace(",", "")
            break
        
csv_file_path = "유가.csv"

with open(csv_file_path, "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=dict.keys())
    
    writer.writeheader()
    
    writer.writerow(dict)
     
     
print("성공")