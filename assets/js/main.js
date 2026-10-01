(function () {
  // Site banners (assets/css/site-banner.css + assets/js/site-banner.js, which measures them).
  // Dev mode shows the dev banner; there, ?banner=soon,maintenance,site previews the others.
  if (window.DEV_MODE) {
    var order = ["maintenance", "soon", "dev", "site"];
    var show = ["dev"];
    var m = /[?&]banner=([^&]*)/.exec(location.search);
    if (m) decodeURIComponent(m[1]).split(",").forEach(function (v) {
      v = v.trim();
      if (order.indexOf(v) >= 0 && show.indexOf(v) < 0) show.push(v);
    });
    var copy = {
      maintenance: ["Maintenance", "status", "StuxieDev Projects is being updated and will be back shortly."],
      soon: ["Coming soon", "status", "StuxieDev Projects is launching soon."],
      dev: ["Dev mode", "note", "Local preview of StuxieDev Projects. Run <code>dev-server.js --no-dev-mode</code> to see it as production does."],
      site: ["Notice", "note", "A site notice for StuxieDev Projects appears here. <a href=\"https://github.com/StuxieDev/Projects\">See the source</a>."]
    };
    var box = document.createElement("div");
    box.className = "site-banners";
    box.setAttribute("data-site-banners", "");
    order.forEach(function (v) {
      if (show.indexOf(v) < 0) return;
      var b = document.createElement("div");
      b.className = "site-banner site-banner--" + v;
      b.setAttribute("role", copy[v][1]);
      b.innerHTML = '<span class="site-banner-label">' + copy[v][0] + '</span><span class="site-banner-text">' + copy[v][2] + "</span>";
      box.appendChild(b);
    });
    document.documentElement.classList.add("has-site-banner");
    document.body.insertBefore(box, document.body.firstChild);
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

// Footer version link: this site's own VERSION.md, published with the site. If it can't be
// read, the link keeps its fallback text ("Changelogs").
(function () {
  var links = document.querySelectorAll("[data-site-version]");
  if (!links.length || !window.fetch) return;
  fetch("/VERSION.md", { cache: "no-cache" }).then(function (r) {
    if (!r.ok) throw new Error(r.status);
    return r.text();
  }).then(function (v) {
    v = v.trim().replace(/^v/i, "");
    if (!/^\d+\.\d+\.\d+/.test(v)) return;
    Array.prototype.forEach.call(links, function (a) {
      a.textContent = "v" + v;
      a.setAttribute("title", "Version " + v + ": changelogs");
    });
  }).catch(function () {});
})();
