import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle } from '@app/helpers/index';
import '@app/helpers/index';


@customElement('intro-page')
export class IntroPage extends LitDocsStyle(LitElement) {

    render() {

        return html`

            <h1>LitDocs</h1>

            <p>
                This documentation you're currently viewing is created with
                LitDocs. And the documentation here describes how you can use
                LitDocs to make your own documentation.
            </p>

            <p>
                LitDocs is created in LitElement, and therefore it is suitable
                to use for LitElement related projects. It makes it easy to
                demonstrate your library, custom components, or anything you
                made to use together with LitElement or Web Components in
                general.
            </p>

            <h4>Installation</h4>

            <p>
                <lit-docs-code-block .code=${'npm install lit-docs'}></lit-docs-lit-docs-code-block>
            </p>
            
            <p>
                The package contains some web components, some mixins and some
                functions. They are documented here. Use the navigation to
                explore the utilities.
            </p>

        `;

    }

}
