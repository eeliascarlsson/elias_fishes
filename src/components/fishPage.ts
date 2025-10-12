export class FishPage extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
      <div>This is the fish page component.</div>
    `;
    }

    connectedCallback() {
        this.shadowRoot
            ?.getElementById("btn")
            ?.addEventListener("click", () => {
                alert("Button clicked!");
            });
    }

    disconnectedCallback() {
        this.shadowRoot
            ?.getElementById("btn")
            ?.removeEventListener("click", () => {});
    }
}

customElements.define("fish-page", FishPage);
