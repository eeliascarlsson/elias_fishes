import { parseLocation, getGabbeCompatScore } from "./utils.js";
import { fishHandler } from "./fishHandler.js";

const fishIds = fishHandler.getFishIds();

window.addEventListener("hashchange", () => {
  const location = parseLocation(window.location.hash);
  handleLocationChange(location);
  highlightMenuItem(location);
});

const location = parseLocation(window.location.hash);
populateSideMenu();
highlightMenuItem(location);
populateContent();

// Functions:
function appendContent(newContent) {
  const contentDiv = document.getElementById("content");
  contentDiv.appendChild(newContent);
}

function populateSideMenu() {
  // Populate
  const sideMenu = document.getElementById("side-menu");
  fishIds.forEach((fishId) => {
    const a = document.createElement("a");
    a.href = `#fish/${fishId}`;
    a.textContent = fishId.charAt(0).toUpperCase() + fishId.slice(1);
    a.id = `side-menu-${fishId}`;
    sideMenu.appendChild(a);
  });
}

function populateContent() {
  const template = document.querySelector("template#welcome-content");
  appendContent(template.content.cloneNode(true));

  for (const fishId of fishIds) {
    const fishEntry = fishHandler.getEntryById(fishId);
    const fishPage = getPopulatedFishPage(fishEntry);
    if (fishPage) {
      appendContent(fishPage);
    }
  }
}

function highlightMenuItem(location) {
  if (location === null) return;
  const sideMenu = document.getElementById("side-menu");
  if (!sideMenu) return;

  // Remove active class from all items
  const items = sideMenu.querySelectorAll("a");
  items.forEach((item) => {
    item.classList.remove("active");
  });

  // Add active class to current item
  if (location.type === "welcome") {
    const homeItem = sideMenu.querySelector("#side-menu-welcome");
    if (homeItem) {
      homeItem.classList.add("active");
    }
  }

  if (location.type === "fish" && location.fishId) {
    const currentItem = sideMenu.querySelector(`#side-menu-${location.fishId}`);
    if (currentItem) {
      currentItem.classList.add("active");
    }
  }
}

function getPopulatedFishPage(fishEntry) {
  const template = document.querySelector("template#fish-content");
  if (!template) return;
  const clone = template.content.cloneNode(true);

  const fishPageDiv = clone.querySelector(".fish-page");
  if (fishPageDiv) {
    fishPageDiv.id = `fish-${fishEntry.id}`;
  }

  const fishNameElem = clone.getElementById("fish-title");
  fishNameElem.textContent = fishEntry.name;

  const fishFromElem = clone.getElementById("fish-from");
  fishFromElem.textContent = fishEntry.from;

  const fishCountryElem = clone.getElementById("fish-country");
  fishCountryElem.textContent = fishEntry.country;

  const fishSwag = clone.getElementById("fish-swag");
  fishSwag.textContent = `${"★".repeat(fishEntry.swag)}${"☆".repeat(
    5 - fishEntry.swag,
  )}`;

  const fishUsability = clone.getElementById("fish-usability");
  fishUsability.textContent = `${"★".repeat(
    fishEntry.usability,
  )}${"☆".repeat(5 - fishEntry.usability)}`;

  const gabbeComp = getGabbeCompatScore(fishEntry.swag, fishEntry.usability);
  const fishGabbeComp = clone.getElementById("fish-gabbe-comp");
  fishGabbeComp.textContent = `${"★".repeat(gabbeComp)}${"☆".repeat(5 - gabbeComp)}`;

  const fishInfoElem = clone.getElementById("fish-body");
  fishInfoElem.innerHTML = "";
  fishEntry.info.forEach((infoLine) => {
    const p = document.createElement("p");
    p.textContent = infoLine;
    fishInfoElem.appendChild(p);
  });

  const fishImage = clone.getElementById("fish-image");
  fishImage.src = `./assets/${fishEntry.id}.jpg`;
  fishImage.alt = fishEntry.name;

  return clone;
}

function handleLocationChange(location) {
  if (location.type === "welcome") {
    const welcomeContent = document.getElementById("welcome-info");
    if (welcomeContent) {
      welcomeContent.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  if (location.type === "fish") {
    const fishContent = document.getElementById(`fish-${location.fishId}`);
    if (fishContent) {
      fishContent.scrollIntoView({ behavior: "smooth" });
    }
  }
}
