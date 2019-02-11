"use strict";

(() => {
  const listContainer = document.querySelector("main");

  function getData(url) {
    return new Promise((resolve, reject) => {
      const apiReq = new XMLHttpRequest();
      apiReq.addEventListener("load", resolve);
      apiReq.open("GET", url);
      apiReq.send();
    });
  }

  // Initializer
  getData("https://api.otreeba.com/v1/seed-companies").then(e => {
    let data = JSON.parse(e.target.responseText).data;
    let meta = JSON.parse(e.target.responseText).meta;

    console.log(data)
    data.forEach(d => {
      let extension = d.image.split(".")
      extension = extension[extension.length - 1];
      if (extension == "com") {
        d.image = "https://www.unesale.com/ProductImages/Large/notfound.png";
      }

      listContainer.innerHTML += `
        <article>
          <h1>${d.name}</h1>
          <div style="background-image: url(${d.image})"></div>
        </article>`
    })
  })
})();
