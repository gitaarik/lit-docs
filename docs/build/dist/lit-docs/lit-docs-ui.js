function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { LitState, stateVar, observeState } from '../../web_modules/lit-element-state.js';
import { LitElement, html, css } from '../../web_modules/lit-element.js';
import { LitDocsStyle } from './lit-docs-style.js';
import './hamburger-icon.js';
import './cross-icon.js';

class LitDocsUiState extends LitState {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "useHash", true);
  }

  static get stateVars() {
    return {
      pages: {},
      path: {},
      page: {},
      showMenu: {}
    };
  }

  initPageByPath(path) {
    if (!path || path === '/') {
      this.page = this.pages[0];
      return;
    }

    path = path.slice(); // make a copy

    if (path[0] === '/') {
      path = path.substr(1);
    }

    this._setPageByPath(path, this.pages);

    if (!this.page) {
      this.page = this.pages[0];
    }
  }

  navToPath(path, addToHistory = true) {
    path = path.slice(); // make a copy

    if (path.substr(0, 7) === 'http://' || path.substr(0, 8) === 'https://') {
      path = path.split('/').slice(3).join('/');
    }

    if (!path) {
      path = '/';
    }

    this.initPageByPath(path);

    if (addToHistory) {
      history.pushState({}, this.page.title, (this.useHash ? window.location.pathname + '#' : '') + path);
    }

    this.showMenu = false;
    window.scrollTo(0, 0);
  }

  handlePopState() {
    if (this.useHash) {
      this.navToPath(window.location.hash.substr(1), false);
    } else {
      this.navToPath(window.location.pathname + window.location.hash, false);
    }
  }

  _setPageByPath(path, pages) {
    const firstPathPart = path.split('#')[0].split('/')[0];

    if (!firstPathPart) {
      return;
    }

    for (const page of pages) {
      if (page.path === firstPathPart) {
        this.page = page;

        if (page.submenu) {
          const pathRemainder = path.split('/').slice(1).join('/');

          this._setPageByPath(pathRemainder, page.submenu);
        }

        return;
      }
    }
  }

}

export const litDocsUiState = new LitDocsUiState();

