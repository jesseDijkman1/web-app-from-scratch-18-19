# Jesse Dijkman - Web App from scratch (2019)
## Week 2

## Table of Contents 📋
- [Description](#description-)
- [API](#api-)
- [Diagrams](#diagrams-)
- [Code](#code-)
- [Sources](#sources-)
- [Licence](#licence-)

---

## Description 🧐
This week we continued working on our apps. I continued with my second app: weedApp. This app uses more data which makes it easier to make a better detail page (because there is more data). 

---

## API 🔌
Otreeba Open Cannabis API - [API Documentation](https://api.otreeba.com/swagger/)

My chucknorris app didn't handle a lot of data, atleast not enough to render a decent detail page. That's why I searched for a new API and I was looking for one that didn't need an API-key. And I found one about cannabis. 

### Pros and cons

**Pros:**
- No authentication needed
- There's a lot of data
- Returns JSON

**Cons:**
- Not a great documentation in my opining
- __**There's an unknown rate limit**__

### The rate limit
The Open Cannabis API has a rate limit of ... I don't know. I can't find it anywhere and it seems to be a bit random. The rate limit actually ruins my app and I don't know if there's a work around (because it isn't documented). 

---

## Diagrams 📊

**Actor Diagram**<br>
This diagram shows the big components that make the app. It shows the relationships between these components and shows a rough blueprint of the app.
![Actor Diagram](https://i.imgur.com/E20AUqX.png)

**Interaction Diagram**<br>
This diagram shows a more detailed version of the actor diagram. The interaction diagram also shows user interactions and conditions.
![Interaction diagram](https://i.imgur.com/eJB6BRV.png)

---

## Code ⚙️

### Router
```js
function router(hash) {
  switch (hash) {

    case "#home":
      pageHome();
      break;

    case "#detail":
      pageDetail();
      break;

    default:
      pageNotFound();
      break;
  }
}
```
The router code can be found on router.js. The router is the first function being called. When the user first visits the onload event is triggered. Because the page is not supposed to load more than ones, the hash is change to #home and the hashchange event is triggered. When the hashchange is triggered the function router check for the hash and call the related function.

### Templater
```js
function createElement(node) {
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
    .map(createElement)
    .forEach(elChild => el.appendChild(elChild));

  return el;
}
```
The createElement function takes a template (```typeof object```). I found this approach on [Medium](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060). The template needs to be structured as follows:

```js
const template = {
        type: "ARTICLE", props: {"data-ocpc": d.ocpc}, children: [
          {type: "H1", props: {}, children: [d.name]},
          {type: "DIV", props: {style: {"backgroundImage": `url(${d.image})`}}, children: [""]}
        ]
      }
```

---

## Sources 🗂
- [Open Cannabis API](https://api.otreeba.com/swagger/)
- [How to write your own Virtual DOM](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)
- [Image not found](https://www.unesale.com/ProductImages/Large/notfound.png)

---

## Licence 👮‍♂️
MIT © Jesse Dijkman
