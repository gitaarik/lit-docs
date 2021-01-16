import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('lit-docs-ui-usage')
export class LitDocsUiUsage extends LitDocsStyle(LitElement) {

    render() {

        return html`

            <h1>LitDocs UI</h1>

            <p>
                The <code>&lt;lit-docs-ui&gt;</code> component creates the
                basic page layout and navigation that you see on this page. You
                provide it a title and an array of pages, and the navigation is
                automatically created for you.
            </p>

            <h2>Usage</h2>

            <p>
                <lit-docs-code-block .code=${this.litDocsUiCode}></lit-docs-code-block>
            </p>

        `;

    }

    get litDocsUiCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import 'lit-docs';
import './demo-page-1.js';
import './demo-page-2.js';


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
                hash: 'page1',
                title: 'Page 1',
                template: html\`<demo-page-1></demo-page-1>\`
            },
            {
                hash: 'page2',
                title: 'Page 2',
                template: html\`<demo-page-2></demo-page-2>\`
            }
        ];
    }

}`;

    }

}
