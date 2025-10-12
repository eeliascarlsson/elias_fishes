import type { FishEntry } from "../fishes/fishes";

export type FishPageState = {
  info: FishEntry | null;
};

export class FishPage extends HTMLElement {
  #shadow: ShadowRoot;
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
    this.render(null);
  }

  updateState(state: FishPageState) {
    this.render(state.info);
  }

  render(fishEntry: FishEntry | null) {
    if (!fishEntry) {
      this.#shadow.innerHTML = `<div>No fish selected.</div>`;
      return;
    }
    this.#shadow.innerHTML = `
    <div>This is the fish page component ${fishEntry.name}.</div>
    `;
  }
}

customElements.define("fish-page", FishPage);
