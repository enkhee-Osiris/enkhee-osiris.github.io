---
title: "Plainscript 20 оноо"
description: "## Өгөгдөл"
pubDatetime: 2016-09-20T00:00:00.000Z
tags: ["haruul-zangi", "writeup", "web"]
draft: false
---

## Өгөгдөл

**Даалгаврын нэр:** Plainscript <br/>
**Хандах хаяг:** http://103.48.116.193:8003/ <br/>
**Оноо:** 20 оноо

---

Өгөгдсөн хаяг руу хандвал [JSFuck](http://jsfuck.com) ашиглан энкод хийсэн javascript-г харж болно.

Үүнийг дэкод хийхийн тулд би өөрийн өмнө хийж байсан онлайн дэкодэроо ашиглахаар шийдэв. [Линк](https://enkhee-osiris.github.io/Decoder-JSFuck/)

Өгөгдсөн скриптийг хуулж дэкод хийвэл

```javascript filename="out.js"
alert(
  'JSFuck is an esoteric and educational programming style based on the atomic parts of JavaScript. It uses only six different characters to write and execute code.  It does not depend on a browser, so you can even run it on Node.js.  Use the form below to convert your own script. Uncheck "eval source" to get back a plain string.'
);
if (true) {
  console.log("HZ{JS00JS00JS}");
}
```

дээрх javascript харагдана. Үүнээс тугийг харж болно.

```
if(true){console.log('HZ{JS00JS00JS}')}
```

Эцэст нь туг: **HZ{JS00JS00JS}**
