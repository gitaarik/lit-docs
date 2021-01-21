import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle, LitDocsAnchors } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('my-documentation-page')
class MyDocumentationPage extends LitDocsAnchors(LitDocsStyle(LitElement)) {

    render() {

        let someContent = [];

        for (let i = 0; i < 5; i++) {
            someContent.push(html`content<br />`);
        }

        return html`
            <h1>My documentation page</h1>
            <p>${someContent}</p>

            <h2>A h2 heading</h2>
            <p>${someContent}</p>

            <h2>A h2 heading</h2>
            <p>${someContent}</p>
        `;

    }

}


@customElement('lit-docs-anchors-usage')
class LitDocsAnchorsUsage extends LitDocsAnchors(LitDocsStyle(LitElement)) {

    render() {

        return html`

            <h1>Anchors</h1>

            <p>
                With <code>LitDocsAnchors</code> you can automatically add
                anchors to your heading elements (<code>&lt;h1&gt;</code>,
                <code>&lt;h2&gt;</code> etc). When you click on an anchor, the
                page scrolls to the anchor. Also the address in the locationbar
                will get a hashtag with the anchor name added. This address can
                be used to share a particular part of a documentation page.
            </p>

            <h2>Example</h2>

            <p>
                The heading text above get's an anchor icon when you hover over
                it. When you click on the link icon, the page will scroll to
                that part of the page. In the addressbar you'll see a hashtag:
                <code>#example</code>. When you share this URL to someone else,
                the page will open up at the scroll offset of that anchor.
            </p>

            <h2>Usage</h2>

            <p>
                Add the <code>LitDocsAnchors</code> mixin on your component.
                This will automatically add the anchors to your heading tags:
            </p>

            <p>
                <lit-docs-code-block .code=${this.litDocsAnchorsCode}></lit-docs-code-block>
            </p>

            <h2>Output</h2>

            <p>
                <showcase-box>
                    <my-documentation-page></my-documentation-page>
                </showcase-box>
            </p>

        `;

    }

    get litDocsAnchorsCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle, LitDocsAnchors } from 'lit-docs';


@customElement('my-documentation-page')
class MyDocumentationPage extends LitDocsAnchors(LitDocsStyle(LitElement)) {

    render() {

        const someContent = 'content\\n'.repeat(10);

        return html\`
            <h1>My documentation page</h1>
            <p>\${someContent}</p>

            <h2>A h2 heading</h2>
            <p>\${someContent}</p>

            <h2>A h2 heading</h2>
            <p>\${someContent}</p>
        \`;

    }

}`;

    }

}
