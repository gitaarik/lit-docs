import { customElement, LitElement, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import '@app/helpers/index';


@customElement('code-blocks')
export class CodeBlocks extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>Code blocks</h1>

            <p>Use the code blocks to demonstrate how your library should be used.</p>

            <h3>Example:</h3>

            <p>
                <code-block .code=${this.bigCodeDemo}></code-block>
            </p>

            <h3>Usage:</h3>

            <p>
                <code-block .code=${this.bigCodeDemoSource}></code-block>
            </p>

            <h2>Code block with filename</h2>

            <h3>Example:</h3>

            <p>
                <code-block filename='my-function.js' .code=${this.bigCodeDemo}></code-block>
            </p>

            <h3>Usage:</h3>

            <p>
                <code-block .code=${this.bigCodeWithFilenameDemoSource}></code-block>
            </p>

        `;

    }

    get bigCodeDemo() {
        return `function() {
    console.log('hello!');
}`;
    }

    get bigCodeDemoSource() {
        return `import { html } from 'lit-element';
import 'lit-element-demo-app-helpers';

const code = \`function() {
    console.log('hello!');
}\`;

html\`<code-block .code=\${code}></code-block>\`;`;
    }

    get bigCodeWithFilenameDemoSource() {

        return `import { html } from 'lit-element';
import 'lit-element-demo-app-helpers';

const code = \`function() {
    console.log('hello!');
}\`;

html\`<code-block filename='my-function.js' .code=\${code}></code-block>\`;`;

    }

}
