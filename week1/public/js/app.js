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
      promises = [];

  categories.forEach((c, i, a) => {

    if (i == a.length - 1) {
      Promise.all(promises).then(displayData);
    }

    promises.push(new Promise((resolve, reject) => {
      getData(`https://api.chucknorris.io/jokes/random?category=${c}`).then(e => {
        resolve(JSON.parse(e.target.responseText));
      });
    }));
  });
}

function displayData (data) {
  data.forEach(d => {
    let jokeWrapper = document.createElement("LI"),
        jokeCategory = document.createElement("H1"),
        joke = document.createElement("P"),
        jokeRefreshBtn = document.createElement("BUTTON");

    jokeCategory.textContent = d.category ? d.category : "explicit";
    jokeWrapper.appendChild(jokeCategory);

    joke.textContent = d.value;
    jokeWrapper.appendChild(joke);

    jokeRefreshBtn.textContent = "Refresh";
    jokeRefreshBtn.addEventListener("click", refreshJoke);
    jokeWrapper.appendChild(jokeRefreshBtn);

    jokesContainer.appendChild(jokeWrapper);
  });
}

function refreshJoke(e) {
  let category = e.target.parentElement.children[0].textContent,
      joke = e.target.parentElement.children[1];

  getData(`https://api.chucknorris.io/jokes/random?category=${category}`).then(ev => {
    joke.textContent = JSON.parse(ev.target.responseText).value;
  });
}
