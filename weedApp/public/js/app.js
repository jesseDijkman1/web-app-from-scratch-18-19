"use strict";

// Pass a url to this function and it returns the data
function getData(url) {
  return new Promise((resolve, reject) => {
    const apiReq = new XMLHttpRequest();
    apiReq.addEventListener("load", resolve);
    apiReq.open("GET", url);
    apiReq.send();
  });
}

// Some image urls end in com, this function check for them and replaces them
function checkImage(path) {
  let extension = path.split(".");
  extension = extension[extension.length - 1];

  if (extension == "com") {
    path = "https://www.unesale.com/ProductImages/Large/notfound.png";
  }
  return path;
}

// Loader is supposed to prevent the API from crashing because of the unknown ratelimit
function loader(cond) {
  const loaderOverlay = document.getElementById("loader-overlay");

  if (cond) {
    loaderOverlay.classList.add("loading");
  } else {
    setTimeout(() => loaderOverlay.classList.remove("loading"), 1000);
  }
}

// Source: https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);

  for (let prop in node.props) {
    if (prop == "style") {
      for (let css in node.props[prop]) {
        el.style[css] = node.props[prop][css];
      }
    } else {
      el.setAttribute(prop, node.props[prop]);
    }
  }

  node.children
    .map(createElement)
    .forEach(elChild => el.appendChild(elChild));

  return el;
}

// Render the home page with content
function pageHome() {
  const listContainer = document.getElementById("list"),
        detailPage = document.querySelector("#detail section");

  // If there's a detail section remove it when on #home
  if (detailPage) {
    detailPage.remove();

    // The else is to prevent generating the list when not needed
  } else {

  loader(true);

  // Request data from API
  getData("https://api.otreeba.com/v1/seed-companies").then(e => {
    const data = JSON.parse(e.target.responseText).data,
          meta = JSON.parse(e.target.responseText).meta; // Might be useful later

    data.forEach(d => {
      d.image = checkImage(d.image);

      // Create a template which createElement() can use
      const template = {
        type: "ARTICLE", props: {"data-ocpc": d.ocpc}, children: [
          {type: "H1", props: {}, children: [d.name]},
          {type: "DIV", props: {style: {"backgroundImage": `url(${d.image})`}}, children: [""]}
        ]
      }

      const el = listContainer.appendChild(createElement(template));

      el.addEventListener("click", () => {
        const detailData = data.find(d2 => d2.ocpc == el.dataset.ocpc);

        // Replace the strains with the actual data of the strains
        getData(`https://api.otreeba.com/v1/seed-companies/${detailData.ocpc}/strains`).then(strainData => {
          detailData.strains = JSON.parse(strainData.target.responseText).data;

          // Set the detail data in localStorage so the detail route can use it
          localStorage.setItem("weedAppLastDetail", JSON.stringify(detailData));

          // Change the hash
          window.location.replace(`file:///Users/jesse/Dropbox/webDevMinor/web-app-from-scratch-18-19/weedApp/index.html#detail`);
        });
      });
    });

    loader(false);
  });
  }
};

// Render the detail page with detailed content
function pageDetail() {
  const detailContainer = document.getElementById("detail"),
        data = JSON.parse(localStorage.getItem("weedAppLastDetail"));

  // Function for generating a random/(given) number of objects
  function generator(ds) {
    ds.image = checkImage(ds.image);

    return {type: "LI", props: {}, children: [
      {type: "DIV", props: {style: {"backgroundImage": `url(${ds.image})`}}, children: [""]},
      {type: "P", props: {}, children: [ds.name]}
    ]}
  }

  // Create a template which createElement() can use
  const template = {
    type: "SECTION", props: {id: "detail"}, children: [
      {type: "BUTTON", props: {id: "closeDetailBtn"}, children: ["X"]},
      {type: "H1", props: {}, children: [data.name]},
      {type: "DIV", props: {style: {"backgroundImage": `url(${data.image})`}}, children: [""]},
      {type: "UL", props: {}, children: data.strains.map(generator)}
    ]
  }

  detailContainer.appendChild(createElement(template));

  document.body.classList.add("showDetail");

  // Select closeDetailBtn after it has been appended to the html
  const closeDetailBtn = document.getElementById("closeDetailBtn");

  closeDetailBtn.addEventListener("click", () => {
    document.body.classList.remove("showDetail");

    loader(true);

    // Wait for the animation to end
    setTimeout(() => {
      window.location.replace(`file:///Users/jesse/Dropbox/webDevMinor/web-app-from-scratch-18-19/weedApp/index.html#home`);

      loader(false);
    }, 300);
  });
}

// Render the error page for when a page is not found
function pageNotFound() {
  alert("404 - Page not found")
}
