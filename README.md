# Jesse Dijkman - Web App from scratch (2019)

## Table of Contents

---

# Code
```js
function getData(url) {
  return new Promise((resolve, reject) => {
    let apiReq = new XMLHttpRequest();
    apiReq.addEventListener("load", resolve)
    apiReq.open("GET", url);
    apiReq.send();
  })
}
```
