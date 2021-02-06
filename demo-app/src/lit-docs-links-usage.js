import { customElement, LitElement, html } from 'lit-element';
import { LitDocsContent } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('lit-docs-links-usage')
export class LitDocsLinksUsage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>Links</h1>

            <p>
                For internal links to other docs pages, use the
                <code>&lt;lit-docs-link&gt;</code> component. This ensures that
                the link click is handled by the router of LitDocsUI.
                Clicks with Ctrl/Shift to open in new tab/window also keeps
                working.
            </p>

            <h2>Usage</h2>

            <p>
                <code-block .code=${this.litDocsLinkCode}></code-block>
            </p>

            <h2>Output</h2>

            <p>
                <showcase-box>
                    <lit-docs-link href="components/links-usage/the-other-page/">
                        Go to the other page
                    </lit-docs-link>
                </showcase-box>
            </p>

        `;

    }

    get litDocsLinkCode() {
        return `<lit-docs-link href="other-page/">Go to the other page</lit-docs-link>`;
    }

}
