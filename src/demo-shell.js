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
                <h1>${this.activePage.title}</h1>
                ${this.activePage.template}
            </article>

        `;

    }

    get navButtons() {

        return this.pages.map(item => {

            return html`
                <button
                    @click=${() => location.hash = item.hash}
                    ?active=${this.activePageHash == item.hash}
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

            h1 {
                margin: 0;
                font-size: 25px;
            }

        `;

    }

}

customElements.define('demo-shell', DemoShell);
