"use strict";

import {createElement, templates} from "./modules/templater.js"

const urls = {
  characters: "https://rickandmortyapi.com/api/character/"
}

const app = {
  changeHash: newHash => window.location.hash = newHash
}

const router = {
  home: async (category, page) => {
    let data;

    try {
      data = await api.tryFind(category, page)
    } catch(notFound) {
      try {
        data = await api.get(urls[category], page)
      } catch(err) {
        throw err;
      }
    }

    data = await filterData.characters(data);
    data = await storeData.characters(data, page);

    render.home(data)
  },
  detail: (category, id) => {
    api.tryFind(category, id)
      .then(data => render.detail(data))
      .catch(error => console.log(error)) // Need to do something with the error
  }
}

const api = {
  currentPage: null,
  tryFind: (prefix, identifier) => {
    return new Promise((resolve, reject) => {
      const storageData = JSON.parse(sessionStorage.getItem(`${prefix}_${identifier}`));

      if (!storageData) {
        reject()
      } else {
        resolve(storageData)
      }
    })
  },
  get: function(url, page) {
    this.currentPage = page;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", url);

      xhr.addEventListener("load", res => {
        const data = JSON.parse(res.target.responseText).results;

        resolve(data)
      });

      xhr.addEventListener("error", reject);
      xhr.send();
    });
  },
  find: function(id) {
    return new Promise((resolve, reject) => {

      let data = JSON.parse(sessionStorage.getItem(`characters_${this.currentPage}`));
      data = data.find(d => d.id == id);
      console.log(data)
      // resolve(data);

      if (!data) {
        reject("cant find")
      }
    })



  }
}

const render = {
  mainEl: document.querySelector("main"),
  home: function(data) {
    this.mainEl.innerHTML = "";

    data.forEach(d => {

      const element = createElement(templates.home(d));

      element.addEventListener("click", () => app.changeHash(`#detail/character/${d.id}`));

      this.mainEl.appendChild(element)
    })
  },
  detail: function(data) {
    this.mainEl.innerHTML = "";

    const element = createElement(templates.detail(d));

    console.log(data)
  }
}

const filterData = {
  characters: (data) => {
    return data.map(d => {
        return {
          id: d.id,
          name: d.name,
          image: d.image,
          details: {
            species: d.species,
            gender: d.gender,
            location: d.location,
            origin: d.origin,
            status: d.status,
            type: d.type
          },
          episodes: d.episode
        }
    })
  }
}

const storeData = {
  characters: (data, page) => {
    sessionStorage.setItem(`characters_${page}`, JSON.stringify(data))

    return data
  }
}

// First load
routie("home/characters/1")

routie({
  "home/:category/:page": (category, page) => {
    router.home(category, page)
  },
  "detail/:category/:id": (category, id) => {
    router.detail(category, id)
  }
})

app.init()