class LitDocsUI extends observeState(LitDocsStyle(LitElement)) {
  static get properties() {
    return {
      docsTitle: {
        type: String
      },
      pages: {
        type: Array
      },
      useHash: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.docsTitle = '';
    this.useHash = true;
    this.pages = [];
  }

  connectedCallback() {
    super.connectedCallback();

    this._initState();

    this._initBaseStyle();

    this._fixMenuWidthOnPageWidthChange();

    this._initPopStateListener();
  }

  firstUpdated() {
    super.firstUpdated();

    this._fixMenuWidth();
  }

  _initState() {
    litDocsUiState.useHash = this.useHash;
    litDocsUiState.pages = this.pages;

    if (this.useHash) {
      litDocsUiState.initPageByPath(window.location.hash.substr(1));
    } else {
      litDocsUiState.initPageByPath(window.location.pathname + window.location.hash);
    }
  }

  _initBaseStyle() {
    const baseStyleTag = document.createElement('style');
    baseStyleTag.textContent = css`

            * {
                --background-color: rgb(237, 236, 234);
            }

            @media (prefers-color-scheme: dark) {

                * {
                    --text-color: rgb(201, 209, 217);
                    --background-color: #313131;
                }

            }

            html, body {
                margin: 0;
                padding: 0;
                min-height: 100vh;
                background: var(--background-color);
                color: var(--text-color);
                font-family: Arial, sans-serif;
            }

            a {
                color: var(--text-color);
            }

        `;
    const headTag = document.getElementsByTagName('head')[0];
    headTag.appendChild(baseStyleTag);
  }

  _fixMenuWidth() {
    this.shadowRoot.getElementById('menuSidebarContent').style.maxWidth = (() => {
      if (window.innerWidth > 600) {
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

  _initPopStateListener() {
    window.addEventListener('popstate', event => {
      litDocsUiState.handlePopState();
    });
  }

  render() {
    return html`

            <div id="layout" ?show-menu=${litDocsUiState.showMenu}>

                <div id="menu">

                    <div id="menuSidebarContent">
                        <header>
                            <a href="/" @click=${event => this.handleMenuItemClick(event, '/')}>${this.docsTitle}</a>
                        </header>
                        <nav class="mainMenu menu">${this.navTree(this.pages)}</nav>
                    </div>

                    <div id="hamburgerMenu" @click=${this.handleHamburgerMenuClick}>
                        <hamburger-icon ?hidden=${litDocsUiState.showMenu}></hamburger-icon>
                        <cross-icon ?hidden=${!litDocsUiState.showMenu}></cross-icon>
                    </div>

                </div>

                <article>
                    <div id="articleContent">
                        ${litDocsUiState.page.template}
                    </div>
                </article>

            </div>

        `;
  }

  navTree(pages, level = 0, pageNoPrefix = '', pathPrefix = '') {
    if (!pages) {
      return;
    }

    let pageNo = 0;
    return pages.map(page => {
      let path = pathPrefix + page.path;
      if (path[-1] !== '/') path += '/';
      pageNo++;
      const navContent = html`
                <span class="menuItemNo">${pageNoPrefix + pageNo}</span>
                <span>${page.title}</span>
            `;

      const getMenuItem = () => {
        if (page.template) {
          const href = (() => {
            if (litDocsUiState.useHash) {
              return window.location.pathname + '#' + path;
            }

            return path;
          })();

          return html`
                        <a
                            class="menuItem menuItemLink"
                            href=${href}
                            @click=${event => this.handleMenuItemClick(event, path)}
                            nav-level=${level}
                            ?active=${page === litDocsUiState.page}
                        >
                            ${navContent}
                        </a>
                    `;
        } else {
          return html`
                        <span
                            class="menuItem menuItemCategory"
                            nav-level=${level}
                        >
                            ${navContent}
                        </span>
                    `;
        }
      };

      const getSubMenu = () => {
        if (page.submenu) {
          return html`
                        <div class="menuItemSubmenu menu">
                            ${this.navTree(page.submenu, level + 1, pageNoPrefix + pageNo + '.', path)}
                        </div>
                    `;
        }
      };

      return html`
                ${getMenuItem()}
                ${getSubMenu()}
            `;
    });
  }

  handleMenuItemClick(event, path) {
    event.preventDefault();
    litDocsUiState.navToPath(path);
  }

  handleHamburgerMenuClick() {
    if (litDocsUiState.showMenu) {
      litDocsUiState.showMenu = false;
    } else {
      litDocsUiState.showMenu = true;
    }

    this._resetMenuWidth();
  }

  static get styles() {
    return css`

            * {
                box-sizing: border-box;
                --left-sidebar-width: 250px;
                --header-height: 45px;
                --menu-bg-color: #e4e2dd;
                --border-color: #ccc;
            }

            @media (prefers-color-scheme: dark) {
                * {
                    --menu-bg-color: #2b2b2b;
                    --border-color: #444;
                }
            }

            #layout {
                display: flex;
                margin: 0 auto;
                min-height: 100vh;
            }

            #menuSidebarContent {
                width: 100%;
                max-width: var(--left-sidebar-width);
            }

            #menuSidebarContent header {
                display: flex;
                justify-content: center;
                align-items: center;
                height: var(--header-height);
                background: var(--menu-bg-color);
                border-bottom: 1px var(--border-color) solid;
            }

            #menuSidebarContent header a {
                display: inline-block;
                padding: 5px;
                color: var(--text-color);
                font-weight: 600;
                text-decoration: none;
                font-size: 20px;
            }

            .menu {
                display: flex;
                flex-direction: column;
            }

            .menuItem {
                display: inline-flex;
                align-items: center;
                margin: 0;
                padding: 8px;
                border-bottom: 1px solid var(--border-color);
                color: var(--text-color);
                text-align: left;
                text-decoration: none;
            }

            .menuItemCategory {
                font-weight: bold;
                color: var(--text-color);
            }

            .menuItemLink {
                cursor: pointer;
            }

            .menuItem[active],
            .menuItemLink:hover {
                background: #DAD7D2;
                border-color: var(--border-color);
            }

            @media (prefers-color-scheme: dark) {

                .menuItem[active],
                .menuItemLink:hover {
                    background: #393939;
                }

            }

            .menuItem[nav-level="1"] {
                padding-left: 25px;
            }

            .menuItem[nav-level="2"] {
                padding-left: 40px;
            }

            .menuItem[nav-level="3"] {
                padding-left: 55px;
            }

            .menuItemNo {
                font-size: 11px;
                opacity: 0.6;
                margin: 1px 7px 0 0;
            }

            article {
                flex-grow: 1;
                overflow-x: auto;
                max-width: 100%;
            }

            #articleContent {
                padding: 20px;
                max-width: 720px;
                width: 100%;
            }

            #hamburgerMenu {
                display: none;
            }

            @media screen and (min-width: 601px) {

                #menu {
                    position: relative;
                    width: 100%;
                    max-width: var(--left-sidebar-width);
                    background: var(--menu-bg-color);
                    border-right: 1px var(--border-color) solid;
                }

                #sideBarOpener {
                    display: none;
                }

            }

            @media screen and (max-width: 600px) {

                #menuSidebarContent {
                    position: fixed;
                }

                .mainMenu {
                    overflow: auto;
                    max-height: calc(100vh - var(--header-height));
                }

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

customElements.define('lit-docs-ui', LitDocsUI);