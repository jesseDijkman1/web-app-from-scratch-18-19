"use strict";

import {createElement,templates} from "./modules/templater.js";

// Currently used URL's
const urls = {
  characters: "https://rickandmortyapi.com/api/character",
  episodes: "https://rickandmortyapi.com/api/episode"
}

// App initializer
const app = {
  // First called function when page is loaded, checks the current hash and changes it if needed
  init: () => {
    let hash = window.location.hash || undefined;

    // If there's no hash, change it to default (#home/characters/1)
    if (!hash) {
      window.location.hash = "#home/characters/1";
    }
  },
  // Quicker way to change the window location with javascript
  changeHash: newHash => window.location.hash = newHash,
  // Loader for the users, takes CSS display value as parameter ("none" and "flex")
  loader: display => {
    document.getElementById("loader").style.display = display;
  }
}

// Router or handler, routie calls the function inside the router object. The brain of the app
const router = {
  home: async function(category, page) {
    app.loader("flex");

    let data;
    try {
      // Check if the data we want is in the sessionStorage
      data = await api.tryFindList(category, page);
    } catch (notFound) {
      try {
        // If the data is not in the sessionStorage, request it from the API
        data = await api.get(`${urls[category]}/?page=${page}`, page);

        // Filter the received data
        data = await filterData[category](data);

        // Store the data lists in sessionStorage
        await storeData.list(category, page, data);
      } catch (err) {

        app.loader("none");
        // Render error page
        return render.error(404, "Page not found");
      }
    }

    // Render the data as a list
    await render.list(category, data);

    app.loader("none");
  },
  detail: async (category, id) => {
    app.loader("flex");

    let data;

    try {
      // Check if the data we want is in the sessionStorage
      data = await api.tryFindDetail(category, id);

    } catch (notFound) {
      try {
        // If the data is not in the sessionStorage, request it from the API
        data = await api.get(`${urls[category]}/${id}`);

        // Filter the received data
        data = await filterData[category](data);

        // Store the data detail in sessionStorage
        await storeData.detail(category, id, data);
      } catch (err) {

        app.loader("none");
        // Render error page
        return render.error(404, `${toSingular(category)} not found`);
      }
    }

    // Render the data as a detail page
    await render.detail(category, data);

    app.loader("none");
  }
}

// Data handlers
const api = {
  currentPage: null,
  tryFindList: function(category, page) {
    this.currentPage = page;

    console.log("Getting data from storage");

    return new Promise((resolve, reject) => {
      const storageData = JSON.parse(sessionStorage.getItem(`${category}_${page}`));

      if (!storageData) {
        reject();
      } else {
        resolve(storageData);
      }
    });
  },
  get: function(url, page = null) {
    this.currentPage = page;

    console.log("Getting data from api");

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", url);

      xhr.addEventListener("load", res => {
        // Detailed data gives the data not in the results but in the responseText
        const data = JSON.parse(res.target.responseText).results || JSON.parse(res.target.responseText);
        resolve(data);
      });

      xhr.addEventListener("error", () => reject());
      xhr.send();

    });
  },
  tryFindDetail: function(category, id) {
    return new Promise((resolve, reject) => {
      let singleData = JSON.parse(sessionStorage.getItem(`${toSingular(category)}_${id}`));

      // The single data piece isn't in sessionStorage
      if (!singleData) {
        // If there's no currentpage, we can't look through the character lists in sessionStorage
        if (!this.currentPage) {
          reject();
        }

        let data = JSON.parse(sessionStorage.getItem(`${category}_${this.currentPage}`));
        data = data.find(d => d.id == id);

        if (!data) {
          reject();
        } else {
          resolve(data);
        }

      } else {
        resolve(singleData);
      }
    });
  }
}

// Turns plurals like: characters and episodes into singulars
function toSingular(str) {
  return str.substring(0, str.length - 1);
}


// Functions for rendering lists, details and errors
const render = {
  mainEl: document.querySelector("main"),
  mainTitle: function(category) {
    let el = document.createElement("H1");
    let txt = document.createTextNode(`Rick and Morty - ${category}`);

    el.appendChild(txt);
    el.classList.add("main-title");

    this.mainEl.appendChild(el);
  },
  list: function(category, data) {
    this.mainEl.innerHTML = "";
    this.mainEl.className = "list";

    this.mainTitle(category);
    data.forEach(d => {

      const element = createElement(templates[category](d));

      element.addEventListener("click", () => app.changeHash(`#detail/${category}/${d.id}`));
      this.mainEl.appendChild(element);
    });
  },
  detail: function(category, data) {
    this.mainEl.innerHTML = "";
    this.mainEl.className = "detail";

    const element = createElement(templates[toSingular(category)](data));

    this.mainEl.appendChild(element);
  },
  error: function(errorCode, msg) {
    this.mainEl.innerHTML = "";
    this.mainEl.className = "error";

    const element = createElement(templates.error(errorCode.toString(), msg));

    this.mainEl.appendChild(element);
  }
}

// Functions for filtering data
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
      return dataStructure(data);
    } else {
      return data.map(dataStructure);
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
      return dataStructure(data);
    } else {
      return data.map(dataStructure);
    }
  }
}

// Functions for storing the data in sessionStorage

// I store the data in sessinostorage because the data doesn't need to be stored for long terms.
// Localstorage would be used if I would give the option to add an article to favorites
// I think this is semantically more correct (but I might be wrong)
const storeData = {
  list: (category, page, data) => {
    sessionStorage.setItem(`${category}_${page}`, JSON.stringify(data));
  },
  detail: (category, id, data) => {
    sessionStorage.setItem(`${toSingular(category)}_${id}`, JSON.stringify(data));
  }
}

routie({
  "home/:category/:page": (category, page) => {
    router.home(category, page);
  },
  "detail/:category/:id": (category, id) => {
    router.detail(category, id);
  }
});

app.init();
