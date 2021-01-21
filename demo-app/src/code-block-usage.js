import { customElement, LitElement, html } from 'lit-element';
import { litDocsUiState, LitDocsContent } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('code-block-usage')
export class CodeBlockUsage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Code block</h1>

            <p>
                Use code blocks to demonstrate code. When using
                <a href="lit-docs-style/" @click=${event => litDocsUiState.handlePageLinkClick(event)}>LitDocsStyle</a>,
                the default <code>&lt;code&gt;</code> blocks are styled and are
                good for tiny code snippets. For bigger code blocks, use
                <code>&lt;lit-docs-code-block&gt;</code>.
            </p>

            <h3>Usage</h3>

            <p>
                <lit-docs-code-block .code=${this.bigCodeDemoSource}></lit-docs-code-block>
            </p>

            <h3>Output</h3>

            <p>
                <showcase-box>
                    <lit-docs-code-block .code=${this.bigCodeDemo}></lit-docs-lit-docs-code-block>
                </showcase-box>
            </p>

            <h2>Code block with filename</h2>

            <h3>Usage</h3>

            <p>
                <lit-docs-code-block .code=${this.bigCodeWithFilenameDemoSource}></lit-docs-code-block>
            </p>

            <h3>Output</h3>

            <p>
                <showcase-box>
                    <lit-docs-code-block filename='my-function.js' .code=${this.bigCodeDemo}></lit-docs-code-block>
                </showcase-box>
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
import 'lit-docs';

const code = \`function() {
    console.log('hello!');
}\`;

html\`<lit-docs-code-block .code=\${code}></lit-docs-code-block>\`;`;
    }

    get bigCodeWithFilenameDemoSource() {

        return `import { html } from 'lit-element';
import 'lit-docs';

const code = \`function() {
    console.log('hello!');
}\`;

html\`<lit-docs-code-block filename='my-function.js' .code=\${code}></lit-docs-code-block>\`;`;

    }

}
