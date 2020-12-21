import { LitElement, css } from 'lit-element';


export const DemoComponent = superclass => class LitElement extends superclass {

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
                padding: 15px;
                background: #DAD7D2;
                border: 1px #666 solid;
            }

            h2 {
                margin-top: 0;
                font-size: 20px;
                color: green;
            }

            h3 {
                margin: 20px 0;
                font-weight: 600;
                font-size: 16px;
            }

            .status {
                color: blue;
            }

            .value {
                color: red;
            }

            .buttons {
                display: flex;
                flex-wrap: wrap;
                margin: -5px 0 0 -5px;
            }

            .buttons > * {
                margin: 5px 0 0 5px;
            }

        `;

    }

}
