import { customElement, LitElement, property, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import '@app/helpers/index';


@customElement('demo-app-helpers-usage')
export class DemoAppHelpersUsage extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>LitElement Demo App Helpers</h1>

            <p>
                These are helper utilities to create a demo app like the one
                you're currently viewing. It is meant for creators of
                LitElement related libraries. You can use these helpers to make
                a demo app to demonstrate your library. It's also useful as a
                testing app for the features of your library, for while you're
                developing.
            </p>

            <p>Install with:</p>

            <p>
                <code-big .code=${'npm install lit-element-demo-app-helpers'}></code-big>
            </p>
            
            <p>
                The package contains some web components, some mixins and some
                functions. They are documented in this demo app. Use the tabs
                at the top of the page to see the different helpers.
            </p>

        `;

    }

}
