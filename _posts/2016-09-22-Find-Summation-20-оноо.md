---
layout: post
category : information-security
cover: https://cloud.githubusercontent.com/assets/14227502/18751819/fec293e8-8112-11e6-9bc9-51bb0ad9e48e.jpg
tags : [haruul-zangi, writeup, programming]
---
## Өгөгдөл
**Даалгаврын нэр:** Find Summation <br/>
**Хандах хаяг:** http://103.48.116.193:8005/ <br/>
**Тайлбар:**  GET parameter=solution<br/>
**Оноо:** 20 оноо <br/>

---
Өгөгдсөн хаяг руу хандаж үзвэл тайлбар болон 1000 бүхэл тоонууд өгөгдсөн байна.

**Тайлбар:**

```
Та өгөгдсөн тоонуудын нийлбэрийг олно уу? GET['solution'] request авна 2 сек.
```
Манай баг өгөгдсөн даалгаварт зориулж [python](https://www.python.org) скрипт бичихээр шийдсэн.

{% gist 6acdaf7f48d64c42efbb95c7b34ed8ba %}

Бичсэн скрипт маань өгөгдсөн хаяг руу хандаж өгөгдлийг ялган авч нийлбэрийг олоод, сервер лүү ``solution`` параметрээр хүсэлт явуулж ирсэн хариуг хэвлэнэ.

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