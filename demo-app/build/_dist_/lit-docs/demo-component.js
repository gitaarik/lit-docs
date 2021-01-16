import { LitElement, css } from '../../web_modules/lit-element.js';
import { litStyle } from '../../web_modules/lit-element-style.js';
export const DemoComponent = litStyle(css`

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

`);