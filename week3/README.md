# Jesse Dijkman - Web App from scratch (2019)
## Week 3 - Rick and Morty App

## Table of Contents 📋
- [Description](#description-)
  - [API](#api-)
  - [Assignment](#assignment-)
- [Installation guide](#installation-guide-)
- [Diagrams](#diagrams-)
- [Reflection](#reflection-)
  - [Struggles](#struggles-)
- [Sources](#sources-)
- [Licence](#licence-)

---

## Description 🧐
This week was the final week of the course: WAFS (Web app from scratch). During this week I worked on the rickAndMorty app. The rick and morty app is the final iteration of the apps I made for this course. Although I'm not satisfied with it yet, (because I only had a few days) I'm pretty happy with the speed and the way it works. For this project I used a routie as my router. 

### API 🔌
The rickAndMorty app uses the [rickAndMorty API](https://rickandmortyapi.com/). This API is free to use, has a rate limit of 10000 and **doesn't need authentication**. The API works really fast in my opinion ⚡️. It's a good API to create something with, in just a few days. 

### Assignment 📙
Make a client side web app based on data from an API. The app needs to render an overview and detail page. It also needs to include filter and sorting options ❌ (not enough time left). Write as much vanilla javascript, no frameworks (react, vue, etc).

---

## Installation guide 📚
```
git clone https://github.com/jesseDijkman1/web-app-from-scratch-18-19.git
cd web-app-from-scratch-18-19
```

---

## Process 📈
### [Week 1](https://github.com/jesseDijkman1/web-app-from-scratch-18-19/tree/master/week1#week-1)
"Monday we all started with the minor: web-development and started with this course. The assignment for week 1 was to render an index.html without frameworks or libraries. Fairly easy, so I was finished with this part on Monday."

### [Week 2](https://github.com/jesseDijkman1/web-app-from-scratch-18-19/tree/master/week2#description-)
"This week we continued working on our apps. I continued with my second app: weedApp. This app uses more data which makes it easier to make a better detail page (because there is more data)."

### Week 3
During this week (last week) I had to finish two courses ([CSS-to-the-rescue](https://github.com/jesseDijkman1/CSS-to-the-rescue), and [wafs](https://github.com/jesseDijkman1/web-app-from-scratch-18-19). This week I started again from almost scratch. There were a few pieces of code I was able to reuse; like the createElement from templater.

---

## Diagrams 📊
For this course I had to make two diagrams that helped explain my application; the actor diagram and the interaction diagram. 

### Actor Diagram 🤷‍♂️
"An Actor diagram is focused on (code)objects that can be seen as the actors of your code. WHO handles functionality in your app." [Source](https://docs.google.com/document/d/17zwy1Kj4vqM5jqYWz7U6Spi_7i9ucucyBeAMDAfn0mY/edit)
![Actor diagram](https://github.com/jesseDijkman1/web-app-from-scratch-18-19/blob/master/files/actor-diagram.png)

### Interaction Diagram 🕹
"The Interaction diagram focuses on WHAT happens in your code. It visualizes functions and shows how action flows through your application."[Source](https://docs.google.com/document/d/17zwy1Kj4vqM5jqYWz7U6Spi_7i9ucucyBeAMDAfn0mY/edit)
![Interaction diagram](https://github.com/jesseDijkman1/web-app-from-scratch-18-19/blob/master/files/interaction-diagram.png)

---

## Reflection 🧐
There are a few things I would have like to add to make it feel more like an app:

### Pagination
You can go to detail pages and list pages for the characters and episodes. But there's no way to navigate to all of them with just your mouse. This could be fixed with pagination. 

### Favorites
Some fun and fairly easy to make functionality. User can click on a button and the data will be added to localstorage for longer storage.

### Categories
Although you see data about episodes and characters (episodes doesn't show a lot of data now, but it works). You can't click on a tab and be redirected to a different category.

### Locations
Locations is just another category the API has. You can look up the location from rick and morty. To get this data is the same as the others; I just need to add code to templater.

---

### Struggles 🤬
I had few struggles I dealt with. Not with code but with my brain. I know how I could add pagination but in this course I was pushed to think more about structure; so I hesitated a lot about where to put certain things. 

Also thinking about names is not my "thing".

---

## Sources 🗂
- [Rick and Morty API](https://rickandmortyapi.com/documentation)
- [How to write your own Virtual DOM](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)
- [Routie (mini-framework)](http://projects.jga.me/routie/)

---

## Licence 👮‍♂️
MIT © Jesse Dijkman
