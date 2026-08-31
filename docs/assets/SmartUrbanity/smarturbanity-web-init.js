/* SmartUrbanity - FULL INIT LOADER */
(async function () {
  const currentScript = document.currentScript;
  const scriptURL = currentScript && currentScript.src
    ? new URL(currentScript.src, window.location.href)
    : new URL("./", window.location.href);
  const ASSET_BASE = new URL("./", scriptURL).href;

  const FILES = {
    template: "smarturbanity-web-template.html",
    style: "smarturbanity-web-style.css"
  };

  function buildURL(base, file) {
    return base + file;
  }

  async function fetchLocal(filename) {
    const local = buildURL(ASSET_BASE, filename);
    try {
      const r = await fetch(local, { cache: "no-cache" });
      if (r.ok) return r.text();
    } catch (e) {}

    console.error("Cannot load:", filename);
    return null;
  }

  function loadCSS() {
    const cssURL = buildURL(ASSET_BASE, FILES.style);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssURL;
    document.head.appendChild(link);
  }

  window.initLangToggle = function initLangToggle() {
    const select = document.getElementById("language-select");
    const main = document.querySelector("main");
    const lang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    const supported = Array.from(new Set([
      ...Array.from(document.querySelectorAll("[data-lang]"), (el) => el.getAttribute("data-lang").split(/\s+/)).flat(),
      "en", "it", "fr", "de", "tr", "fa", "hu", "ar"
    ].filter(Boolean)));
    const initial = supported.find((value) => lang.startsWith(value.toLowerCase())) || "en";
    window.supportedLanguages = supported;
    window.currentLang = initial;

    function showLang(l) {
      const availablePageLanguages = new Set(
        Array.from(document.querySelectorAll("[data-lang]"), (el) => el.getAttribute("data-lang").split(/\s+/)).flat()
      );
      const displayLang = availablePageLanguages.has(l) ? l : "en";
      document.querySelectorAll("[data-lang]").forEach((el) => {
        const visibleDisplay = el.tagName === "SPAN" ? "inline" : "block";
        const languages = el.getAttribute("data-lang").split(/\s+/);
        el.style.display = languages.includes(displayLang) ? visibleDisplay : "none";
      });

      if (main) main.setAttribute("lang", l);
      window.currentLang = l;

      if (select) {
        select.value = l;
        select.setAttribute("aria-label", `Select language. Current: ${l}`);
      }

      window.dispatchEvent(new CustomEvent("smarturbanity:langchange", { detail: { lang: l } }));
    }

    window.setLang = showLang;
    showLang(window.currentLang);

    if (select) {
      select.textContent = "";
      supported.forEach((language) => {
        const option = document.createElement("option");
        option.value = language;
        option.textContent = language.toUpperCase();
        select.appendChild(option);
      });
      select.addEventListener("change", () => showLang(select.value));
    }
  };

  async function loadTemplate() {
    const html = await fetchLocal(FILES.template);
    if (!html) return;

    const parser = new DOMParser();
    const tpl = parser.parseFromString(html, "text/html");
    tpl.querySelectorAll("[data-asset-src]").forEach((el) => {
      el.setAttribute("src", buildURL(ASSET_BASE, el.getAttribute("data-asset-src")));
      el.removeAttribute("data-asset-src");
    });

    const header = tpl.querySelector("header");
    const footer = tpl.querySelector("footer");

    if (header) document.getElementById("smarturbanity-header").innerHTML = header.outerHTML;
    if (footer) document.getElementById("smarturbanity-footer").innerHTML = footer.outerHTML;

    window.initLangToggle();
  }

  loadCSS();
  await loadTemplate();
})();
