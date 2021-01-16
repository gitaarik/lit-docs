import { LitElement, property, html, css } from 'lit-element';


class DemoShell extends LitElement {

    _hashChangeCallback = null;

    @property({type: Boolean})
    showMenu = false;

    static get properties() {
        return {
            pages: {type: Array},
            activePageHash: {type: String}
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this._fixMenuWidthOnPageWidthChange();
        this._addHashChangeCallback();
        this._setInitialActiveHash();
    }

    firstUpdated() {
        super.firstUpdated();
        this._fixMenuWidth();
    }

    _fixMenuWidth() {
        this.shadowRoot.getElementById('menuSidebarContent').style.maxWidth = (
            this.shadowRoot.getElementById('menuSidebar').clientWidth + 'px'
        );
    }

    _resetMenuWidth() {
        this.shadowRoot.getElementById('menuSidebarContent').style.maxWidth = 'none';
    }

    _fixMenuWidthOnPageWidthChange() {
        window.addEventListener('resize', () => this._fixMenuWidth());
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

            <div id="layout" ?show-menu=${this.showMenu}>

                <div id="menuSidebar">
                    <div id="menuSidebarContent">
                        <header><a href="#">${this.title}</a></header>
                        <nav>${this.navTree}</nav>
                    </div>
                </div>

                <article>
                    <div id="articleContent">
                        ${this.activePage.template}
                    </div>
                </article>

            </div>

            <div id="menuOpener" @click=${this.handleMenuOpenerClick} ?hidden=${this.showMenu}>
                <div class="stripe"></div>
                <div class="stripe"></div>
                <div class="stripe"></div>
            </div>

        `;

    }

    get navTree() {

        return this.pages.map(item => {

            return html`
                <div class="navItem"
                    @click=${() => this.handleMenuItemClick(item)}
                    ?active=${this.activePage.hash == item.hash}
                >
                    ${item.title}
                </div>
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

    handleMenuItemClick(item) {
        location.hash = item.hash;
        this.showMenu = false;
    }

    handleMenuOpenerClick() {
        this.showMenu = true;
        this._resetMenuWidth();
    }

    static get styles() {

        return css`

            * {
                box-sizing: border-box;
                --left-sidebar-width: 250px;
                --header-height: 40px;
                --min-article-width: 300px;
            }

            #layout {
                display: flex;
                margin: 0 auto;
                min-height: 100vh;
            }

            #menuSidebar {
                position: relative;
                width: 100%;
                max-width: var(--left-sidebar-width);
                background: #bcb9b2;
                border-right: 1px #999 solid;
            }

            #menuSidebarContent {
                position: fixed;
                width: 100%;
                max-width: var(--left-sidebar-width);
            }

            #menuSidebarContent header {
                display: flex;
                justify-content: center;
                align-items: center;
                height: var(--header-height);
            }

            #menuSidebarContent header a {
                display: inline-block;
                padding: 5px;
                color: #000;
                font-weight: 600;
                text-decoration: none;
                font-size: 20px;
            }

            nav {
                display: flex;
                flex-direction: column;
                max-height: calc(100vh - var(--header-height));
                overflow: auto;
            }

            .navItem {
                margin: 0;
                padding: 10px;
                border: 1px #999 solid;
                border-width: 1px 0 0 0;
                background: #C7C3BB;
                color: #000;
                text-align: left;
                cursor: pointer;
            }

            .navItem:last-child {
                border-bottom-width: 1px;
            }

            .navItem:hover,
            .navItem[active] {
                background: #DAD7D2;
            }

            article {
                flex-grow: 0;
                min-width: var(--min-article-width);
            }

            #articleContent {
                padding: 20px;
                max-width: 720px;
                width: 100%;
            }

            @media screen and (min-width: 501px) {

                #sideBarOpener {
                    display: none;
                }

            }

            @media screen and (max-width: 500px) {

                #menuSidebar {
                    display: none;
                }

                #layout[show-menu] #menuSidebar {
                    display: block;
                    position: absolute;
                }

                #layout[show-menu] article {
                    display: none;
                }

                #menuOpener {
                    position: fixed;
                    top: 5px;
                    right: 5px;
                    width: 35px;
                    height: 35px;
                    cursor: pointer;
                }

                #menuOpener .stripe {
                    width: 100%;
                    height: 4px;
                    margin: 5px 0;
                    background: grey;
                }

            }

        `;

    }

}

customElements.define('demo-shell', DemoShell);
