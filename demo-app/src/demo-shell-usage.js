import { customElement, LitElement, property, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import '@app/helpers/index';


@customElement('demo-shell-usage')
export class DemoShellUsage extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>Demo Shell</h1>

            <p>
                The <code-small>&lt;demo-shell&gt;</code-small> component
                creates the basic page layout and navigation that you see on
                this page. You provide it an array of pages, and the navigation
                is automatically created for you.
            </p>

            <h2>Usage</h2>

            <p>
                <code-big .code=${this.demoShellCode}></code-big>
            </p>

        `;

    }

    get demoShellCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import 'lit-state-demo-app-helpers';
import './demo-page-1.js';
import './demo-page-2.js';


@customElement('my-demo-app')
export class MyDemoApp extends LitElement {

    render() {
        return html\`<demo-shell .pages=\${this.pages}></demo-shell>\`;
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
