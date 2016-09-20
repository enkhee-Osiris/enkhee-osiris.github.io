---
layout: post
category : information-security
cover: https://cloud.githubusercontent.com/assets/14227502/18668223/d4695e4a-7f66-11e6-9330-6fb72106de4b.jpg
tags : [haruul-zangi, writeup, misc]
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

``password.txt`` хоосон байсан бөгөөд нууц үг дээр **password** гэж хийсэн.

Гаралтаас тугийг CommonName гэж эхэндээ бодсон боловч ``Name: certificateusage`` гэдгээс туг болохыг мэдсэн. 

Эцэст нь туг: **HZ{certificateusage}**

