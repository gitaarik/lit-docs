import { LitState, stateVar, observeState } from '../../web_modules/lit-element-state.js';
import { LitElement, html, css } from '../../web_modules/lit-element.js';
import { LitDocsStyle } from './lit-docs-style.js';
import './hamburger-icon.js';
import './cross-icon.js';

class LitDocsUiState extends LitState {
  constructor() {
    super();
    this.pages = stateVar();
    this.path = stateVar();
    this.page = stateVar();
    this.showMenu = stateVar();
  }
  /*static get stateVars() {
      return {
          pages: {},
          path: {},
          page: {},
          showMenu: {}
      }
  }*/


  setPath(path) {
    if (path[0] === '/') path = path.substr(1);
    this.path = path || '/';

    this._initPageByPath();
  }

  navToPath(path, addToHistory = true) {
    if (!path) {
      path = '/';
    }

    if (path.substr(0, 7) === 'http://' || path.substr(0, 8) === 'https://') {
      path = path.split('/').slice(3).join('/');
    }

    if (path === this.path) {
      return;
    }

    this.setPath(path);

    if (addToHistory) {
      history.pushState({}, this.page.title, this.path);
    }

    this.showMenu = false;
    window.scrollTo(0, 0);
  }

  handlePageLinkClick(event) {
    if (event.ctrlKey || event.shiftKey) {
      // Ctrl/shift click opens a `<a>` link in new tab/window, so when
      // one of these keys are pressed, don't override normal behavior.
      return;
    }

    event.preventDefault();
    let target = event.target;
    let href = event.target.href;

    while (!href) {
      target = target.parentNode;
      href = target.href;
    }

    if (href) {
      this.navToPath(href);
    }
  }

  _initPageByPath() {
    let path = this.path;

    if (path === '/' || path === '') {
      this.page = this.pages[0];
      return;
    }

    if (path[0] === '/') {
      path = path.substr(1);
    }

    this._setPageByPath(path, this.pages);

    if (!this.page) {
      this.page = this.pages[0];
    }
  }

  _setPageByPath(path, pages) {
    const firstPathPart = path.split('/')[0];

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
      }
    };
  }

  constructor() {
    super();
    this.docsTitle = '';
    this.pages = [];
  }

  connectedCallback() {
    super.connectedCallback();

    this._initState();

    this._fixMenuWidthOnPageWidthChange();

    this._initPopStateListener();
  }

  firstUpdated() {
    super.firstUpdated();

    this._fixMenuWidth();
  }

  _initState() {
    litDocsUiState.pages = this.pages;
    litDocsUiState.setPath(window.location.pathname);
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
      litDocsUiState.navToPath(window.location.pathname, false);
    });
  }

  render() {
    return html`

            <div id="layout" ?show-menu=${litDocsUiState.showMenu}>

                <div id="menu">

                    <div id="menuSidebarContent">
                        <header>
                            <a href="/" @click=${event => litDocsUiState.handlePageLinkClick(event)}>${this.docsTitle}</a>
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
          return html`
                        <a
                            class="menuItem menuItemLink"
                            nav-level=${level}
                            href=${path}
                            @click=${event => litDocsUiState.handlePageLinkClick(event)}
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

  handleTitleClick(event) {
    this.handleMenuItemClick(event, this.pages[0], '/');
  }

  handleMenuItemClick(event, page, path) {
    if (event.ctrlKey || event.shiftKey) {
      // Ctrl/shift click opens a `<a>` link in new tab/window, so when
      // one of these keys are pressed, don't override normal behavior.
      return;
    }

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

            .menu {
                display: flex;
                flex-direction: column;
            }

            .menuItem {
                display: inline-flex;
                align-items: center;
                margin: 0;
                padding: 8px;
                border-bottom: 1px solid #999;
                xborder-width: 1px 0;
                text-align: left;
                text-decoration: none;
            }

            .menuItemCategory {
                font-weight: bold;
                color: #384147;
                xmargin-top: 5px;
                xpadding-top: 15px;
                xpadding-bottom: 15px;
            }

            .menuItemSubmenu {
                xmargin: 5px 0;
            }

            .menuItemLink {
                xbackground: #C7C3BB;
            }

            .menuItemLink {
                cursor: pointer;
            }

            .menuItem[active],
            .menuItemLink:hover {
                background: #DAD7D2;
                border-color: #999;
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
                    background: #bcb9b2;
                    border-right: 1px #999 solid;
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