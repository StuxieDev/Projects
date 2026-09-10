(function () {
  if (window.DEV_MODE) {
    var banner = document.createElement("div");
    banner.id = "dev-banner";
    banner.innerHTML =
      "Local development build — <code>window.DEV_MODE</code> is forced on by dev-server.js. " +
      "Run with <code>--no-dev-mode</code> to test production behaviour.";
    document.body.insertBefore(banner, document.body.firstChild);
  }

  var yearEls = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = year;
  });
})();
