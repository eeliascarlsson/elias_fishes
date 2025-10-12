import "./components/fishPage.js";
import "./components/sideMenu.js";
import { parseLocation } from "./utils/utils.js";
import type { LocationInfo } from "./utils/utils";
import type { SideMenu } from "./components/sideMenu";

export class FishApp extends HTMLElement {
    #locationInfo: LocationInfo | null = null;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
            <style>
                :host {
                display: block;
                width: 100%;
                height: 100%;
                overflow: hidden; /* prevents scroll */
                }
            </style>
            <div style="display: flex; flex-direction: row; width: 100%; height: 100%;">
                <fish-side-menu id="fish-side-menu"></fish-side-menu>
                <fish-page></fish-page>
            </div>`;

        this.#locationInfo = parseLocation(window.location.pathname);
    }

    connectedCallback() {
        const sideMenu = this.shadowRoot?.getElementById(
            "fish-side-menu",
        ) as SideMenu | null;
        sideMenu?.updateState({ locationInfo: this.#locationInfo });
    }
}

customElements.define("fish-app", FishApp);
