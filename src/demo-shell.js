import { LitElement, property, html, css } from 'lit-element';


class DemoShell extends LitElement {

    _hashChangeCallback = null;

    static get properties() {
        return {
            pages: {type: Array},
            activePageHash: {type: String}
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this._addHashChangeCallback();
        this._setInitialActiveHash();
    }

    _addHashChangeCallback() {
        this._hashChangeCallback = window.addEventListener('hashchange', () => {
            this.activePageHash = location.hash.substr(1);
            window.scrollTo({ top: 0 });
        });
    }

    _setInitialActiveHash() {

        this.activePageHash = location.hash.substr(1);

        if (!this.activePageHash) {
            this.activePageHash = this.pages[0].hash;
        }

    }

    render() {

        return html`

            <header>
                <nav>${this.navButtons}</nav>
            </header>

            <article>
                ${this.activePage.template}
            </article>

        `;

    }

    get navButtons() {

        return this.pages.map(item => {

            return html`
                <button
                    @click=${() => location.hash = item.hash}
                    ?active=${this.activePage.hash == item.hash}
                >
                    ${item.title}
                </button>
            `;

        });

    }

    get activePage() {

        for (const item of this.pages) {
            if (item.hash == this.activePageHash) {
                return item;
            }
        }

        // If `this.activePageHash` is not found, fall back to first page
        return this.pages[0];

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
                margin-bottom: 15px;
            }

            nav {
                display: flex;
            }

            nav button {
                margin: 0;
                padding: 10px;
                border: 1px #999 solid;
                border-left-width: 0;
                background: #C7C3BB;
                color: #000;
                cursor: pointer;
            }

            nav button:first-child {
                border-left-width: 1px;
            }

            nav button:hover,
            nav button[active] {
                background: #DAD7D2;
            }

        `;

    }

}

customElements.define('demo-shell', DemoShell);
