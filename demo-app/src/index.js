import { customElement, LitElement, html } from 'lit-element';
import '@app/helpers/index';
import './demo-app-helpers-usage';
import './demo-shell-usage';
import './demo-page-mixin';
import './demo-component-mixin/index';
import './code-blocks';
import './utils-functions';


@customElement('lit-state-demo-app-helpers-demo')
export class LitStateDemoAppHelpersDemo extends LitElement {

    render() {
        return html`<demo-shell .pages=${this.pages}></demo-shell>`;
    }

    get pages() {
        return [
            {
                hash: 'demo-app-helpers',
                title: 'Demo app helpers',
                template: html`<demo-app-helpers-usage></demo-app-helpers-usage>`
            },
            {
                hash: 'demo-shell',
                title: 'Demo shell',
                template: html`<demo-shell-usage></demo-shell-usage>`
            },
            {
                hash: 'demo-page-mixin',
                title: 'Demo page mixin',
                template: html`<demo-page-mixin></demo-page-mixin>`
            },
            {
                hash: 'code-blocks',
                title: 'Code blocks',
                template: html`<code-blocks></code-blocks>`
            },
            {
                hash: 'demo-component-mixin',
                title: 'Demo component mixin',
                template: html`<demo-component-mixin></demo-component-mixin>`
            },
            {
                hash: 'util-functions',
                title: 'Utils',
                template: html`<util-functions></util-functions>`
            },
        ];
    }

}
