import { customElement, LitElement, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import '@app/helpers/index';


@customElement('demo-page-usage')
export class DemoPageUsage extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>DemoPage</h1>

            <p>
                The <code>DemoPage</code> mixin should be used for
                the demo pages that are provided to the
                <code>&lt;demo-shell&gt;</code> component, like the
                current page you're reading. It adds some basic styles for the
                page, so that all demo pages have consistent styling.
            </p>

            <h2>Usage</h2>

            <p>
                <code-block .code=${this.demoShellCode}></code-block>
            </p>

        `;

    }

    get demoShellCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { DemoPage } from 'lit-element-demo-app-helpers';


@customElement('demo-page')
export class DemoPage extends DemoPage(LitElement) {

    render() {
        return html\`
            <h1>This h1 tag is styled by the DemoPage</h1>
            <p>And this p tag also. <code>this is some code</code>.</p>
        \`;
    }

}`;

    }

}
