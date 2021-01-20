import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle, LitDocsAnchors } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('lit-docs-anchors-usage')
class LitDocsAnchorsUsage extends LitDocsAnchors(LitDocsStyle(LitElement)) {

    render() {

        return html`
            <h1>LitAnchor</h1>
            <p>Yes.</p>
        `;

    }

}
