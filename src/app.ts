export class MyElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          background: #f0f0f0;
          border-radius: 8px;
          font-family: sans-serif;
        }
        button {
          background: #0078d7;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        button:hover {
          background: #005fa3;
        }
      </style>
      <h2>Hello, Web Component!</h2>
      <button id="btn">Click me</button>
    `;
  }

  connectedCallback() {
    this.shadowRoot?.getElementById("btn")?.addEventListener("click", () => {
      alert("Button clicked!");
    });
  }

  disconnectedCallback() {
    this.shadowRoot
      ?.getElementById("btn")
      ?.removeEventListener("click", () => {});
  }
}

customElements.define("fish-app", MyElement);
