import { LitElement, html, css } from '../../web_modules/lit-element.js';
export class CodeSmall extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static get styles() {
    return css`
            :host {
                display: inline-block;
                padding: 1px 2px;
                margin: 1px;
                background: #444;
                color: white;
                white-space: pre;
            }
        `;
  }

}
customElements.define('code-small', CodeSmall);