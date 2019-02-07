"use strict";

const jokesContainer = document.getElementById("jokes");

function getData(url) {
  return new Promise((resolve, reject) => {
    let apiReq = new XMLHttpRequest();
    apiReq.addEventListener("load", resolve)
    apiReq.open("GET", url);
    apiReq.send();
  })
}

// Initializer
getData("https://api.chucknorris.io/jokes/categories").then(e => getCategories(e.target.responseText));

function getCategories(cats) {
  let categories = JSON.parse(cats),
<<<<<<< HEAD:week1/public/js/app.js
      promises = [];
=======
      promises = [],
      giphies;

  getData(`http://api.giphy.com/v1/gifs/search?q=chuck+norris&api_key=${gipfyKey}&limit=${categories.length}`).then(e => {
    giphies = JSON.parse(e.target.responseText).data;
>>>>>>> c3448e6... Created two directories for two apps, one about marjiuana:week1/chuckNorris/public/js/app.js

  categories.forEach((c, i, a) => {

    if (i == a.length - 1) {
      Promise.all(promises).then(displayData);
    }

    promises.push(new Promise((resolve, reject) => {
<<<<<<< HEAD:week1/public/js/app.js
      getData(`https://api.chucknorris.io/jokes/random?category=${c}`).then(e => {
        resolve(JSON.parse(e.target.responseText));
=======
      getData(`https://api.chucknorris.io/jokes/random?category=${c}`).then(e2 => {
        let jokeData = JSON.parse(e2.target.responseText);
        jokeData.gif = giphies[i].images.original.url;
        resolve(jokeData);
>>>>>>> c3448e6... Created two directories for two apps, one about marjiuana:week1/chuckNorris/public/js/app.js
      });
    }));
  });
}

<<<<<<< HEAD:week1/public/js/app.js
function displayData (data) {
=======
function displayJokes (data) {
>>>>>>> c3448e6... Created two directories for two apps, one about marjiuana:week1/chuckNorris/public/js/app.js
  data.forEach(d => {
    let jokeWrapper = document.createElement("LI"),
        jokeCategory = document.createElement("H1"),
        joke = document.createElement("P"),
        jokeRefreshBtn = document.createElement("BUTTON");

    jokeCategory.textContent = d.category ? d.category : "explicit";
    jokeWrapper.appendChild(jokeCategory);

    joke.textContent = d.value;
    jokeWrapper.appendChild(joke);

    jokeRefreshBtn.innerHTML = "&#8635";

    jokeRefreshBtn.addEventListener("click", refreshJoke);
    jokeWrapper.appendChild(jokeRefreshBtn);

    jokeWrapper.addEventListener("click", seeDetail)

    jokesContainer.appendChild(jokeWrapper);
  });
}

<<<<<<< HEAD:week1/public/js/app.js
function refreshJoke(e) {
  let category = e.target.parentElement.children[0].textContent,
      joke = e.target.parentElement.children[1];
=======
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
>>>>>>> c3448e6... Created two directories for two apps, one about marjiuana:week1/chuckNorris/public/js/app.js

  e.target.parentElement.classList.add("refreshing");

  getData(`https://api.chucknorris.io/jokes/random?category=${category}`).then(ev => {
    e.target.parentElement.classList.remove("refreshing");
    joke.innerHTML = JSON.parse(ev.target.responseText).value;
  });
}

function seeDetail(e) {
  if (e.target.nodeName !== "BUTTON") {
    console.log(e.currentTarget.children[0].style.backgroundImage)
    // window.location.href = "detail.html?test=1";
  }
}
