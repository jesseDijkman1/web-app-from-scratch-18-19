"use strict";

function getData(url) {
  return new Promise((resolve, reject) => {
    let apiReq = new XMLHttpRequest();
    apiReq.addEventListener("load", resolve);
    apiReq.open("GET", url);
    apiReq.send();
  });
}

// Initializer
getData("https://api.otreeba.com/v1/flowers").then(e => {
  console.log(JSON.parse(e.target.responseText))
}).catch(e => console.log(e))
