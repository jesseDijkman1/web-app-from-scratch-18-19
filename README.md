# Jesse Dijkman - Web App from scratch (2019)

## Table of Contents
- [Description](#description-)
- [To-Do](#to-do-)
- [Process](#process-)
  - [Week 1](#week-1)
- [Code](#code-)
- [Sources](#sources-)
- [Licence](#licence-)

---

## Description 📖
For this course I'm going to make a web-app without libraries or frameworks. The app will make XMLHttpRequests to an API and display the data in the HTML; without a template engine. For making requests I use ```Promise.all```. This code is shown down below. 

---

## To-Do 📜
- [x] Render the index.html with data fetched from an API. ✅
- [ ] Render a detail.html when clicking on an article/(piece of data)
- [ ] Make a second App with better data
- [ ] Finish this README

---

## Process ⏳
### Week 1
Monday we all started with the minor: web-development and started with this course. The assignment for week 1 was to render an index.html without frameworks or libraries. Fairly easy, so I was finished with this part on Monday.

---

## Code 🤓

**Getting data from an API**
```js
function getData(url) {
  return new Promise((resolve, reject) => {
    let apiReq = new XMLHttpRequest();
    apiReq.addEventListener("load", resolve)
    apiReq.open("GET", url);
    apiReq.send();
  })
}
```
Just to make it easier I use a promise which takes the url as parameter so you can make a request anywhere in the app.js file.


**Making multiple request**
```js
categories.forEach((c, i, a) => {

    if (i == a.length - 1) {
      Promise.all(promises).then(displayJokes);
    }

    promises.push(new Promise((resolve, reject) => {
      getData(`https://api.chucknorris.io/jokes/random?category=${c}`).then(e2 => {
        let jokeData = JSON.parse(e2.target.responseText);
        jokeData.gif = giphies[i].images.original.url;
        
        resolve(jokeData);
      });
    }));
  });
```
I used ```Promise.all``` in [Frontend-data](https://github.com/jesseDijkman1/frontend-data) and then also in [OpenIntel](https://github.com/MartijnReeuwijk/OpenIntel). There are probably (definitely) better ways to do this, but it works fine 😎.

## Sources 🗂
- [Chuck Norris Joke API](https://api.chucknorris.io/)
- [Giphy](https://giphy.com/)
- [Geek Jokes](https://geek-jokes.sameerkumar.website/api)

## Licence 👮‍♂️
MIT © Jesse Dijkman
