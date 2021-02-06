import { customElement, LitElement, property, html } from 'lit-element';


@customElement('lit-docs-link')
class LitDocsLink extends LitElement {

    @property() href = '';

    render() {
        return html`<a href=${this.href}><slot></slot></a>`;
    }

}
