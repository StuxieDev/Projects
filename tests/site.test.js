#!/usr/bin/env node
// Static-site checks: node tests/site.test.js
// Every page's favicon tags and Discord component embed, the web-root icon files,
// and the changelog renderer's handling of Date Version headings.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const ROOT = path.join(__dirname, "..");
let pass = 0, fail = 0;
function check(name, fn) {
  try { fn(); pass++; console.log("ok   - " + name); }
  catch (e) { fail++; console.log("FAIL - " + name + ": " + e.message); }
}

function pages(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules" || e.name === "tests") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(pages(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const ALLOWED = new Set([1, 2, 9, 10, 11, 12, 14, 17]);
function walk(c, f) { f(c); (c.components || []).forEach(x => walk(x, f)); if (c.accessory) walk(c.accessory, f); }

for (const file of pages(ROOT)) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const html = fs.readFileSync(file, "utf8");
  if (!/<head/.test(html)) continue;
  const head = html.slice(html.indexOf("<head"), html.indexOf("</head>"));

  check(rel + ": favicon tags", () => {
    assert(head.includes('<link rel="icon" href="/favicon.ico" sizes="48x48">'));
    assert(head.includes('<link rel="icon" type="image/png" sizes="512x512" href="/assets/img/icon-512.png">'));
    assert(head.includes('<link rel="apple-touch-icon" href="/apple-touch-icon.png">'));
    assert(head.includes('<link rel="manifest" href="/site.webmanifest">'));
  });

  const m = head.match(/<script id="discord:component-embed" type="application\/json">([\s\S]*?)<\/script>/);
  if (rel === "404.html" || rel === "changelog/index.html") {
    check(rel + ": no Discord embed", () => assert(!m && !head.includes("discord:component-embed")));
    continue;
  }
  check(rel + ": Discord embed is valid", () => {
    assert(m, "embed missing");
    assert(Buffer.byteLength(m[1]) <= 3000, "over 3000 bytes");
    assert(!/\\$1|\$1/.test(m[1]), 'contains "$1"');
    const root = JSON.parse(m[1]).component;
    assert.strictEqual(root.type, 17);
    let count = 0;
    (root.components || []).forEach(c => walk(c, x => {
      count++;
      assert(ALLOWED.has(x.type), "type " + x.type);
      assert.notStrictEqual(x.type, 17, "nested container");
      if (x.type === 2) {
        assert.strictEqual(x.style, 5);
        assert(/^https?:\/\//.test(x.url));
        for (const k of Object.keys(x)) assert(["id", "type", "url", "style", "label", "emoji", "disabled"].includes(k), "button key " + k);
      }
    }));
    assert(count <= 40);
  });
}

check("the embed escaper never prints a literal $1 (markdown in titles is backslash-escaped)", () => {
  const home = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert(!/discord:component-embed[^]*?\$1/.test(home.split("</head>")[0]));
});

check("favicon.ico is a PNG-in-ICO with 16, 32 and 48", () => {
  const b = fs.readFileSync(path.join(ROOT, "favicon.ico"));
  assert.strictEqual(b.readUInt16LE(2), 1);
  const n = b.readUInt16LE(4), sizes = [];
  for (let i = 0; i < n; i++) sizes.push(b[6 + i * 16] || 256);
  assert.deepStrictEqual(sizes.sort((a, c) => a - c), [16, 32, 48]);
});

check("apple-touch-icon.png is 180x180", () => {
  const b = fs.readFileSync(path.join(ROOT, "apple-touch-icon.png"));
  assert.strictEqual(b.readUInt32BE(16), 180); assert.strictEqual(b.readUInt32BE(20), 180);
});

check("site.webmanifest has the required fields and icons exist", () => {
  const w = JSON.parse(fs.readFileSync(path.join(ROOT, "site.webmanifest"), "utf8"));
  assert(w.name && w.short_name && w.start_url === "/" && w.display === "browser" && w.theme_color && w.background_color);
  assert(w.icons.some(i => i.sizes === "192x192"));
  assert(w.icons.some(i => i.sizes === "512x512" && i.purpose === "maskable"));
  w.icons.forEach(i => assert(fs.existsSync(path.join(ROOT, i.src)), i.src));
});

// The changelog renderer must accept Date Version headings and keep the global section order.
check("changelog renderer handles ## vYY.MM.DD and ## vYY.MM.DD-N headings in order", () => {
  const md = "# Changelog\n\n## v26.10.23-1\n\n### Fixed\n\n- f\n\n### Added\n\n- a\n\n### Security\n\n- s\n\n### Deprecated\n\n- d\n\n## v26.10.23\n\n### Changed\n\n- c\n";
  const els = { "cl-body": { innerHTML: "" }, "cl-version": { textContent: "" } };
  const sandbox = {
    document: { getElementById: id => els[id] },
    fetch: url => Promise.resolve({ ok: true, text: () => Promise.resolve(/CHANGELOG/.test(url) ? md : "26.10.23-1\n") }),
  };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "assets/js/changelogs.js"), "utf8"), sandbox);
  return new Promise(r => setTimeout(r, 50)).then(() => {
    const h = els["cl-body"].innerHTML;
    assert(h.includes("<h2>v26.10.23-1</h2>") && h.includes("<h2>v26.10.23</h2>"));
    const order = ["added", "fixed", "security", "deprecated"].map(t => h.indexOf("cl-label-" + t));
    assert(order.every(i => i > 0) && order.every((v, i) => !i || v > order[i - 1]), "order " + order);
    assert.strictEqual(els["cl-version"].textContent, "v26.10.23-1");
  }).then(() => { console.log("ok   - (async) changelog renderer"); }, e => { console.log("FAIL - changelog renderer: " + e.message); process.exitCode = 1; });
});

console.log(pass + " passed, " + fail + " failed");
if (fail) process.exitCode = 1;
