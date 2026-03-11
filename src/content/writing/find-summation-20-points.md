---
title: "Find Summation 20 оноо"
description: "## Өгөгдөл"
pubDatetime: 2016-09-22T00:00:00.000Z
tags: ["haruul-zangi", "writeup", "programming"]
draft: false
---

## Өгөгдөл

**Даалгаврын нэр:** Find Summation <br/>
**Хандах хаяг:** http://103.48.116.193:8005/ <br/>
**Тайлбар:** GET parameter=solution<br/>
**Оноо:** 20 оноо <br/>

---

Өгөгдсөн хаяг руу хандаж үзвэл тайлбар болон 1000 бүхэл тоонууд өгөгдсөн байна.

**Тайлбар:**

```
Та өгөгдсөн тоонуудын нийлбэрийг олно уу? GET['solution'] request авна 2 сек.
```

Манай баг өгөгдсөн даалгаварт зориулж [python](https://www.python.org) скрипт бичихээр шийдсэн.

```python filename="summ.py"
import urllib2
from decimal import Decimal
import sys

response = urllib2.urlopen("http://103.48.116.193:8005/index.php?solution=1213")
cookie = response.info().getheader('Set-Cookie').split(" ")[0].replace(";", "")

buffer = []
for line in response:
    buffer.append(line)

for i in range(len(buffer)):
	if "<pre>" in buffer[i]:
		arr = buffer[i] + buffer[i+1]
arr = arr.replace("<br>", "").replace("<pre>", "").replace("</pre>", "").replace(" ", "").replace("\t", "").replace("\n", "")
numbers = arr.split(",")

summation = sum(Decimal(i) for i in numbers)
print "niilber: " + str(summation)

content = urllib2.urlopen(urllib2.Request("http://103.48.116.193:8005/index.php?solution=" + str(summation), headers={'Cookie':cookie})).read()
print content
```

Бичсэн скрипт маань өгөгдсөн хаяг руу хандаж өгөгдлийг ялган авч нийлбэрийг олоод, сервер лүү `solution` параметрээр хүсэлт явуулж ирсэн хариуг хэвлэнэ.

Уг даалгаврыг хийхэд анхаарах ёстой нэг зүйл нь күүки байсан бөгөөд даалгаврын үеэр манай баг нэлээн будлиж эцэст нь учрыг олсон.

За скриптээ ажиллуулж үзье.

```
$ python summ.py
```

Ирсэн хариу:

<img width="843" alt="screenshot" src="https://cloud.githubusercontent.com/assets/14227502/18751846/1b273804-8113-11e6-8062-9d3cd6bf1073.png">

```
...
Баяр хүргье. Flag is HZ{c0mput3r_sci3nc3_is_v3ry_c0mp3titiv3}
```

Эцэст нь туг: **HZ{c0mput3r_sci3nc3_is_v3ry_c0mp3titiv3}**
