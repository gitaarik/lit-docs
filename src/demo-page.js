import { css } from 'lit-element';


export const DemoPage = superclass => class extends superclass {

    static getStyles() {
        if (!this.styles) {
            return this._defaultStyles;
        } else if (Array.isArray(this.styles)) {
            return [this._defaultStyles, ...this.styles];
        } else {
            return [this._defaultStyles, this.styles];
        }
    }

    static get _defaultStyles() {

        return css`

            :host {
                display: block;
            }

            * {
                box-sizing: border-box;
            }

            h2 {
                font-size: 20px;
            }

            h3 {
                font-size: 16px;
            }

            a {
                color: #000;
            }

            #demoComponents {
                display: flex;
                flex-wrap: wrap;
                margin: -15px 0 0 -15px;
            }

            #demoComponents > * {
                border: 1px #666 solid;
                margin: 15px 0 0 15px;
                max-width: 290px;
            }

        `;

    }

}
