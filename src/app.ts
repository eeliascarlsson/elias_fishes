import "./components/fishPage.js";
import "./components/sideMenu.js";
import "./components/welcomePage.js";
import { parseLocation } from "./utils/utils.js";
import type { LocationInfo } from "./utils/utils";
import type { SideMenu } from "./components/sideMenu";
import type { WelcomePage } from "./components/welcomePage.js";
import type { FishPage } from "./components/fishPage.js";
import { fishHandler } from "./fishes/fishHandler.js";

export class FishApp extends HTMLElement {
  #locationInfo: LocationInfo | null = null;

  constructor() {
    super();
    this.#locationInfo = parseLocation(window.location.pathname);
    this.render();
  }

  render() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `

    <div id="root">
        <fish-side-menu id="fish-side-menu"></fish-side-menu>
    </div>
    
    <style>
        :host {
            display: block;
            width: 100%;
            height: 100%;
            overflow: hidden; /* prevents scroll */
        }
        #root {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
        }
    </style>`;

    const locationInfo = this.#locationInfo;
    const sideMenu = this.shadowRoot?.getElementById(
      "fish-side-menu",
    ) as SideMenu | null;
    sideMenu?.updateState({ locationInfo });

    if (locationInfo === null) return;

    const rootDiv = this.shadowRoot?.getElementById("root");
    if (!rootDiv) return;

    if (locationInfo.type === "welcome") {
      const welcomePage = document.createElement(
        "fish-welcome-page",
      ) as WelcomePage;
      rootDiv.appendChild(welcomePage);
    }

    if (locationInfo.type === "fish") {
      const fishPage = document.createElement("fish-page") as FishPage;
      rootDiv.appendChild(fishPage);
      const fishEntry = fishHandler.getEntryById(locationInfo.fishId);
      fishPage.updateState({ info: fishEntry });
    }
  }
}

customElements.define("fish-app", FishApp);
