import { fishHandler } from "../fishes/fishHandler.js";
import type { LocationInfo } from "../utils/utils";

export type SideMenuState = {
    locationInfo: LocationInfo | null;
}

export class SideMenu extends HTMLElement {
  constructor(locationInfo: LocationInfo | null) {
    super();
  }

  connectedCallback() {
    this.render(null);
  }

  updateState(state: SideMenuState) {
    this.render(state.locationInfo);
  }

  render(location: LocationInfo | null) {
    const shadow = this.attachShadow({ mode: "open" });
    const fishIds = fishHandler.getFishIds();

    shadow.innerHTML = `
    <style>
      a {
        text-decoration: none;
        color: black;
      }
    </style>
      <div id="side-menu" style="display: flex; flex-direction: column; width: 200px; height: 100%; background-color: #f0f0f0; border: 1px solid #ccc; padding: 10px; gap: 10px;">
        <a id="welcome" style="font-weight: bold; font-size: 18px;" href="/">Welcome</a>
        ${fishIds.map(fishId => `<a id="fish-${fishId}" href="/fish/${fishId}">${fishId}</a><br/>`).join('')}
      </div>
    `;

    if (location === null) return;
    if (location.type === "welcome") {
        const welcomeLink = shadow.getElementById("welcome");
        welcomeLink?.setAttribute("style", "font-weight: bold; font-size: 18px; text-decoration: underline;");
    }
  }
}

customElements.define("fish-side-menu", SideMenu);
