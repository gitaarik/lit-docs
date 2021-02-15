import { LitElement, html, css } from 'lit-element';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);


export class CodeBlock extends LitElement {

    static get properties() {
        return {
            fileName: {type: String},
            code: {type: String}
        }
    }

    firstUpdated() {
        super.firstUpdated();
        this._initHighlightJs();
    }

    _initHighlightJs() {
        this.shadowRoot.querySelectorAll('.hljs').forEach(block => {
            hljs.highlightBlock(block);
        });
    }

    render() {
        return html`
            ${this._fileName}
            <code class="hljs" ?has-filename=${!!this.fileName}>${this.code}</code>
        `;
    }

    get _fileName() {

        if (!this.fileName) {
            return;
        }

        return html`<code class="fileName">${this.fileName}</code>`;

    }

    static get styles() {

        return css`

            :host {
                display: block;
            }

            .fileName {
                display: block;
                margin: 0;
                padding: 7px 10px;
                border-radius: 5px 5px 0 0;
                background: #555;
                color: #FFF;
                font-weight: bold;
            }

            .hljs {
                display: block;
                box-sizing: border-box;
                margin: 0;
                padding: 10px;
                width: 100%;
                white-space: pre-wrap;
                border-radius: 5px;
                overflow-x: auto;
                color: #ffffff;
                background: #1c1b1b;
            }

            .hljs[has-filename] {
                border-radius: 0 0 5px 5px;
            }

            .hljs-comment {
                color: #999999;
            }

            .hljs-keyword,
            .hljs-selector-tag,
            .hljs-meta-keyword,
            .hljs-doctag,
            .hljs-section,
            .hljs-selector-class,
            .hljs-meta,
            .hljs-selector-pseudo,
            .hljs-attr {
                color: #88aece;
            }

            .hljs-attribute {
                color: v#c59bc1;
            }

            .hljs-name,
            .hljs-type,
            .hljs-number,
            .hljs-selector-id,
            .hljs-quote,
            .hljs-template-tag,
            .hljs-built_in,
            .hljs-title,
            .hljs-literal {
                color: #f08d49;
            }

            .hljs-string,
            .hljs-regexp,
            .hljs-symbol,
            .hljs-variable,
            .hljs-template-variable,
            .hljs-link,
            .hljs-selector-attr,
            .hljs-meta-string {
                color: #b5bd68;
            }

            .hljs-bullet,
            .hljs-code {
                color: #cccccc;
            }

            .hljs-deletion {
                color: #de7176;
            }

            .hljs-addition {
                color: #76c490;
            }

            .hljs-emphasis {
                font-style: italic;
            }

            .hljs-strong {
                font-weight: bold;
            }

        `;

    }

}


customElements.define('code-block', CodeBlock);
