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
    <div id="fish-page">
        <p id="title" >${fishEntry.name} from ${fishEntry.contry}</p>
    </div>

    <style>
        #fish-page {
            display: flex;
            flex-direction: column;
        }
        #title {
            font-size: 24px;
            font-weight: bold;
        }

        p {
            margin: 0px;
        }
    </style>
    `;
  }
}

customElements.define("fish-page", FishPage);
