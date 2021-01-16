import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('lit-docs-style-usage')
export class LitDocsStyleUsage extends LitDocsStyle(LitElement) {

    render() {

        return html`

            <h1>LitDocsStyle</h1>

            <p>
                The <code>LitDocsStyle</code> mixin should be used to apply
                general styles to the components that contain the documentation
                content. You can apply it to your component by using it as a
                mixin on your component:
            </p>

            <h2>Usage</h2>

            <p>
                <lit-docs-code-block .code=${this.litDocsStyleCode}></lit-docs-code-block>
            </p>

        `;

    }

    get litDocsStyleCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle } from 'lit-docs';


@customElement('my-component')
export class MyComponent extends LitDocsStyle(LitElement) {

    render() {
        return html\`
            <h1>This h1 tag is styled by LitDocsStyle</h1>
            <p>And this p tag also. <code>this is some code</code>.</p>
        \`;
    }

}`;

    }

}
