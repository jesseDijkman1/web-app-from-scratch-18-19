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

  function checkImage(path) {
    let extension = path.split(".")
    extension = extension[extension.length - 1];

    if (extension == "com") {
      path = "https://www.unesale.com/ProductImages/Large/notfound.png";
    }
    return path;
  }

  function renderContent(parent, template, data) {
    let reg = /(?<=\{{2})(.*?)(?=\}{2})/g;
    // let el;
    // let el = document.createElement(template.element);
    for (let test in template) {
      let el;

      if (test == "element") {
        el = document.createElement(template[test]);
      }
      if (Object.entries(template[test]).length) {
        console.log(test, template[test])
      }
    }

    // console.log(test)
  }

  // function elementCreator() {
  //
  // }

// Sourcs: https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);

  for (let prop in node.props) {
    if (prop == "style") {
      for (let css in node.props[prop]) {
        el.style[css] = node.props[prop][css];
      }
    }
  }

  node.children
    .map(createElement)
    .forEach(el.appendChild.bind(el));

  return el;
}

  // Initializer
  getData("https://api.otreeba.com/v1/seed-companies").then(e => {
    let data = JSON.parse(e.target.responseText).data;
    let meta = JSON.parse(e.target.responseText).meta;


    data.forEach(d => {
      d.image = checkImage(d.image);

      let template = {
        type: "ARTICLE", props: {}, children: [
          {type: "H1", props: {}, children: [d.name]},
          {type: "DIV", props: {style: {"backgroundImage": `url(${d.image})`}}, children: [""]}
      ]
    }

    listContainer.appendChild(createElement(template));
  })
})();
