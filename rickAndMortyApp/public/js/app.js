"use strict";

window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.location.hash = "#home/1";
  }
})

const urls = {
  characters: "https://rickandmortyapi.com/api/character/"
}

const router = {
  home: (page) => {
    api.get(`${urls.characters}?page=${page}`)
      .then(data => {
        render.home(JSON.parse(data.target.responseText))
      })
  },
  detail: (id) => {
    console.log(id)
  }
}

const api = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      const apiReq = new XMLHttpRequest();
      apiReq.open("GET", url);
      apiReq.addEventListener("load", resolve);
      apiReq.send();
    });
  }
}

const render = {
  create: (node) => {
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
      .map(render.create)
      .forEach(elChild => el.appendChild(elChild));

    return el;
  },
  home: function(data) {
    const main = document.querySelector("main");

    data.results.forEach((d, i) => {
      const template = {
          type: "ARTICLE", props: {"data-charId": d.id}, children: [
            {type: "H1", props: {}, children: [d.name]},
            {type: "IMG", props: {src: d.image}, children: [""]}
          ]
        }

      const element = render.create(template);

      element.addEventListener("click", () => {
        window.location.hash = `#detail/${i}`;
      })

      main.appendChild(element)
    })

  }
}


routie({
  "home/:page": (page) => {
    router.home(page)
  },
  "detail/:id": (id) => {
    router.detail(id)
  }
})
