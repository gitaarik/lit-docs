import { css, html } from 'lit-element';
import { litStyle } from 'lit-element-style';


// Global container of all the anchors on the page. This is global so that the
// `goToAnchor()` function can be used from any component.
let ANCHORS = [];

function getAnchorData(anchorName, returnList = false) {

    const conditionFunc = anchor => {
        return anchor.anchorName == anchorName;
    };

    if (returnList) {
        return ANCHORS.filter(conditionFunc);
    } else {
        return ANCHORS.find(conditionFunc);
    }

}

function scrollToAnchor(anchorName) {
    const anchorData = getAnchorData(anchorName);
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

    h1 .headingAnchor,
    h2 .headingAnchor,
    h3 .headingAnchor,
    h4 .headingAnchor,
    h5 .headingAnchor,
    h6 .headingAnchor {
        display: none;
    }

    h1:hover .headingAnchor,
    h2:hover .headingAnchor,
    h3:hover .headingAnchor,
    h4:hover .headingAnchor,
    h5:hover .headingAnchor,
    h6:hover .headingAnchor {
        display: inline-block;
    }

    .headingAnchor {
        display: inline-block;
        fill: rgb(69, 75, 78);
        text-decoration: none;
        height: 15px;
    }

    .headingAnchor svg {
        height: 100%;
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
        const anchorName = this._getAnchorName(elementText);

        ANCHORS.push({
            anchorName,
            element,
            elementText
        });

        const anchorEl = document.createElement('a');

        element.innerHTML = `
            <span>${elementText}</span>
            <a class="headingAnchor" href=${window.location.pathname + '#' + anchorName}>${this._anchorSvg}</a>
        `;

        element.id = anchorName;

    }

    _getAnchorName(elementText) {

        const baseAnchorName = elementText.replace(/ /g, '-').replace(/[^\w-_\.]/gi, '').toLowerCase();
        let anchorName = baseAnchorName;
        let alreadyExistingAnchor = getAnchorData(anchorName);
        let counter = 1;

        while (alreadyExistingAnchor) {
            counter++;
            anchorName = baseAnchorName + '-' + counter;
            alreadyExistingAnchor = getAnchorData(anchorName);
        }

        return anchorName;

    }

    get _anchorSvg() {

        return `
            <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
            </svg>
        `;

    }

}
