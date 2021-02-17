import { LitElement, html, css } from '../../web_modules/lit-element.js';

class ShowcaseBox extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  static get styles() {
    return css`

            :host {
                display: block;
                padding: 15px;
                background: #DAD7D2;
                border: 1px #666 solid;
            }

            @media (prefers-color-scheme: dark) {

                :host {
                    background: rgb(51, 55, 58);
                }

            }

        `;
  }

}

customElements.define('showcase-box', ShowcaseBox);