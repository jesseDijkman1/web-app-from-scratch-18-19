"use strict";

function getData(url) {
  return new Promise((resolve, reject) => {
    const apiReq = new XMLHttpRequest();
    apiReq.addEventListener("load", resolve);
    apiReq.open("GET", url);
    apiReq.send();
  });
}

function checkImage(path) {
  let extension = path.split(".");
  extension = extension[extension.length - 1];

  if (extension == "com") {
    path = "https://www.unesale.com/ProductImages/Large/notfound.png";
  }
  return path;
}

// Source: https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);

  for (let prop in node.props) {
    // console.log(prop)
    if (prop == "style") {
      for (let css in node.props[prop]) {
        el.style[css] = node.props[prop][css];
      }
    } else {
      el.setAttribute(prop, node.props[prop])
    }
  }

  node.children
    .map(createElement)
    .forEach(el.appendChild.bind(el));

  return el;
}

// Render the home page with content
function pageHome() {
  const listContainer = document.getElementById("list");

  // Initializer
  getData("https://api.otreeba.com/v1/seed-companies").then(e => {
    const data = JSON.parse(e.target.responseText).data;
    const meta = JSON.parse(e.target.responseText).meta;

    // console.log(data)

    data.forEach(d => {
      d.image = checkImage(d.image);

      const template = {
        type: "ARTICLE", props: {"data-ocpc": d.ocpc}, children: [
          {type: "H1", props: {}, children: [d.name]},
          {type: "DIV", props: {style: {"backgroundImage": `url(${d.image})`}}, children: [""]}
        ]
      }

      let el = listContainer.appendChild(createElement(template));

      el.addEventListener("click", async () => {
        let detailData = data.find(d2 => d2.ocpc == el.dataset.ocpc);

        // Replace the strains with the actual data of the strains
        await getData(`https://api.otreeba.com/v1/seed-companies/${detailData.ocpc}/strains`).then(strainData => {
          detailData.strains = JSON.parse(strainData.target.responseText).data;
        })

        localStorage.setItem("weedAppLastDetail", JSON.stringify(detailData));

        window.location.replace(`file:///Users/jesse/Dropbox/webDevMinor/web-app-from-scratch-18-19/weedApp/index.html#detail`);
      });
    });
  });
};

// Render the detail page with detailed content
async function pageDetail() {
  console.log("now on detail")
  const detailContainer = document.getElementById("detail");

  const data = JSON.parse(localStorage.getItem("weedAppLastDetail"));
  console.log("ok", data)
  const template = {
    type: "ARTICLE", props: {"data-ocpc": d.ocpc}, children: [
      {type: "H1", props: {}, children: [d.name]},
      {type: "DIV", props: {style: {"backgroundImage": `url(${d.image})`}}, children: [""]}
    ]
  }

  // let el = listContainer.appendChild(createElement(template));
}

// Render the error page for when a page is not found
function pageNotFound() {
  console.log("not found")
}
