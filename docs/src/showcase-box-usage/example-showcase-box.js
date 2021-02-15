import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle } from '@app/lit-docs/index';
import '@app/lit-docs/index';


@customElement('example-showcase-box')
export class ExampleShowcaseBox extends LitDocsStyle(LitElement) {

    render() {

        return html`
            <showcase-box>
                <h2>Example showcase box</h2>
                <p>
                    This is an example of a showcase box. A showcase box can be
                    used to demonstrate some functionality.
                </p>
            </showcase-box>
        `;

    }

}
