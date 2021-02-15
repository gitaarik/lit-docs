import { customElement, LitElement, html } from 'lit-element';
import { LitDocsContent } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('the-other-page')
export class TheOtherPage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>The other page</h1>

            <p>
                This is the other page.
                <lit-docs-link href="components/links-usage/">Go back</lit-docs-link>.
            </p>

        `;

    }

}
