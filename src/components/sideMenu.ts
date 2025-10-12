import { fishHandler } from "../fishes/fishHandler.js";
import type { LocationInfo } from "../utils/utils";

export type SideMenuState = {
  locationInfo: LocationInfo | null;
};

export class SideMenu extends HTMLElement {
  #shadow: ShadowRoot;
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
    this.render(null);
  }

  updateState(state: SideMenuState) {
    this.render(state.locationInfo);
  }

  #getHighlightElement(locationInfo: LocationInfo): HTMLElement | null {
    const id =
      locationInfo.type === "fish" ? `fish-${locationInfo.fishId}` : "welcome";
    return this.shadowRoot?.getElementById(id)!;
  }

  render(location: LocationInfo | null) {
    console.log("Rendering SideMenu with location:", location);
    const fishIds = fishHandler.getFishIds();

    this.#shadow.innerHTML = `
    <div id="side-menu">
        <a id="welcome" href="/">Welcome</a>
        ${fishIds.map((fishId) => `<a class="fish-link" id="fish-${fishId}" href="/fish/${fishId}">${fishId}</a><br/>`).join("")}
    </div>

    <style>
    a {
        text-decoration: none;
        color: gray;
    }

    #side-menu {
        display: flex;
        flex-direction: column;
        width: 200px;
        height: 100%;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        padding: 10px;
        gap: 10px;
    }

    .fish-link {}

    #welcome {
        font-weight: bold;
        font-size: 18px;
    }
    </style>`;

    if (location === null) return;
    const highlitedStyle =
      "font-weight: bold; color: black; text-decoration: underline;";
    const highlightElement = this.#getHighlightElement(location);
    if (!highlightElement) return;
    const newStyle = highlightElement.getAttribute("style") + highlitedStyle;
    highlightElement.setAttribute("style", newStyle);
  }
}

customElements.define("fish-side-menu", SideMenu);
