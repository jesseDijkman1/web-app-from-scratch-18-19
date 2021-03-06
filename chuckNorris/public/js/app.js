"use strict";

(() => {
  const jokesContainer = document.getElementById("jokes"),
        mainJoke = document.querySelector("#mainJoke h1"),
        mainJokeBtn = document.querySelector("#mainJoke button"),
        gipfyKey = new URL(window.location.href).searchParams.get("key") || null;

  function getData(url) {
    return new Promise((resolve, reject) => {
      const apiReq = new XMLHttpRequest();
        apiReq.open("GET", url);
        apiReq.addEventListener("load", resolve)
        apiReq.send();
    });
  }

  // Initializer
  getData("https://api.chucknorris.io/jokes/categories").then(e => getCategories(e.target.responseText));

  function getCategories(cats) {
    console.log(cats)
    let categories = JSON.parse(cats),
        promises = [],
        giphies;

    if (gipfyKey !== null) {
      getData(`http://api.giphy.com/v1/gifs/search?q=chuck+norris&api_key=${gipfyKey}&limit=${categories.length}`).then(e => {

        giphies = JSON.parse(e.target.responseText).data;
        makePromises();
      });

    } else {
      makePromises();
    }

    function makePromises() {
      categories.forEach((c, i, a) => {

        if (i == a.length - 1) {
          Promise.all(promises).then(displayJokes);
        }

        promises.push(new Promise((resolve, reject) => {
          getData(`https://api.chucknorris.io/jokes/random?category=${c}`).then(e2 => {
            let jokeData = JSON.parse(e2.target.responseText);

            if (gipfyKey !== null) {
              jokeData.gif = giphies[i].images.original.url;
            }

            resolve(jokeData);
          });
        }));
      });
    }
  }

  function displayJokes (data) {
    data.forEach(d => {
      const jokeWrapper = document.createElement("LI"),
          jokeImg = document.createElement("HEADER"),
          jokeCategory = document.createElement("H1"),
          joke = document.createElement("P"),
          jokeRefreshBtn = document.createElement("BUTTON");

      jokeImg.style.backgroundImage = `url(${d.gif || "https://media.giphy.com/media/UvdC8pXudeEak/giphy.gif"})`;
      jokeWrapper.appendChild(jokeImg);

      jokeCategory.textContent = d.category ? d.category : "explicit";
      jokeWrapper.appendChild(jokeCategory);

      joke.innerHTML = d.value;
      jokeWrapper.appendChild(joke);

      jokeRefreshBtn.innerHTML = "&#8635";

      jokeRefreshBtn.addEventListener("click", refreshJoke);
      jokeWrapper.appendChild(jokeRefreshBtn);

      jokeWrapper.addEventListener("click", seeDetail)

      jokesContainer.appendChild(jokeWrapper);
    });
  }

  function displayMainJoke() {
    mainJoke.classList.add("refreshing");

    getData("https://geek-jokes.sameerkumar.website/api").then(e => {
      mainJoke.classList.remove("refreshing");
      mainJoke.innerHTML = JSON.parse(e.target.responseText);
    });
  }

  displayMainJoke();

  mainJokeBtn.addEventListener("click", displayMainJoke)

  function refreshJoke(e) {

    let category = e.target.parentElement.children[1].textContent,
        joke = e.target.parentElement.children[2];

    e.target.parentElement.classList.add("refreshing");

    getData(`https://api.chucknorris.io/jokes/random?category=${category}`).then(ev => {
      e.target.parentElement.classList.remove("refreshing");
      joke.innerHTML = JSON.parse(ev.target.responseText).value;
    });
  }

  function seeDetail(e) {
    if (e.target.nodeName !== "BUTTON") {
      console.log(e.currentTarget.children[0].style.backgroundImage)
    }
  }
})();
