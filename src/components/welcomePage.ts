export class WelcomePage extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <div>Welcome to the Fish App!</div>
    `;
  }
}

customElements.define("fish-welcome-page", WelcomePage);
