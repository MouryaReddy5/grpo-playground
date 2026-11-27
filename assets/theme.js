// Light/dark toggle shared by every page. Remembers the choice per browser.
(function () {
  var root = document.documentElement;
  try { var saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
  function current() {
    if (root.dataset.theme) return root.dataset.theme;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-btn");
    if (!btn) return;
    var label = function () { btn.textContent = current() === "dark" ? "light" : "dark"; };
    label();
    btn.addEventListener("click", function () {
      root.dataset.theme = current() === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
      label();
      window.dispatchEvent(new Event("themechange"));
    });
  });
})();

// Read a CSS custom property (used by canvases so they follow the theme).
window.cssVar = function (name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};
