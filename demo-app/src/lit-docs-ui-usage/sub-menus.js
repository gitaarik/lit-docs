import { customElement, LitElement, html } from 'lit-element';
import { LitDocsContent } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('sub-menus')
export class SubMenus extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Submenus</h1>

            <p>
                You can add submenu items to your main menu items by using the
                <code>submenu</code> key in the page object:
            </p>

            <p>
                <code-block .code=${this.subMenuCode}></code-block>
            </p>

        `;

    }

    get subMenuCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import 'lit-docs';
import './demo-page1.js';
import './demo-page1-subpage1.js';
import './demo-page1-subpage2.js';
import './demo-page2.js';
import './demo-page2-subpage1.js';
import './demo-page2-subpage2.js';


@customElement('my-demo-app')
export class MyDemoApp extends LitElement {

    render() {
        return html\`
            <lit-docs-ui
                .docsTitle=\${'My Lib'}
                .pages=\${this.pages}
            ></lit-docs-ui>
        \`;
    }

    get pages() {
        return [
            {
                title: 'Page 1',
                path: 'page1',
                template: html\`<demo-page1></demo-page1>\`,
                submenu: [
                    {
                        title: 'Sub Page 1',
                        path: 'page1',
                        template: html\`<demo-page1-subpage1></demo-page1-subpage1>\`
                    },
                    {
                        title: 'Sub Page 2',
                        path: 'page2',
                        template: html\`<demo-page1-subpage2></demo-page1-subpage2>\`
                    }
                ]
            },
            {
                title: 'Page 2',
                path: 'page2',
                template: html\`<demo-page2></demo-page2>\`,
                submenu: [
                    {
                        title: 'Sub Page 1',
                        path: 'page1',
                        template: html\`<demo-page2-subpage1></demo-page2-subpage1>\`
                    },
                    {
                        title: 'Sub Page 2',
                        path: 'page2',
                        template: html\`<demo-page2-subpage2></demo-page2-subpage2>\`
                    }
                ]
            }
        ];
    }

}`;

    }

}
