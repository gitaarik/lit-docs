import { css } from 'lit-element';
import { litStyle } from 'lit-element-style';


// Global container of all the anchors on the page. This is global so that the
// `goToAnchor()` function can be used from any component.
let ANCHORS = [];

function scrollToAnchor(anchorName) {

    const anchorData = ANCHORS.find(anchor => {
        return anchor.anchorName == anchorName;
    });

    if (!anchorData) return;

    const newScrollY = window.scrollY + anchorData.element.getBoundingClientRect().top;

    window.scrollTo(0, newScrollY);

}

export function goToAnchor(anchorName) {

    if (!anchorName) return;

    scrollToAnchor(anchorName);

    // Do it another time when the full document has loaded
    window.addEventListener('load', event => {
        scrollToAnchor(anchorName);
    });

}


const litAnchorStyles = litStyle(css`

    a.headingAnchor {
        color: rgb(169, 164, 153);
        text-decoration: none;
    }

`);


export const LitAnchor = superclass => class extends litAnchorStyles(superclass) {

    connectedCallback() {
        super.connectedCallback();
        this._addHashChangeListener();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._removeHashChangeListener();
    }

    firstUpdated() {
        super.firstUpdated();
        this._initAnchors();
        this._loadInitialAnchor();
    }

    _addHashChangeListener() {
        this.hashChangeCallback = event => {
            goToAnchor(event.newURL.split('#')[1]);
        };
        window.addEventListener('hashchange', this.hashChangeCallback);
    }

    _removeHashChangeListener() {
        window.removeEventListener('hashchange', this.hashChangeCallback);
    }

    _loadInitialAnchor() {
        goToAnchor(window.location.hash.substr(1));
    }

    _initAnchors() {

        ANCHORS = [];
        const tagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

        for (const tagName of tagNames) {

            const elements = this.shadowRoot.querySelectorAll(tagName);

            for (const element of elements) {
                this._initAnchor(element);
            }

        }

    }

    _initAnchor(element) {

        const elementText = element.textContent;
        const anchorName = elementText.replace(/ /g, '-').replace(/[^a-z-]/gi, '').toLowerCase();

        ANCHORS.push({
            anchorName,
            element,
            elementText
        });

        const anchorEl = document.createElement('a');

        element.innerHTML = `
            <span>${elementText}</span>
            <a class="headingAnchor" href=${window.location.pathname + '#' + anchorName}>$</a>
        `;

        element.id = anchorName;

    }

}
