---
title: "BTTF 40 оноо"
description: "## Өгөгдөл"
pubDatetime: 2016-09-20T00:00:00.000Z
tags: ["haruul-zangi", "writeup", "web"]
draft: false
---

## Өгөгдөл

**Даалгаврын нэр:** Back To The Future <br/>
**Хандах хаяг:** http://103.48.116.193:8004/ <br/>
**Тайлбар:** Өнгөрсөн, одоо, ирээдүй 3 цагт аялж 7 хоногийн аль өдөрт очсоноо хэлээрэй. Нэгэнт та цаг хугацаагаар аялж чадаж байгаа тул 2 секундын дотор мэдээллээ оруулна уу. /Та грегорийн тооллоор өдрийг тодорхойлон гарагийн нэрийг оруулна уу. Жнь: даваа ... г.м/ <br/>
**Оноо:** 40 оноо

---

Өгөгдсөн хаяг руу хандвал өнгөрсөн, одоо, ирээдүйн 3-н өдрийг харуулсан байна. Тайлбар дээр өгөгдсөнөөр эдгээр өдрүүд 7-н хоногийн хэд дэх өдөр байсныг олох даалгавар бололтой.

Энэ даалгаврыг шийдэхийн тулд python скрипт бичихээр шийдлээ.

```python filename="back-future.py"
# -*- coding: utf-8 -*-
import urllib2
import urllib
import sys
from datetime import datetime
from bs4 import BeautifulSoup

def week_to_string(n):
	if n == 0:
		return 'даваа'
	elif n == 1:
		return 'мягмар'
	elif n == 2:
		return 'лхагва'
	elif n == 3:
		return 'пүрэв'
	elif n == 4:
		return 'баасан'
	elif n == 5:
		return 'бямба'
	elif n == 6:
		return 'ням'

response = urllib2.urlopen("http://103.48.116.193:8004/index.php")
cookie = response.info().getheader('Set-Cookie').split(" ")[0].replace(";", "")

soup = BeautifulSoup(response.read(),'html.parser')

past = []
now = []
future = []

times = ['past', 'now', 'future']
for time in times:
	for item in soup.find_all('span', attrs={'class' : time}):
		if time == 'past':
			past.append(item.string)
		elif time == 'now':
			now.append(item.string)
		else:
			future.append(item.string)

ongorson = week_to_string(datetime.strptime(past[0] + ' ' + past[1] + ' ' + past[2], '%b %d %Y').weekday())
odoo = week_to_string(datetime.strptime(now[0] + ' ' + now[1] + ' ' + now[2], '%b %d %Y').weekday())
ireedui = week_to_string(datetime.strptime(future[0] + ' ' + future[1] + ' ' + future[2], '%b %d %Y').weekday())

print ongorson + ' ' + odoo +  ' ' + ireedui

data = urllib.urlencode({'past' : ongorson, 'now'  : odoo, 'future' : ireedui})
req = urllib2.Request("http://103.48.116.193:8004/check.php", data, headers={'Cookie':cookie})

content = urllib2.urlopen(req).read()

print content
```

Скриптээ ажиллуулъя

```
$ python back-future.py
```

скрипт ажиллаж 3 өдрийг хэд дэх гариг болохыг хэвлээд серверээс ирж байгаа хариуг хэвлэнэ.

Хариуг харвал `chi martygaas tuslamj avch chadjee token is YOUREMEETMARTYMCFLY` гэсэн байна.

Эцэст нь туг: **HZ{YOUREMEETMARTYMCFLY}**
