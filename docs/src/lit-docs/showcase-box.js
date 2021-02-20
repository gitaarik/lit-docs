import { LitElement, html, css } from 'lit-element';


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
                    background: rgb(65, 65, 65);
                }

            }

        `;

    }

}


customElements.define('showcase-box', ShowcaseBox);
