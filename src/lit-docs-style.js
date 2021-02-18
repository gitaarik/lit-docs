import { css } from 'lit-element';
import { litStyle } from 'lit-element-style';


export const LitDocsStyle = litStyle(css`

    :host {
        display: block;
    }

    * {
        box-sizing: border-box;
    }

    [hidden] {
        display: none;
    }

    :first-child {
        margin-top: 0;
    }

    :last-child {
        margin-bottom: 0;
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
        color: var(--text-color);
    }

    table {
        border-collapse: collapse;
    }

    table tr th,
    table tr td {
        border: 1px var(--border-color) solid;
        padding: 10px;
    }

    table tr th {
        text-align: left;
    }

    code {
        display: inline-block;
        padding: 2px 6px;
        margin: 1px;
        background: #444;
        border-radius: 5px;
        color: white;
        white-space: pre;
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
