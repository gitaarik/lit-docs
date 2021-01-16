import { customElement, LitElement, html, css } from 'lit-element';
import '@app/helpers/index';
import './intro-page.js';
import './demo-shell-usage.js';
import './demo-page-usage.js';
import './demo-component/index.js';
import './code-blocks.js';


@customElement('lit-docs-documentation')
export class LitDocsDocumentation extends LitElement {

    render() {
        return html`<demo-shell title="LitDocs" .pages=${this.pages}></demo-shell>`;
    }

    get pages() {
        return [
            {
                hash: 'intro-page',
                title: 'Introduction',
                template: html`<intro-page></intro-page>`
            },
            {
                hash: 'demo-shell',
                title: 'Demo shell',
                template: html`<demo-shell-usage></demo-shell-usage>`
            },
            {
                hash: 'demo-page-usage',
                title: 'Demo page',
                template: html`<demo-page-usage></demo-page-usage>`
            },
            {
                hash: 'code-blocks',
                title: 'Code blocks',
                template: html`<code-blocks></code-blocks>`
            },
            {
                hash: 'demo-component',
                title: 'Demo component',
                template: html`<demo-component></demo-component>`
            }
        ];
    }

    static get styles() {

        return css`
            :host {
                display: block;
                min-height: 100vh;
            }
        `;

    }

}
