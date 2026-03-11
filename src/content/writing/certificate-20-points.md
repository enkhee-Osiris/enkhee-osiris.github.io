---
title: "Certificate 20 оноо"
description: "## Өгөгдөл"
pubDatetime: 2016-09-20T00:00:00.000Z
tags: ["haruul-zangi", "writeup", "misc"]
draft: false
---

## Өгөгдөл

**Даалгаврын нэр:** Certificate <br/>
**Оноо:** 20 оноо <br/>
**Файл:** certificate.p12, password.txt

---

Certificate.p12 файл руу ssl ээр хандаж үзье.

```
$ openssl pkcs12 -in certificate.p12 -nokeys -nomacver
```

![out](https://cloud.githubusercontent.com/assets/14227502/18668293/25d7c26c-7f67-11e6-99b5-e19bc313ec98.jpg)

`password.txt` хоосон байсан бөгөөд нууц үг дээр **password** гэж хийсэн.

Гаралтаас тугийг CommonName гэж эхэндээ бодсон боловч `Name: certificateusage` гэдгээс туг болохыг мэдсэн.

Эцэст нь туг: **HZ{certificateusage}**
