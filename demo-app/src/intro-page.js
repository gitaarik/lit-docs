import { customElement, LitElement, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import '@app/helpers/index';


@customElement('intro-page')
export class IntroPage extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>LitDocs</h1>

            <p>
                These are utilities to create documentation for LitElement
                related projects, like the one you're currently viewing. It is
                created in LitElement itself, and therefore it is easy to
                demonstrate your library, custom components, or anything you
                made to use together with LitElement or Web Components in
                general.
            </p>

            <p>Install with:</p>

            <p>
                <code-block .code=${'npm install lit-docs'}></code-block>
            </p>
            
            <p>
                The package contains some web components, some mixins and some
                functions. They are documented here. Use the navigation to
                explore the utilities.
            </p>

        `;

    }

}
