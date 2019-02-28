"use strict";

import {createElement, templates} from "./modules/templater.js"

const urls = {
  characters: "https://rickandmortyapi.com/api/character",
  episodes: "https://rickandmortyapi.com/api/episode"
}

const app = {
  init: () => {
    console.log("Init")
    let hash = window.location.hash || undefined;

    if (!hash) {
      window.location.hash = "#home/characters/1"
    }
  },
  changeHash: newHash => window.location.hash = newHash,
  loader: display => {
    document.getElementById("loader").style.display = display;
  }
}

const router = {

  home: async function(category, page) {
    app.loader("flex")
    console.log(category, page)

    let data;
    try {

      data = await api.tryFindList(category, page)
    } catch(notFound) {
      console.log("wtf happening")
      try {
        data = await api.get(`${urls[category]}/?page=${page}`, page)
        data = await filterData[category](data);
      } catch(err) {
        console.log("wtf happening")
        app.loader("none")
        return render.error(404, "Page not found")
      }
    }


    await storeData.list(category, page, data);
    await render.list(category, data)
    app.loader("none")
  },
  detail: async (category, id) => {
    app.loader("flex")
    let data;

    try {
      data = await api.tryFindDetail(category, id)
    } catch(notFound) {
      try {

        data = await api.get(`${urls[category]}/${id}`)
        data = await filterData[category](data);

      } catch(err) {
        app.loader("none")
        return render.error(404,  `${toSingular(category)} not found`)
      }
    }


    console.log("find", data)
    await storeData.detail(category, id, data);
    await render.detail(category, data)
    app.loader("none");
    // api.findDetail(category, id)
    //   .then()
  }
}

const api = {
  currentPage: null,
  tryFindList: function(category, page) {
    this.currentPage = page;
    console.log("Getting data from storage")
    return new Promise((resolve, reject) => {
      console.log(category, page)
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

    console.log("Getting data from api")
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", url);

      xhr.addEventListener("load", res => {
        const data = JSON.parse(res.target.responseText).results || JSON.parse(res.target.responseText);
        console.log("uuuuum", data)
        resolve(data)
      });

      xhr.addEventListener("error", () => {
        reject()
      });
      xhr.send();

    });
  },
  tryFindDetail: function(category, id) {
    return new Promise((resolve, reject) => {
    let singleData = JSON.parse(sessionStorage.getItem(`${toSingular(category)}_${id}`));

    if (!singleData) {
      if (!this.currentPage) {
        reject()
      }

      let data = JSON.parse(sessionStorage.getItem(`${category}_${this.currentPage}`));
      data = data.find(d => d.id == id);

      if (!data) {

        reject()
      } else {
        resolve(data)
      }

    } else {
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
  mainTitle: function(category) {
    let el = document.createElement("H1");
    let txt = document.createTextNode(`Rick and Morty - ${category}`)
    el.appendChild(txt)
    el.classList.add("main-title")

    this.mainEl.appendChild(el)
  },
  list: function(category, data) {
    this.mainEl.innerHTML = "";
    this.mainEl.className = "list";

    this.mainTitle(category)

    data.forEach(d => {

      const element = createElement(templates[category](d));

      element.addEventListener("click", () => app.changeHash(`#detail/${category}/${d.id}`));

      this.mainEl.appendChild(element)
    })
  },
  detail: function(category, data) {
    this.mainEl.innerHTML = "";
    this.mainEl.className = "detail";

    const element = createElement(templates[toSingular(category)](data));

    this.mainEl.appendChild(element)
  },
  error: function(errorCode, msg) {
    this.mainEl.innerHTML = "";
    this.mainEl.className = "error";

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
    function dataStructure(d) {
      return {
        id: d.id,
        name: d.name,
        episode: d.episode,
        air_date: d.air_date,
        characters: d.characters
      }
    }

    if (!data.length) {
      return dataStructure(data)
    } else {
      return data.map(dataStructure)
    }
  }
}


const storeData = {
  list: (category, page, data) => {
    sessionStorage.setItem(`${category}_${page}`, JSON.stringify(data))
  },
  detail: (category, id, data) => {
    sessionStorage.setItem(`${toSingular(category)}_${id}`, JSON.stringify(data))
  }
}

routie({
  "home/:category/:page": (category, page) => {
    router.home(category, page)
  },
  "detail/:category/:id": (category, id) => {
    router.detail(category, id)
  }
})

app.init()
