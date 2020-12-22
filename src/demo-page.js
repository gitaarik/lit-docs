import { css } from 'lit-element';
import { litStyle } from 'lit-element-style';


export const DemoPage = litStyle(css`

    :host {
        display: block;
    }

    * {
        box-sizing: border-box;
    }

    :first-child {
        margin-top: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
    }

    h1, h2 {
        padding-bottom: .3em;
        border-bottom: 1px solid #aaa;
    }

    h2 {
        font-size: 1.5em;
    }

    h3 {
        font-size: 1.25em;
    }

    h4 {
        font-size: 1em;
    }

    h5 {
        font-size: .875em;
    }

    h6 {
        font-size: .85em;
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

`);
