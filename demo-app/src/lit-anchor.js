import { css } from 'lit-element';
import { litStyle } from 'lit-element-style';


const anchors = [];

function scrollToAnchor(anchor) {
    const newScrollY = window.scrollY + anchor.element.getBoundingClientRect().top;
    window.scrollTo(0, newScrollY);
}

export function goToAnchor(anchorName) {

    if (!anchorName) return;

    const anchor = anchors.find(anchor => {
        return anchor.anchorName == anchorName;
    });

    if (!anchor) return;

    scrollToAnchor(anchor);

    window.addEventListener('load', event => {
        scrollToAnchor(anchor);
    });

}


const litAnchorStyles = litStyle(css`

    a.headingAnchor {
        color: rgb(169, 164, 153);
        text-decoration: none;
    }

`);


export const LitAnchor = superclass => class extends litAnchorStyles(superclass) {

    constructor() {
        super();
        this._initHashChangeListener();
    }

    firstUpdated() {
        super.firstUpdated();
        this._initAnchors();
        this._loadInitialAnchor();
    }

    _initHashChangeListener() {
        window.addEventListener('hashchange', event => {
            goToAnchor(event.newURL.split('#')[1]);
        });
    }

    _loadInitialAnchor() {
        goToAnchor(window.location.hash.substr(1));
    }

    _initAnchors() {

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

        anchors.push({
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
