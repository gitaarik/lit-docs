import { customElement, LitElement, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import '@app/helpers/index';


@customElement('code-blocks')
export class CodeBlocks extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>Code blocks</h1>

            <h2>Small code block</h2>

            <h3>Example:</h3>

            <p>
                Normal text, <code-small>code styled text</code-small>.
            </p>

            <h3>Usage:</h3>

            <p>
                <code-big .code=${this.smallCodeDemo}></code-big>
            </p>

            <h2>Big code block</h2>

            <h3>Example:</h3>

            <p>
                <code-big .code=${this.bigCodeDemo}></code-big>
            </p>

            <h3>Usage:</h3>

            <p>
                <code-big .code=${this.bigCodeDemoSource}></code-big>
            </p>

        `;

    }

    get smallCodeDemo() {
        return `import { html } from 'lit-element';
import 'lit-state-demo-app-helpers';

html\`Normal text, <code-small>code styled text</code-small>.\`;`;
    }

    get bigCodeDemo() {
        return `function() {
    console.log('hello!');
}`;
    }

    get bigCodeDemoSource() {
        return `import { html } from 'lit-element';
import 'lit-state-demo-app-helpers';

const code = \`function() {
    console.log('hello!');
}\`;

html\`<code-big .code=\${code}></code-big>\`;`;
    }

}
