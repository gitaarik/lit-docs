import { LitElement, html, css } from 'lit-element';


export class CodeSmall extends LitElement {

    render() {
        return html`<slot></slot>`;
    }

    static get styles() {
        return css`
            :host {
                display: inline-block;
                padding: 2px 6px;
                margin: 1px;
                background: #444;
                border-radius: 5px;
                color: white;
                white-space: pre;
            }
        `;
    }

}

customElements.define('code-small', CodeSmall);
