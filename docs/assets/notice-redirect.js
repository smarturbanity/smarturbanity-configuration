/* The privacy notices moved to the SmartUrbanity website. Old addresses, still opened by installations pinned to an
   earlier commit, follow the configuration on main: notice_base_url from base.json, the notice path from the file named in
   data-source (key data-key), so the website address is written only once. Language and section are kept. */
"use strict";

(async function () {
  const CONFIGURATION = "https://raw.githubusercontent.com/smarturbanity/smarturbanity-configuration/main/";
  const script = document.currentScript;
  const source = script.dataset.source;
  const key = script.dataset.key;
  const json = async (path) => {
    const response = await fetch(CONFIGURATION + path, { cache: "no-cache" });
    if (!response.ok) throw new Error(`${path}: ${response.status}`);
    return response.json();
  };
  try {
    const base = (await json("base.json")).questionnaires.consent;
    const consent = source === "base.json" ? base : { ...base, ...(await json(source)).questionnaires.consent };
    const target = new URL(consent[key], consent.notice_base_url);
    window.location.replace(target.href + window.location.search + window.location.hash);
  } catch (error) {
    console.error("Cannot find the privacy notice.", error);
    document.getElementById("notice-unavailable").hidden = false;
  }
})();
