import { customElement, LitElement, property, html, css } from 'lit-element';
import { LitDocsStyle } from './lit-docs-style.js';
import './hamburger-icon.js';
import './cross-icon.js';


@customElement('lit-docs-ui')
class LitDocsUI extends LitDocsStyle(LitElement) {

    @property({type: String})
    docsTitle = '';

    @property({type: Array})
    pages = [];

    @property({type: Boolean})
    _showMenu = false;

    @property({type: String})
    _activePage = '';

    connectedCallback() {
        super.connectedCallback();
        this._initActivePage();
        this._fixMenuWidthOnPageWidthChange();
    }

    firstUpdated() {
        super.firstUpdated();
        this._fixMenuWidth();
    }

    _initActivePage() {

        const path = window.location.pathname.substr(1);

        if (path) {
            for (const page of this.pages) {
                if (page.path === window.location.pathname.substr(1)) {
                    this._activePage = page;
                    return;
                }
            }
        }

        // If no page was not found, fall back to first page
        this._activePage = this.pages[0];

    }

    _fixMenuWidth() {
        this.shadowRoot.getElementById('menuSidebarContent').style.maxWidth = (() => {
            if (window.innerWidth > 500) {
                return this.shadowRoot.getElementById('menu').clientWidth + 'px';
            } else {
                return 'none';
            }
        })();
    }

    _resetMenuWidth() {
        this.shadowRoot.getElementById('menuSidebarContent').style.maxWidth = 'none';
    }

    _fixMenuWidthOnPageWidthChange() {
        window.addEventListener('resize', () => this._fixMenuWidth());
    }

    render() {

        return html`

            <div id="layout" ?show-menu=${this._showMenu}>

                <div id="menu">

                    <div id="menuSidebarContent">
                        <header>
                            <a
                                href="/"
                                @click=${event => this.handleTitleClick(event)}
                            >
                                ${this.docsTitle}
                            </a>
                        </header>
                        <nav>${this.navTree}</nav>
                    </div>

                    <div id="hamburgerMenu" @click=${this.handleHamburgerMenuClick}>
                        <hamburger-icon ?hidden=${this._showMenu}></hamburger-icon>
                        <cross-icon ?hidden=${!this._showMenu}></cross-icon>
                    </div>

                </div>

                <article>
                    <div id="articleContent">
                        ${this._activePage.template}
                    </div>
                </article>

            </div>

        `;

    }

    get navTree() {

        let pageNo = 1;

        return this.pages.map(page => {
            return html`
                <a
                    class="navItem"
                    href=${page.path}
                    @click=${event => this.handleMenuItemClick(event, page)}
                    ?active=${false}
                >
                    <span class="navItemNo">${pageNo++}</span>
                    <span>${page.title}</span>
                </a>
            `;
        });

    }

    handleTitleClick(event) {
        this.handleMenuItemClick(event, this.pages[0]);
    }

    handleMenuItemClick(event, page) {

        if (event.ctrlKey || event.shiftKey) {
            // Ctrl/shift click opens a `<a>` link in new tab/window, so when
            // one of these keys are pressed, don't override normal behavior.
            return
        }

        event.preventDefault();
        history.pushState({}, page.title, page.path);
        this._activePage = page;
        window.scrollTo(0, 0);
        this._showMenu = false;

    }

    handleHamburgerMenuClick() {

        if (this._showMenu) {
            this._showMenu = false;
        } else {
            this._showMenu = true;
        }

        this._resetMenuWidth();

    }

    static get styles() {

        return css`

            * {
                box-sizing: border-box;
                --left-sidebar-width: 250px;
                --header-height: 45px;
                --min-article-width: 300px;
            }

            #layout {
                display: flex;
                margin: 0 auto;
                min-height: 100vh;
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
                background: #bcb9b2;
                border-bottom: 1px #999 solid;
            }

            #menuSidebarContent header a {
                display: inline-block;
                padding: 5px;
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
                display: inline-flex;
                align-items: center;
                margin: 0;
                padding: 10px;
                border-bottom: 1px #999 solid;
                background: #C7C3BB;
                text-align: left;
                text-decoration: none;
                cursor: pointer;
            }

            .navItem:hover,
            .navItem[active] {
                background: #DAD7D2;
            }

            .navItemNo {
                font-size: 12px;
                opacity: 0.6;
                margin: 2px 8px 0 0;
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

            #hamburgerMenu {
                display: none;
            }

            @media screen and (min-width: 501px) {

                #menu {
                    position: relative;
                    width: 100%;
                    max-width: var(--left-sidebar-width);
                    background: #bcb9b2;
                    border-right: 1px #999 solid;
                }

                #sideBarOpener {
                    display: none;
                }

            }

            @media screen and (max-width: 500px) {

                #layout[show-menu] #menu {
                    display: block;
                    position: absolute;
                }

                article {
                    padding-top: var(--header-height);
                }

                #layout[show-menu] article {
                    display: none;
                }

                #layout:not([show-menu]) #menuSidebarContent nav {
                    display: none;
                }

                #hamburgerMenu {
                    position: fixed;
                    display: block;
                    top: 2px;
                    right: 0;
                    padding: 10px;
                    cursor: pointer;
                }

                #hamburgerMenu hamburger-icon {
                    height: 20px;
                }

                #hamburgerMenu cross-icon {
                    height: 20px;
                }

                #hamburgerMenu .stripe {
                    width: 100%;
                    height: 4px;
                    margin: 5px 0;
                    background: grey;
                }

            }

        `;

    }

}
