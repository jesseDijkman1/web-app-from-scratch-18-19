"use strict";

// Change hash to #home on load, because the app is a one pager it's ok
window.addEventListener("load", () => {
    window.location.hash = "#home";
    router(window.location.hash);
});

window.addEventListener("hashchange", () => router(window.location.hash));

function router(hash) {
  // Regex that filters the hash, can be used when I want to pass variables with the url after hash
  // Example #detail?var=something

  // let regex = /#\w+/g;

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
