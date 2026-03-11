---
title: "Hexor 40 оноо"
description: "## Өгөгдөл"
pubDatetime: 2016-09-20T00:00:00.000Z
tags: ["haruul-zangi", "writeup", "forensic"]
draft: false
---

## Өгөгдөл

**Даалгаврын нэр:** Hexor <br/>
**Оноо:** 40 оноо <br/>
**Файл:** image.hex

Файлыг ямар нэгэн эдитор ашиглан нээж үзвэл hex код харагдана.

<img width="700" alt="screen" src="https://cloud.githubusercontent.com/assets/14227502/18659409/08935006-7f3d-11e6-970c-68baf2625f84.png">

Эдгээр өгөгдлөөс зөвхөн хэксийг ялган авахын тулд python script бичье.

```python filename="hex-to-png.py"
import urllib2
import sys
import binascii

f = open('../image.hex','r')

lines =  f.readlines()
data = ""
for line in lines:
	data += line[10:58]

data = data.replace(" ", "")
print data

fw = open("../img.png", "w+")
fw.write(binascii.unhexlify(data))
```

Ажиллуулахын тулд өгөгдсөн `image.hex` файлыг script-н гадна талын хавтсанд хийнэ.

```
$ python hex-to-png.py
```

Python script ялгаж авсан хэксээ хэвлээд `img.png` файлыг үүсгэнэ.

Үүссэн файлыг нээж харвал
![img](https://cloud.githubusercontent.com/assets/14227502/18659515/bb85a1f0-7f3d-11e6-9493-2fcbfcf3843d.png)
тугыг харуулсан зураг байна.

Эцэст нь туг: **HZ{11001011_flag_01001011}**
