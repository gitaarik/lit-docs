import { LitElement, property, html, css } from '../../web_modules/lit-element.js';
import { LitDocsStyle } from './lit-docs-style.js';
import { litDocsUiState } from './lit-docs-ui.js';

class LitDocsLink extends LitDocsStyle(LitElement) {
  static get properties() {
    return {
      path: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.path = '';
  }

  render() {
    // Don't leave no spaces in the template, because the host is an inline
    // element.
    return html`<a href=${this._href}
            @click=${event => litDocsUiState.handlePageLinkClick(event)}
        ><slot></slot></a>`;
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