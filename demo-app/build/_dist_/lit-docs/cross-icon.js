import { LitElement, html, css } from '../../web_modules/lit-element.js';

class CrossIcon extends LitElement {
  render() {
    return html`
            <svg viewBox="0 0 100 100" width="100%" height="100%">
                <line x1="0" y1="0" x2="100" y2="100" />
                <line x1="100" y1="0" x2="0" y2="100" />
            </svg>
        `;
  }

  static get styles() {
    return css`

            :host {
                display: block;
            }

            svg {
                height: 100%;
            }

            line {
                stroke: #7b8184;
                stroke-width: 5px;
            }

        `;
  }

}

customElements.define('cross-icon', CrossIcon);