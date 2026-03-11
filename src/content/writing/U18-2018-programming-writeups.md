---
title: "U18 2018 programming writeups"
description: "Өдрийн мэнд. Энэ жилийн U18-д ирсэн зарим даалгавруудын writeup-уудыг хүргэж байна."
pubDatetime: 2018-04-22T00:00:00.000Z
tags: ["haruul-zangi", "u18"]
draft: false
---

Өдрийн мэнд. Энэ жилийн U18-д ирсэн зарим даалгавруудын **writeup**-уудыг хүргэж байна.
ХаруулЗангиас тухайн шат дууссаны дараа вэб серверүүдээ шууд унтраадаг учраас тэдгээр даалгавруудыг л
хийлээ, бусад даалгавруудыг өөрсдөө [энд](https://github.com/enkhee-Osiris/u18-2018)ээс хийж үзээрэй.

## Math (40pts)

**Хандах хаяг:** http://218.100.84.112:9091  
**Оноо:** 40 оноо  
**Зохиосон:** Ds3C

---

Өгөгдсөн вэб хуудсыг доорх зурагт үзүүлэв.

<img width="843" alt="screenshot" src="https://user-images.githubusercontent.com/14227502/39091891-6374ab20-4631-11e8-8a5e-b4ebde41a860.png">

Уг даалгаварт 3 тоо өгөгдсөн бөгөөд, тэдгээрийг ашиглан математик илэрхийлэл бодох ёстой байв.
Гэвч нэг асуудал байгаа бөгөөд тоо тус бүрийг [md5](https://en.wikipedia.org/wiki/MD5)-аар хаш хийсэн байна, бодлогыг бодохын тулд тоо тус бүрийг олох ёстой. Тоонууд хэрэв 0 - 1000 дотор байвал **dictionary** үүсгэж болох хэдий ч би онлайн апи (http://md5decrypt.net/en/Api/) ашиглахаар шийдлээ.

> Уг **api**-г ашиглахын тулд мэйлээрээ бүртгүүлж нууц код авдаг юм билээ.  
> Дараа нь мэйл болон нууц кодоо ашиглан **get** хүсэлт явуулж ашиглах боломжтой.

```python filename="lol.py"
import requests
import re

response = requests.get("http://218.100.84.112:9091/")
cookie = response.cookies['PHPSESSID']

numbers = re.findall(r'[A-C]\=[a-f0-9]+', response.text)

a = requests.get("http://md5decrypt.net/Api/api.php?hash=" + numbers[0].split('=')[1] + "&hash_type=md5&email=mixonunu@2ether.net&code=bf5af2048b5656bc").text
b = requests.get("http://md5decrypt.net/Api/api.php?hash=" + numbers[1].split('=')[1] + "&hash_type=md5&email=mixonunu@2ether.net&code=bf5af2048b5656bc").text
c = requests.get("http://md5decrypt.net/Api/api.php?hash=" + numbers[2].split('=')[1] + "&hash_type=md5&email=mixonunu@2ether.net&code=bf5af2048b5656bc").text

answer = (int(a) * int(b)) / int(c)
print "Answer is: " + str(answer)

r = requests.post("http://218.100.84.112:9091/", data={'answer':int(answer), 'sum':int(answer)}, headers={'Cookie': 'PHPSESSID=' + cookie})
# print r.text[0:100]
flag = re.search(r'HZU18\{\S+\}', r.text)
if flag:
  print "FLAG IS: " + flag.group(0)

```

> Note: `pip install requests`

```
Туг: HZU18{S1mPl3_M4th}
```

## Sum Part 2 (50pts)

**Хандах хаяг:** http://218.100.84.112:9090  
**Оноо:** 50 оноо  
**Зохиосон:** Ds3C

---

Өгөгдсөн вэб хуудсыг доорх зурагт үзүүлэв.

<img width="843" alt="screenshot" src="https://user-images.githubusercontent.com/14227502/39091920-f5659102-4631-11e8-837f-3b2da95f3fae.png">

Уг даалгаварт маш олон тоонууд өгөгдсөн бөгөөд тэдгээрийн нийлбэрийг олж **POST** хүсэлт
явуулах ёстой байв. Хэрэв 2 жилийн өмнөх харуул зангийн даалгавруудыг санаж байвал төстэй нэгэн даалгавар байгаа.

> Regex ашиглан тоонуудыг олоод, нийлбэрийг олно.  
> Нийлбэрийг илгээхдээ өмнөх **cookie**-гээ ашиглах ёстой.

```python filename="sum.py"
import re
from decimal import Decimal
import requests

response = requests.get("http://218.100.84.112:9090/")
cookie = response.cookies['PHPSESSID']

numbers = re.findall(r'\d+\s\,', response.text)

summation = sum(Decimal(i.replace(' ,', '')) for i in numbers)
print "Niilber: " + str(summation)

r = requests.post("http://218.100.84.112:9090/", data={'answer':int(summation),'sum': int(summation)}, headers={'Cookie': 'PHPSESSID=' + cookie})
flag = re.search(r'HZU18\{{1}\S+\}{1}', r.text)
if flag:
    print "FLAG IS: " + flag.group(0)

```

> Note: `pip install requests`

```
Туг: HZU18{M4th_Kill3r}
```
