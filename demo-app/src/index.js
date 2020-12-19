import { customElement, LitElement, html } from 'lit-element';
import '@app/helpers/index';
import './demo-shell-usage';
import './code-blocks';


@customElement('lit-state-demo-app-helpers-demo')
export class LitStateDemoAppHelpersDemo extends LitElement {

    render() {
        return html`<demo-shell .pages=${this.pages}></demo-shell>`;
    }

    get pages() {
        return [
            {
                hash: 'demo-shell',
                title: 'Demo shell',
                template: html`<demo-shell-usage></demo-shell-usage>`
            },
            {
                hash: 'code-blocks',
                title: 'Code blocks',
                template: html`<code-blocks></code-blocks>`
            }
        ];
    }

}
