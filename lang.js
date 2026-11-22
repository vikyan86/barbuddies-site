// Shows the page in English, Spanish or Russian: from the link (#es), the visitor's
// earlier choice, or the browser language. Without this script all three are shown.
(function () {
  var langs = ["en", "es", "ru"];
  var root = document.documentElement;
  root.classList.add("js");

  function pick() {
    var hash = location.hash.replace("#", "");
    if (langs.indexOf(hash) >= 0) return hash;
    try {
      var saved = localStorage.getItem("lang");
      if (langs.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    var browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    return langs.indexOf(browser) >= 0 ? browser : "en";
  }

  function show(lang) {
    document.querySelectorAll("article[lang]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("lang") === lang);
    });
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
    root.setAttribute("lang", lang);
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.addEventListener("click", function () {
        show(b.dataset.lang);
        history.replaceState(null, "", "#" + b.dataset.lang);
      });
    });
    show(pick());
  });
  window.addEventListener("hashchange", function () { show(pick()); });
})();
