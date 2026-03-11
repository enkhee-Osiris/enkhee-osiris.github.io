---
title: "Prime Number 40 оноо"
description: "## Өгөгдөл"
pubDatetime: 2016-09-22T00:00:00.000Z
tags: ["haruul-zangi", "writeup", "programming"]
draft: false
---

## Өгөгдөл

**Даалгаврын нэр:** Prime Number <br/>
**Хандах хаяг:** http://103.48.116.193:8006/ <br/>
**Оноо:** 40 оноо <br/>

---

Өгөгдсөн хаяг руу хандаж үзвэл [Find-Summation](https://enkhee-osiris.github.io/information-security/2016/09/22/Find-Summation-20-оноо)-тэй адилхан даалгавар бөгөөд ялгаа нь гэвэл 10000 тоо өгөгдсөн бөгөөд тоо тус бүрийн хамгийн бага анхны тоон хуваагчдийн нийлбэрийг олох даалгавар байлаа.

Өмнө бичсэн скриптээ бага зэрэг өөрчилье.

```python filename="prime-number.py"
import urllib2
import math
import sys

def min_prime(n):
	for i in range(2, int(math.sqrt(n) + 1)):
		if n % i == 0:
			return i
			break
	return n

response = urllib2.urlopen("http://103.48.116.193:8006/index.php")
cookie = response.info().getheader('Set-Cookie').split(" ")[0].replace(";", "")
buffer = []
prime_numbers = []

for line in response:
    buffer.append(line)

for i in range(len(buffer)):
	if "<pre>" in buffer[i]:
		arr = buffer[i] + buffer[i+1]
arr = arr.replace("<br>", "").replace("<pre>", "").replace("</pre>", "").replace(" ", "").replace("\t", "").replace("\n", "")
numbers = arr.split(",")

for number in numbers:
	prime_numbers.append(min_prime(int(number)))

summ = sum(prime_numbers)
print "niilber: " + str(summ)

content = urllib2.urlopen(urllib2.Request("http://103.48.116.193:8006/index.php?solution=" + str(summ), headers={'Cookie':cookie})).read()
print content
```

За скриптээ ажиллуулъя.

```
$ python prime-number.py
```

Ирсэн хариу:
<img width="835" alt="screenshot" src="https://cloud.githubusercontent.com/assets/14227502/18752570/69acfc96-8115-11e6-86af-02a853719a94.png">

```
...
Баяр хүргье. Flag is HZ{y0u_f0und_this_s3cr3t_d@t@}
```

Эцэст нь туг: **HZ{y0u_f0und_this_s3cr3t_d@t@}**
