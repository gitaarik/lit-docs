import { customElement, LitElement, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import '@app/helpers/index';


@customElement('demo-page-mixin')
export class DemoPageMixin extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>DemoPage Mixin</h1>

            <p>
                The <code-small>DemoPage</code-small> mixin should be used for
                the demo pages that are provided to the
                <code-small>&lt;demo-shell&gt;</code-small> component, like the
                current page you're reading. It adds some basic styles for the
                page, so that all demo pages have consistent styling.
            </p>

            <h2>Usage</h2>

            <p>
                <code-big .code=${this.demoShellCode}></code-big>
            </p>

        `;

    }

    get demoShellCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { DemoPage } from 'lit-element-demo-app-helpers';


@customElement('demo-page-mixin')
export class DemoPageMixin extends DemoPage(LitElement) {

    render() {
        return html\`
            <h1>This h1 tag is styled by the DemoPage mixin</h1>
            <p>And this p tag also</p>
        \`;
    }

}`;

    }

}
