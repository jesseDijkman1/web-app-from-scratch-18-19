"use strict";

const templates = {
  home: (data) => {
    return {
      type: "ARTICLE", props: {"data-charId": data.id}, children: [
        {type: "H1", props: {}, children: [data.name]},
        {type: "IMG", props: {src: data.image}, children: [""]}
      ]
    }
  },
  detail: (data) => {
    return {
      type: "HEADER", props: {}, children: [
        {type: "IMG", props: {src: data.image}, children: [""]},
        {type: "H1", props: {}, children: [data.name]},
        {type: "SECTION", props: {}, children: [
          {type: "H2", props: {}, children: ["Specs"]},
          {type: "TABLE", props: {}, children: [
            {type: "TR", props: {}, children: [
              {type: "TH", props: {}, children: ["Category"]},
              {type: "TH", props: {}, children: ["Value"]}
            ]},
            data.details.forEach(detail => {
              console.log(detail)
            })
          ]}
        ]}
      ]
    }
  }
}

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

export {createElement, templates};
