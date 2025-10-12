import { fishHandler } from "../fishes/fishHandler.js";
import type { LocationInfo } from "../utils/utils";

export type SideMenuState = {
    locationInfo: LocationInfo | null;
};

export class SideMenu extends HTMLElement {
    constructor() {
        super();
    }

    updateState(state: SideMenuState) {
        this.render(state.locationInfo);
    }

    #getHighlightElement(locationInfo: LocationInfo): HTMLElement | null {
        const id =
            locationInfo.type === "fish"
                ? `fish-${locationInfo.fishId}`
                : "welcome";
        return this.shadowRoot?.getElementById(id);
    }

    render(location: LocationInfo | null) {
        console.log("Rendering SideMenu with location:", location);
        const shadow = this.attachShadow({ mode: "open" });
        const fishIds = fishHandler.getFishIds();

        shadow.innerHTML = `
    <style>
      a {
        text-decoration: none;
        color: gray;
      }
    </style>
    <div id="side-menu" style="display: flex; flex-direction: column; width: 200px; height: 100%; background-color: #f0f0f0; border: 1px solid #ccc; padding: 10px; gap: 10px;">
      <a id="welcome" style="font-weight: bold; font-size: 18px;" href="/">Welcome</a>
      ${fishIds.map((fishId) => `<a id="fish-${fishId}" href="/fish/${fishId}">${fishId}</a><br/>`).join("")}
    </div>
    `;

        if (location === null) return;
        const highlitedStyle =
            "font-weight: bold; color: black; text-decoration: underline;";
        const highlightElement = this.#getHighlightElement(location);
        if (!highlightElement) return;
        const newStyle =
            highlightElement.getAttribute("style") + highlitedStyle;
        highlightElement.setAttribute("style", newStyle);
    }
}

customElements.define("fish-side-menu", SideMenu);
