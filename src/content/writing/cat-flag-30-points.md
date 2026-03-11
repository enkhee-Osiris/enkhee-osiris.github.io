---
title: "cat flag 30 оноо"
description: "## Өгөгдөл"
pubDatetime: 2016-09-20T00:00:00.000Z
tags: ["haruul-zangi", "writeup", "misc"]
draft: false
---

## Өгөгдөл

**Даалгаврын нэр:** Cat Flag <br/>
**Тайлбар:** host: 103.48.116.193
port: 8001
user: cat
pass: catflag<br/>
**Оноо:** 30 оноо <br/>
**Файл:** flag.pgp, mr.robot.gif

---

Эхлээд [Secure Shell](https://en.wikipedia.org/wiki/Secure_Shell) ашиглаад сервер лүү холбогдъё.

```
$ ssh -p 8001 cat@103.48.116.193
```

Нууц үг: catflag

Үүний дараа `ls` хийж харвал `flag.txt` харагдана.

```
$ cat flag.txt
```

Хийтэл ажилласангүй тэгвэл `help` командыг ашиглаж харцгаая. Серверт python суусан байна тэгвэл скрипт бичиж үзэцгээе.

```
$ python -c 'print open("flag.txt","r").read()'
```

Тиймээ тугийг бидэнд хэвлэж өглөө `HZ{0101023234}`

Эцэст нь туг: **HZ{0101023234}**
