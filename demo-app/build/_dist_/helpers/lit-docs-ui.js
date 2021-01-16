function _decorate(decorators, factory, superClass, mixins) { var api = _getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function _getDecoratorsApi() { _getDecoratorsApi = function () { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function (O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function (F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function (receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function (elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function (element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function (element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function (elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function (element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function (elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function (elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function (elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function (elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function (obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function (constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function (obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import { customElement, LitElement, property, html, css } from '../../web_modules/lit-element.js';
import { LitDocsStyle } from './lit-docs-style.js';
import './hamburger-icon.js';
import './cross-icon.js';

let LitDocsUI = _decorate([customElement('lit-docs-ui')], function (_initialize, _LitDocsStyle) {
  class LitDocsUI extends _LitDocsStyle {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: LitDocsUI,
    d: [{
      kind: "field",
      decorators: [property({
        type: String
      })],
      key: "docsTitle",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Array
      })],
      key: "pages",

      value() {
        return [];
      }

    }, {
      kind: "field",
      decorators: [property({
        type: Boolean
      })],
      key: "_showMenu",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [property({
        type: String
      })],
      key: "_activePage",

      value() {
        return '';
      }

    }, {
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        _get(_getPrototypeOf(LitDocsUI.prototype), "connectedCallback", this).call(this);

        this._initActivePage();

        this._fixMenuWidthOnPageWidthChange();
      }
    }, {
      kind: "method",
      key: "firstUpdated",
      value: function firstUpdated() {
        _get(_getPrototypeOf(LitDocsUI.prototype), "firstUpdated", this).call(this);

        this._fixMenuWidth();
      }
    }, {
      kind: "method",
      key: "_initActivePage",
      value: function _initActivePage() {
        const path = window.location.pathname.substr(1);

        if (path) {
          for (const page of this.pages) {
            if (page.path === window.location.pathname.substr(1)) {
              this._activePage = page;
              return;
            }
          }
        } // If no page was not found, fall back to first page


        this._activePage = this.pages[0];
      }
    }, {
      kind: "method",
      key: "_fixMenuWidth",
      value: function _fixMenuWidth() {
        this.shadowRoot.getElementById('menuSidebarContent').style.maxWidth = (() => {
          if (window.innerWidth > 500) {
            return this.shadowRoot.getElementById('menu').clientWidth + 'px';
          } else {
            return 'none';
          }
        })();
      }
    }, {
      kind: "method",
      key: "_resetMenuWidth",
      value: function _resetMenuWidth() {
        this.shadowRoot.getElementById('menuSidebarContent').style.maxWidth = 'none';
      }
    }, {
      kind: "method",
      key: "_fixMenuWidthOnPageWidthChange",
      value: function _fixMenuWidthOnPageWidthChange() {
        window.addEventListener('resize', () => this._fixMenuWidth());
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
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
    }, {
      kind: "get",
      key: "navTree",
      value: function navTree() {
        return this.pages.map(page => {
          return html`
                <a
                    class="navItem"
                    href=${page.path}
                    @click=${event => this.handleMenuItemClick(event, page)}
                    ?active=${false}
                >
                    ${page.title}
                </a>
            `;
        });
      }
    }, {
      kind: "method",
      key: "handleTitleClick",
      value: function handleTitleClick(event) {
        this.handleMenuItemClick(event, this.pages[0]);
      }
    }, {
      kind: "method",
      key: "handleMenuItemClick",
      value: function handleMenuItemClick(event, page) {
        if (event.ctrlKey || event.shiftKey) {
          // Ctrl/shift click opens a `<a>` link in new tab/window, so when
          // one of these keys are pressed, don't override normal behavior.
          return;
        }

        event.preventDefault();
        history.pushState({}, page.title, page.path);
        this._activePage = page;
        window.scrollTo(0, 0);
        this._showMenu = false;
      }
    }, {
      kind: "method",
      key: "handleHamburgerMenuClick",
      value: function handleHamburgerMenuClick() {
        if (this._showMenu) {
          this._showMenu = false;
        } else {
          this._showMenu = true;
        }

        this._resetMenuWidth();
      }
    }, {
      kind: "get",
      static: true,
      key: "styles",
      value: function styles() {
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
    }]
  };
}, LitDocsStyle(LitElement));