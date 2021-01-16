import { customElement, LitElement, html } from 'lit-element';
import { DemoComponent } from '@app/helpers/index';


@customElement('example-demo-component')
export class ExampleDemoComponent extends DemoComponent(LitElement) {

    render() {

        return html`
            <h2>H2 tag</h2>
            <h3>Normal H3 tag</h3>
            <h3 class="status">Status H3 tag</h3>
            <h3 class="value">Value H3 tag</h3>
            <div class="buttons">
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
                <button>Button 4</button>
            </div>
        `;

    }

}
