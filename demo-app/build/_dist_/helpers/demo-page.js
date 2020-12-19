import { css } from '../../web_modules/lit-element.js';
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

            h1 {
                padding: 10px 0;
                margin: 20px 0 15px;
                font-size: 25px;
                border-bottom: 1px solid #AAA;
            }

            h2 {
                margin: 25px 0 10px;
                font-size: 20px;
            }

            h3 {
                margin: 20px 0 5px;
                font-size: 16px;
            }

            p {
                margin: 15px 0;
                line-height: 1.5;
            }

            a {
                color: #000;
            }

            .demoComponents {
                display: flex;
                flex-wrap: wrap;
                margin: -15px 0 0 -15px;
            }

            .demoComponents > * {
                margin: 15px 0 0 15px;
                max-width: 290px;
            }

        `;
  }

};