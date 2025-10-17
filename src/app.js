import { parseLocation, getGabbeCompatScore } from "./utils.js";
import { fishHandler } from "./fishHandler.js";

const fishIds = fishHandler.getFishIds();

window.addEventListener("hashchange", () => {
  const location = parseLocation(window.location.hash);
  handleLocationChange(location);
  highlightMenuItem(location);
});

populateSideMenu();
populateContent();
addScrollHandler();
highlightMenuItem();

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
    a.textContent = fishHandler.getEntryById(fishId).name;
    a.id = `side-menu-${fishId}`;
    sideMenu.appendChild(a);
  });
}

function populateContent() {
  const template = document.querySelector("template#welcome-content");
  appendContent(template.content.cloneNode(true));

  addWorldMap();

  for (const fishId of fishIds) {
    const fishEntry = fishHandler.getEntryById(fishId);
    const fishPage = getPopulatedFishPage(fishEntry);
    if (fishPage) {
      appendContent(fishPage);
    }
  }
}

function addWorldMap() {
  const template = document.querySelector("template#map-content");
  if (!template) return;
  const clone = template.content.cloneNode(true);
  appendContent(clone);

  const regionsDiv = clone.querySelector("#regions_div");
  if (regionsDiv) {
    regionsDiv.style.width = "400px";
    regionsDiv.style.height = "400px";
  }

  google.charts.load("current", {
    packages: ["geochart"],
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    const data = google.visualization.arrayToDataTable([
      ["Country", "Data"],
      ...fishHandler
        .getCountries()
        .map(({ country, count }) => [country, count]),
    ]);

    const options = {
      backgroundColor: "transparent",
      datalessRegionColor: "var(--fish-dark-gray)",
      colorAxis: { colors: ["rgb(130, 190, 190)", "rgb(130, 190, 190)"] },
      legend: "none",
      tooltip: { trigger: "none" },
      enableRegionInteractivity: false,
    };

    const chart = new google.visualization.GeoChart(
      document.getElementById("regions_div"),
    );

    chart.draw(data, options);

    document.getElementById("gifted-countries").textContent =
      fishHandler.getCountries().length;

    const totalFish = fishIds.length;
    document.getElementById("gifted-count").textContent = totalFish;
  }
}

function highlightMenuItem() {
  // Remove active class from all items
  const sideMenu = document.getElementById("side-menu");
  if (!sideMenu) return;
  const items = sideMenu.querySelectorAll("a");
  items.forEach((item) => {
    item.classList.remove("active");
  });

  const location = parseLocation(window.location.hash);
  if (location === null) return;

  // Add active class to current item
  if (location.type === "welcome") {
    const homeItem = sideMenu.querySelector("#side-menu-welcome");
    if (homeItem) {
      homeItem.classList.add("active");
    }
  }

  if (location.type === "map") {
    const mapItem = sideMenu.querySelector("#side-menu-map");
    if (mapItem) {
      mapItem.classList.add("active");
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

  const fishPageDiv = clone.querySelector(".fish-card");
  if (fishPageDiv) {
    fishPageDiv.id = `fish-${fishEntry.id}`;
  }

  const fishNameElem = clone.getElementById("fish-title");
  fishNameElem.textContent = fishEntry.name;

  const fishFromElem = clone.getElementById("fish-from");
  fishFromElem.textContent = fishEntry.from;

  const fishDateElem = clone.getElementById("fish-date");
  fishDateElem.textContent = fishEntry.date;

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
  const p = document.createElement("p");
  p.textContent = fishEntry.info;
  fishInfoElem.appendChild(p);

  const fishImage = clone.getElementById("fish-image");
  fishImage.src = `./assets/${fishEntry.id}.jpeg`;
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

  if (location.type === "map") {
    const mapContent = document.getElementById("map-container");
    if (mapContent) {
      mapContent.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (location.type === "fish") {
    const fishContent = document.getElementById(`fish-${location.fishId}`);
    if (fishContent) {
      fishContent.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function addScrollHandler() {
  const content = document.getElementById("content");
  if (!content) return;

  content.addEventListener("wheel", () => {
    if (window.location.hash === "") return;
    window.location.hash = "";
    highlightMenuItem(null);
  });
}
