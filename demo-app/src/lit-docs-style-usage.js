import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle } from '@app/lit-docs/index';
import { LitAnchor } from './lit-anchor.js';
import '@app/lit-docs/index';


@customElement('lit-docs-style-show-case')
class LitDocsStyleShowCase extends LitAnchor(LitElement) {

    render() {

        return html`

            <h1>This s a &lt;h1&gt; tag</h1>
            <h2>This s a &lt;h2&gt; tag</h2>
            <h3>This s a &lt;h3&gt; tag</h3>
            <h4>This s a &lt;h4&gt; tag</h4>
            <h5>This s a &lt;h5&gt; tag</h5>
            <h6>This s a &lt;h6&gt; tag</h6>

            <p>This is a &lt;p&gt; tag. <code>this is some code</code>.</p>

        `;

    }

}


@customElement('lit-docs-style-usage')
export class LitDocsStyleUsage extends LitAnchor(LitDocsStyle(LitElement)) {

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

            <h2>Output</h2>

            <p>
                <lit-docs-style-show-case></lit-docs-style-show-case>
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
