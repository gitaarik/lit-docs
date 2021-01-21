import { customElement, LitElement, html } from 'lit-element';
import { LitDocsContent } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('intro-page')
export class IntroPage extends LitDocsContent(LitElement) {

    render() {

        return html`

            <h1>LitDocs</h1>

            <p>
                The documentation you're currently viewing is created with
                LitDocs. This documentation describes how you can use LitDocs
                to make pretty documentation for your own projects.
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
