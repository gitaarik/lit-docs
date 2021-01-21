import { customElement, LitElement, html } from 'lit-element';
import { LitDocsContent } from '@app/lit-docs/index';


@customElement('content-showcase-box')
class ContentShowcaseBox extends LitDocsContent(LitElement) {

    render() {

        let someContent = [];

        for (let i = 0; i < 5; i++) {
            someContent.push(html`content<br />`);
        }

        return html`

            <showcase-box>

                <h1>My documentation page</h1>
                <p>${someContent}</p>

                <h2>A h2 heading</h2>
                <p>${someContent}</p>

                <h3>A h3 heading</h3>
                <p>${someContent}</p>

            </showcase-box>

        `;

    }

}
