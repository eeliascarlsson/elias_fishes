export class WelcomePage extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
      <div>Welcome</div>
    `;
    }
}

customElements.define("fish-welcome-page", WelcomePage);
