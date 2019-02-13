"use strict";

// If there's no hash, change it to home, else pass the hash to router
window.addEventListener("load", () => {
  console.log("load")
  if (!window.location.hash) {
    window.location.hash = "#home";
  } else {
    router(window.location.hash);
  }
});

window.addEventListener("hashchange", () => router(window.location.hash));

function router(hash) {
  // let regex = /#\w+/g;

  // Find the hash without anything
  // hash = regex.exec(hash)[0];

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
