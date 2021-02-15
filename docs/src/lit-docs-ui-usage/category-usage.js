import { customElement, LitElement, html } from 'lit-element';
import { litDocsUiState, LitDocsContent } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('category-usage')
export class CategoryUsage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Categories</h1>

            <p>
                You can create a category in the menu that is not clickable.
                Just omit the <code>template</code> key. And put the items of
                the category in a <code>submenu</code>.
            </p>

            <h3>Usage</h3>

            <p>
                <code-block .code=${this.categoryCode}></code-block>
            </p>

        `;

    }

    get categoryCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import 'lit-docs';
import './demo-page-1.js';
import './demo-page-2.js';


@customElement('my-demo-app')
export class MyDemoApp extends LitElement {

    render() {
        return html\`
            <lit-docs-ui
                docsTitle="My Lib"
                .pages=\${this.pages}
            ></lit-docs-ui>
        \`;
    }

    get pages() {
        return [
            {
                title: 'My category',
                path: 'my-category'
                submenu: [
                    {
                        title: 'Page 1',
                        path: 'page1',
                        template: html\`<demo-page-1></demo-page-1>\`
                    },
                    {
                        title: 'Page 2',
                        path: 'page2',
                        template: html\`<demo-page-2></demo-page-2>\`
                    }
                ]
            },
        ];
    }

}`;

    }

}
