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
  // Copyright ranges: data-year-start is the year of the repo's first commit,
  // rendered as "start–current", or just the year while they're the same.
  yearEls.forEach(function (el) {
    var start = parseInt(el.getAttribute("data-year-start"), 10);
    el.textContent = start && start < year ? start + "–" + year : year;
  });
})();
