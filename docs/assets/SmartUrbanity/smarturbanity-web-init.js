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

  // Said when the page has no text in the chosen language and shows the English one instead.
  const FALLBACK_NOTES = {
    en: "This page is not available in your language yet: it is shown in English.",
    it: "Questa pagina non è ancora disponibile nella tua lingua: è mostrata in inglese.",
    fr: "Cette page n’est pas encore disponible dans votre langue : elle est affichée en anglais.",
    de: "Diese Seite ist noch nicht in Ihrer Sprache verfügbar: Sie wird auf Englisch angezeigt.",
    tr: "Bu sayfa henüz sizin dilinizde mevcut değil: İngilizce gösteriliyor.",
    fa: "این صفحه هنوز به زبان شما موجود نیست: به انگلیسی نمایش داده می‌شود.",
    hu: "Ez az oldal még nem érhető el az Ön nyelvén: angolul jelenik meg.",
    ar: "هذه الصفحة غير متوفرة بلغتك بعد: تُعرض باللغة الإنجليزية.",
    pl: "Ta strona nie jest jeszcze dostępna w twoim języku: jest wyświetlana po angielsku.",
    da: "Denne side findes endnu ikke på dit sprog: den vises på engelsk.",
    lb: "Dës Säit gëtt et nach net an Ärer Sprooch: si gëtt op Englesch gewisen.",
    nl: "Deze pagina is nog niet beschikbaar in je taal: ze wordt in het Engels getoond."
  };
  const RIGHT_TO_LEFT = new Set(["ar", "fa"]);

  window.initLangToggle = function initLangToggle() {
    const select = document.getElementById("language-select");
    const main = document.querySelector("main");
    const lang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    const supported = Array.from(new Set([
      ...Array.from(document.querySelectorAll("[data-lang]"), (el) => el.getAttribute("data-lang").split(/\s+/)).flat(),
      "en", "it", "fr", "de", "tr", "fa", "hu", "ar", "pl", "da", "lb", "nl"
    ].filter(Boolean)));
    // A link may ask for the language of the app that opened it (?lang=fa); otherwise the browser's.
    const requested = (new URLSearchParams(window.location.search).get("lang") || "").toLowerCase();
    const initial = supported.find((value) => value.toLowerCase() === requested)
      || supported.find((value) => lang.startsWith(value.toLowerCase())) || "en";
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
      let note = document.getElementById("language-fallback-note");
      if (main && displayLang !== l) {
        if (!note) {
          note = document.createElement("p");
          note.id = "language-fallback-note";
          note.setAttribute("role", "note");
          main.prepend(note);
        }
        note.textContent = FALLBACK_NOTES[l] || FALLBACK_NOTES.en;
        note.setAttribute("lang", FALLBACK_NOTES[l] ? l : "en");
        note.dir = RIGHT_TO_LEFT.has(l) ? "rtl" : "ltr";
        note.hidden = false;
      } else if (note) {
        note.hidden = true;
      }
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
      // The options exist only now: show the language in use, not the first option.
      select.value = window.currentLang;
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
