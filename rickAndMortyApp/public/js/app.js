"use strict";

import {createElement, templates} from "./modules/templater.js"

const urls = {
  characters: "https://rickandmortyapi.com/api/character/"
}

const app = {
  init: () => {
    if (!window.location.hash || window.location.hash == "#home") {
      // page 1 and 2 give the same data
      window.location.hash = "#home/1"
    }
  },
  changeHash: newHash => window.location.hash = newHash
}

const router = {
  home: page => {
    api.get(`${urls.characters}?page=${page}`, page)
      .then(data => render.home(data))
      .catch(error => console.log(error))
  },
  detail: (id) => {
    console.log(id)
  }
}

const api = {
  get: (url, page) => {
    return new Promise((resolve, reject) => {
      const storageData = sessionStorage.getItem(`listData_${page}`);
      console.log(url, page)

      if (storageData) {
        console.log("Connection with sessionStorage")

        resolve(JSON.parse(storageData))
      } else {

      console.log("Connection with api")

      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.addEventListener("load", res => {
        const listData = JSON.parse(res.target.responseText).results;

        sessionStorage.setItem(`listData_${page}`, JSON.stringify(listData));
        resolve(listData)
      });
      xhr.addEventListener("error", reject);
      xhr.send();
      }
    });
  }
}

const render = {
  home: (data) => {
    const main = document.querySelector("main");
    main.innerHTML = "";

    data.forEach(d => {

      const element = createElement(templates.home(d));

      element.addEventListener("click", () => app.changeHash(`#detail/character/${d.id}`));

      main.appendChild(element)
    })
  }
}

routie({
  "home/:page": (page) => {
    router.home(page)
  },
  "detail/character/:id": (id) => {
    router.detail(id)
  }
})

app.init()
