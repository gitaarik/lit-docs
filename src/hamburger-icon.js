import { customElement, LitElement, html, css } from 'lit-element';


@customElement('hamburger-icon')
class HamburgerIcon extends LitElement {

    render() {
        return html`
            <svg viewBox="0 0 70 40" width="100%" height="100%">
              <rect width="70" height="5" rx="5"></rect>
              <rect width="70" height="5" rx="5" y="18"></rect>
              <rect width="70" height="5" rx="5" y="35"></rect>
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

            rect {
                fill: #7b8184;
            }

        `;

    }

}
