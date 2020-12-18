import { customElement, property, html, css } from 'lit-element';
import { LitStateElement } from './lit-state.js';
import './async-state-var/index';
import './async-state-var-update/index';
import './async-state-var-update-cache/index';


@customElement('header-nav')
export class HeaderNav extends LitStateElement {

    @property() navItems = [];
    @property() activeTab = location.hash.substr(1);

    _hashChangeCallback = null;

    connectedCallback() {
        super.connectedCallback();
        this._addHashChangeCallback();
        this._setInitialActiveTab();
    }

    _addHashChangeCallback() {
        this._hashChangeCallback = window.addEventListener('hashchange', () => {
            this.activeTab = location.hash.substr(1);
            window.scrollTo({ top: 0 });
        });
    }

    _setInitialActiveTab() {

        if (this.activeTab) {
            return;
        }

        this.activeTab = this.navItems[0][0];

    }

    render() {

        return html`

            <header>
                <nav>${this.navButtons}</nav>
            </header>

            <article>
                ${this.tabContents}
            </article>

        `;

    }

    get navButtons() {

        return this.navItems.map(item => {

            return html`
                <button
                    @click=${() => location.hash = item[0]}
                    ?active=${this.activeTab == item[0]}
                >
                    ${item[1]}
                </button>
            `;

        });

    }

    get tabContents() {

        switch (this.activeTab) {

            default:
            case 'state-var':
                return html`<state-var></state-var>`;

            case 'async-state-var':
                return html`<async-state-var></async-state-var>`;

            case 'async-state-var-update':
                return html`<async-state-var-update></async-state-var-update>`;

            case 'async-state-var-update-cache':
                return html`<async-state-var-update-cache></async-state-var-update-cache>`;

            case 'different-vars-on-rerender':
                return html`<different-vars-on-rerender></different-vars-on-rerender>`;

            case 'mixin-usage':
                return html`<mixin-usage></mixin-usage>`;

        }

    }

    static get styles() {

        return css`

            :host {
                display: block;
                margin: 0 auto;
                padding: 15px;
                max-width: 720px;
            }

            header {
                margin-bottom: 25px;
            }

            nav {
                display: flex;
            }

            nav button {
                margin: 0;
                padding: 10px;
                border: 1px #999 solid;
                border-left-width: 0;
                background: #DDD;
                color: #000;
                cursor: pointer;
            }

            nav button:first-child {
                border-left-width: 1px;
            }

            nav button:hover {
                background: #EEE;
            }

            nav button[active] {
                background: #FFF;
            }

        `;

    }

}
