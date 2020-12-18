import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from 'lit-element-state';
import '@app/helpers/index';


@customElement('demo-shell-usage')
export class DemoShellUsage extends LitStateElement {

    render() {

        return html`

            <p>
                The <code-small>&lt;demo-shell&gt;</code-small> component
                creates the basic page layout and navigation. You provide it an
                array of pages, and the navigation is automatically created for
                you.
            </p>

            <p>
                <code-big .code=${this.demoShellCode}></code-big>
            </p>

        `;

    }

    get demoShellCode() {

        return `
import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from 'lit-element-state';
import 'lit-state-demo-app-helpers';


@customElement('my-demo-app')
export class MyDemoApp extends LitStateElement {

    render() {
        return html\`<demo-shell .pages=\${this.pages}></demo-shell>\`;
    }

    get pages() {
        return [
            {
                hash: 'page1',
                title: 'Page 1',
                template: html\`Page 1 content\`
            },
            {
                hash: 'page2',
                title: 'Page 2',
                template: html\`Page 2 content\`
            }
        ];
    }

}`;

    }

}
