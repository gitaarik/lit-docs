import { customElement, LitElement, html, css } from 'lit-element';
import '@app/lit-docs/index';
import './intro-page.js';
import './lit-docs-ui-usage/index.js';
import './lit-docs-ui-usage/sub-menus.js';
import './lit-docs-ui-usage/category-usage.js';
import './lit-docs-style-usage.js';
import './lit-docs-anchors-usage.js';
import './lit-docs-content-usage.js';
import './code-block-usage.js';
import './showcase-box-usage/index.js';
import './lit-docs-links-usage.js';
import './the-other-page.js';


window.BASE_URL = '/lit-docs/build/';


@customElement('lit-docs-documentation')
export class LitDocsDocumentation extends LitElement {

    render() {
        return html`
            <lit-docs-ui
                .docsTitle=${'LitDocs'}
                .pages=${this.pages}
            ></lit-docs-ui>
        `;
    }

    get pages() {
        return [
            {
                title: 'Introduction',
                path: 'introduction',
                template: html`<intro-page></intro-page>`
            },
            {
                title: 'Menu and pages',
                path: 'menu-and-pages',
                template: html`<lit-docs-ui-usage></lit-docs-ui-usage>`,
                submenu: [
                    {
                        title: 'Submenus',
                        path: 'sub-menus',
                        template: html`<sub-menus></sub-menus>`
                    },
                    {
                        title: 'Category',
                        path: 'category',
                        submenu: [
                            {
                                title: 'How to',
                                path: 'category-menu-item-usage',
                                template: html`<category-usage></category-usage>`
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Page content',
                path: 'page-content',
                submenu: [
                    {
                        title: 'Basic styling',
                        path: 'basic-styling',
                        template: html`<lit-docs-style-usage></lit-docs-style-usage>`
                    },
                    {
                        title: 'Anchors',
                        path: 'anchors',
                        template: html`<lit-docs-anchors-usage></lit-docs-anchors-usage>`
                    },
                    {
                        title: 'Content',
                        path: 'content',
                        template: html`<lit-docs-content-usage></lit-docs-content-usage>`
                    }
                ]
            },
            {
                title: 'Components',
                path: 'components',
                submenu: [
                    {
                        title: 'Code blocks',
                        path: 'code-blocks',
                        template: html`<code-block-usage></code-block-usage>`
                    },
                    {
                        title: 'Showcase boxes',
                        path: 'showcase-boxes',
                        template: html`<showcase-box-usage></showcase-box-usage>`
                    },
                    {
                        title: 'Links',
                        path: 'links-usage',
                        template: html`<lit-docs-links-usage></lit-docs-links-usage>`,
                        submenu: [
                            {
                                title: 'The other page',
                                path: 'the-other-page',
                                template: html`<the-other-page></the-other-page>`
                            }
                        ]
                    }
                ]
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
