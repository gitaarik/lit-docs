import { customElement, LitElement, property, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import '@app/helpers/index';


@customElement('code-blocks')
export class CodeBlocks extends DemoPage(LitElement) {

    render() {

        return html`

            <h2>Small code block</h2>

            <h3>Code:</h3>

            <p>
                <code-big .code=${'Normal text, <code-small>code styled text</code-small>.'}></code-big>
            </p>

            <h3>Output:</h3>

            <p>
                Normal text, <code-small>code styled text</code-small>.
            </p>

            <h2>Big code block</h2>

            <h3>Code:</h3>

            <p>
                <code-big .code=${this.bigCodeDemoSource}></code-big>
            </p>

            <h3>Output:</h3>

            <p>
                <code-big .code=${this.bigCodeDemo}></code-big>
            </p>

        `;

    }

    get bigCodeDemo() {
        return `function() {
    console.log('hello!');
}`;
    }

    get bigCodeDemoSource() {
        return `const code = \`function() {
    console.log('hello!');
}\`;

return html\`<code-big .code=\${code}></code-big>\`;`;
    }

}
