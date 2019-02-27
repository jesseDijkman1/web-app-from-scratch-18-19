"use strict";

import {createElement, templates} from "./modules/templater.js"

const urls = {
  characters: "https://rickandmortyapi.com/api/character",
  episodes: "https://rickandmortyapi.com/api/episode"
}

const app = {
  init: () => {
    let hash = window.location.hash || undefined;

    if (!hash) {
      window.location.hash = "#home/characters/1"
    }
  },
  changeHash: newHash => window.location.hash = newHash
}

const router = {
  home: async (category, page) => {
    let data;
    try {
      data = await api.tryFind(category, page)
    } catch(notFound) {
      try {
        data = await api.get(`${urls[category]}/?page=${page}`, page)
      } catch(err) {
        render.error(404, "Page not found")
      }
    }
    console.log(data)

    data = await filterData[category](data);
    await storeData.list(category, page, data);

    render.list(category, data)
  },
  detail: async (category, id) => {
    console.log(category, id)
    let data;

    try {
      data = await api.findDetail(category, id)
    } catch(notFound) {
      try {
        data = await api.get(`${urls[category]}/${id}`)
      } catch(err) {
        render.error(404, "Character not found")
      }
    }

    data = await filterData[category](data);
    await storeData.detail(category, id, data);

    render.detail(category, data)
    // api.findDetail(category, id)
    //   .then()
  }
}

const api = {
  currentPage: null,
  tryFind: (category, page) => {
    this.currentPage = page;
    console.log("Getting data from storage")
    return new Promise((resolve, reject) => {
      const storageData = JSON.parse(sessionStorage.getItem(`${category}_${page}`));

      if (!storageData) {
        reject()
      } else {
        resolve(storageData)
      }
    })
  },
  get: function(url, page = null) {
    this.currentPage = page;
    console.log("IDKaowiejf")
    // url += `/?page=${page}`;

    console.log(url)
    console.log("Getting data from api")
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", url);

      xhr.addEventListener("load", res => {
        const data = JSON.parse(res.target.responseText).results || JSON.parse(res.target.responseText);
        resolve(data)
      });

      xhr.addEventListener("error", reject);
      xhr.send();

    });
  },
  findDetail: function(category, id) {
    return new Promise((resolve, reject) => {
    let singleData = JSON.parse(sessionStorage.getItem(`${toSingular(category)}_${id}`));
    console.log(singleData)
    if (!singleData) {
      console.log("ofiajw allaha")
      if (!this.currentPage) {
        console.log("oiwajfe 309250")
        reject()
      }

      let data = JSON.parse(sessionStorage.getItem(`${category}_${this.currentPage}`));
      data = data.find(d => d.id == id);
      console.log(data)
      if (!data) {

        reject()
      } else {
        resolve(data)
      }

    } else {
      console.log("tesetein")
      resolve(singleData);
    }
    })
  }
}


function toSingular(str) {
  return str.substring(0, str.length - 1)
}

const render = {
  mainEl: document.querySelector("main"),
  list: function(category, data) {
    this.mainEl.innerHTML = "";

    data.forEach(d => {

      const element = createElement(templates[category](d));

      element.addEventListener("click", () => app.changeHash(`#detail/${category}/${d.id}`));

      this.mainEl.appendChild(element)
    })
  },
  detail: function(category, data) {
    this.mainEl.innerHTML = "";

    const element = createElement(templates[toSingular(category)](data));

    this.mainEl.appendChild(element)
    console.log(data)
  },
  error: function(errorCode, msg) {
    this.mainEl.innerHTML = "";

    const element = createElement(templates.error(errorCode.toString(), msg))

    this.mainEl.appendChild(element)
  }
}

const filterData = {
  characters: (data) => {

    function dataStructure(d) {
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
    }

    if (!data.length) {
      return dataStructure(data)
    } else {
      return data.map(dataStructure)
    }

  },
  episodes: (data) => {

    return data.map(d => {
      return {
        id: d.id,
        name: d.name,
        episode: d.episode,
        air_date: d.air_date,
        characters: d.characters
      }
    })
  }
}

// function storeData(category, page, data) {
//
//   sessionStorage.setItem(`${category}_${page}`, JSON.stringify(data))
// }

const storeData = {
  list: (category, page, data) => {
    sessionStorage.setItem(`${category}_${page}`, JSON.stringify(data))
  },
  detail: (category, id, data) => {
    sessionStorage.setItem(`${toSingular(category)}_${id}`, JSON.stringify(data))
    // sessionStorage
  }
}

routie({
  "home/:category/:page": (category, page) => {
    console.log("in routie", category, page)
    router.home(category, page)
  },
  "detail/:category/:id": (category, id) => {
    console.log("hash changed")
    router.detail(category, id)
  }
})

app.init()
