import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from 'lit-element-state';
import '@app/helpers/index';
import './demo-shell-usage';


@customElement('lit-state-demo-app-helpers-demo')
export class LitStateDemoAppHelpersDemo extends LitStateElement {

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
                template: html`How to use code blocks`
            }
        ];
    }

}
