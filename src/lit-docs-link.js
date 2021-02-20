import { LitElement, property, html, css } from 'lit-element';
import { LitDocsStyle } from './lit-docs-style.js';
import { litDocsUiState } from './lit-docs-ui.js';


class LitDocsLink extends LitDocsStyle(LitElement) {

    static get properties() {
        return {
            path: {type: String}
        };
    }

    constructor() {
        super();
        this.path = '';
    }

    render() {
        // Don't leave no spaces in the template, because the host is an inline
        // element.
        return html`<a href=${(litDocsUiState.useHash ? '#' : '') + this.path}
            @click=${this.handleLinkClick}
        ><slot></slot></a>`;
    }

    handleLinkClick(event) {
        event.preventDefault();
        litDocsUiState.navToPath(this.path);
    }

    get _href() {

        if (litDocsUiState.useHash) {
            return '#' + this.path;
        }

        return this.path;

    }

    static get styles() {
        return css`
            :host {
                display: inline;
            }
        `;
    }

}


customElements.define('lit-docs-link', LitDocsLink);
