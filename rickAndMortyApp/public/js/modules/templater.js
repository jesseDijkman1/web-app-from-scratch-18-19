"use strict";

const templates = {
  characters: (data) => {
    return {
      type: "ARTICLE", props: {"data-charId": data.id}, children: [
        {type: "H1", props: {}, children: [data.name]},
        {type: "IMG", props: {src: data.image}, children: [""]}
      ]
    }
  },
  episodes: (data) => {
    return {
      type: "ARTICLE", props: {"data-epId": data.id}, children: [
        {type: "H1", props: {}, children: [data.name]},
        {type: "H2", props: {}, children: [data.air_date]}
      ]
    }
  },
  episode: (data) => {
    return {
      type: "ARTICLE", props: {"data-epId": data.id}, children: [
        {type: "H1", props: {}, children: [data.name]},
        {type: "H2", props: {}, children: [data.air_date]}
      ]
    }
  },
  character: (data) => {
    console.log(data)
    return {
      type: "DIV", props: {}, children: [
        {type: "H1", props: {}, children: [data.name]},
        {type: "IMG", props: {src: data.image}, children: [""]},
        {type: "SECTION", props: {}, children: [
          {type: "H2", props: {}, children: ["Specs"]},
          {type: "TABLE", props: {}, children: [
            {type: "TR", props: {}, children: [
              {type: "TH", props: {}, children: ["Category"]},
              {type: "TH", props: {}, children: ["Value"]}
            ]},
            {type: "TR", props: {}, children: [
              {type: "TD", props: {}, children: ["Gender"]},
              {type: "TD", props: {}, children: [data.details.gender]}
            ]},
            {type: "TR", props: {}, children: [
              {type: "TD", props: {}, children: ["Species"]},
              {type: "TD", props: {}, children: [data.details.species]}
            ]},
            {type: "TR", props: {}, children: [
              {type: "TD", props: {}, children: ["Status"]},
              {type: "TD", props: {}, children: [data.details.status]}
            ]},
            {type: "TR", props: {}, children: [
              {type: "TD", props: {}, children: ["Origin"]},
              {type: "TD", props: {}, children: [data.details.origin.name]}
            ]},
            {type: "TR", props: {}, children: [
              {type: "TD", props: {}, children: ["Location"]},
              {type: "TD", props: {}, children: [data.details.location.name]}
            ]}
          ]}
        ]},
        {type: "OL", props: {}, children:
          data.episodes.map(episode => {
            let episodeNr = episode.split("/").reverse()[0];
            return {type: "A", props: {href: `#detail/episodes/${episodeNr}`}, children: [
              {type: "LI", props: {href: `#detail/episodes/${episodeNr}`}, children: [`Episode - ${episodeNr}`]}
          ]
        }
      })}
      ]
    }
  },
  error: (errorCode, msg) => {
    return {
      type: "DIV", props: {}, children: [
        {type: "H1", props: {}, children: [errorCode]},
        {type: "H2", props: {}, children: [msg]}
      ]
    }
  }
}

// Source: https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
function createElement(node) {
  if (typeof node == "string") {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.type);

  for (let property in node.props) {

    if (property == "style") {
      for (let css in node.props[property]) {
        element.style[css] = node.props[property][css];
      }
    } else {
      element.setAttribute(property, node.props[property]);
    }
  }

  node.children
    .map(createElement)
    .forEach(elChild => element.appendChild(elChild));

  return element;
}

export {createElement, templates};
