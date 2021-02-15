import { customElement, LitElement, html } from 'lit-element';
import { LitDocsContent } from '@app/lit-docs/index';
import '@app/lit-docs/index';
import './content-showcase-box.js';


@customElement('lit-docs-content-usage')
class LitDocsContentUsage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Content</h1>

            <p>
                It often occurs that <code>LitDocsStyle</code> and
                <code>LitDocsAnchors</code> are used together. Therefore, there
                is a helper mixin <code>LitDocsContent</code> which applies
                both mixins. To apply the style and add anchors functionality.
            </p>

            <h2>Usage</h2>

            <p>
                <code-block .code=${this.litDocsContentCode}></code-block>
            </p>

            <h2>Output</h2>

            <p>
                <content-showcase-box></content-showcase-box>
            </p>

        `;

    }

    get litDocsContentCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { LitDocsContent } from 'lit-docs';


@customElement('my-documentation-page')
class MyDocumentationPage extends LitDocsContent(LitElement) {

    render() {

        let someContent = [];

        for (let i = 0; i < 5; i++) {
            someContent.push(html\`content<br />\`);
        }

        return html\`

            <h1>My documentation page</h1>
            <p>\${someContent}</p>

            <h2>A h2 heading</h2>
            <p>\${someContent}</p>

            <h3>A h3 heading</h3>
            <p>\${someContent}</p>

        \`;

    }

}`;

    }

}
