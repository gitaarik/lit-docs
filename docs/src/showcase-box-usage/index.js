import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle, LitDocsAnchors } from '@app/lit-docs/index';
import '@app/lit-docs/index';
import './example-showcase-box.js';


@customElement('showcase-box-usage')
export class ShowcaseBoxUsage extends LitDocsAnchors(LitDocsStyle(LitElement)) {

    render() {

        return html`

            <h1>Showcase boxes</h1>

            <p>
                The <code>&lt;showcase-box&gt;</code> component can be used to
                showcase some functionality of your library. It wraps the
                content that you give it in inside a box with a border and a
                background.
            </p>

            <h2>Example</h2>

            <p>
                <example-showcase-box></example-showcase-box>
            </p>

            <h2>Usage</h2>

            <p><code-block .code=${this.demoShellCode}></code-block></p>

            <h1>Multiple demo components</h1>

            <p>
                If you want to show multiple demo components, it is advised to
                wrap them in <code>&lt;div class="demoComponents"&gt;&lt;div&gt;</code>,
                so that they have some margin from each other, and stay
                arranged well on different viewports:
            </p>

            <h2>Example</h2>

            <div class="demoComponents">
                <example-showcase-box></example-showcase-box>
                <example-showcase-box></example-showcase-box>
            </div>

            <h2>Usage</h2>

            <p><code-block .code=${this.demoComponentsWrapperCode}></code-block></p>

        `;

    }

    get demoShellCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle } from 'lit-docs';
import 'lit-docs';


@customElement('example-showcase-box')
export class ExampleShowcaseBox extends LitDocsStyle(LitElement) {

    render() {

        return html\`
            <showcase-box>
                <h2>H2 tag</h2>
                <h3>Normal H3 tag</h3>
                <h3 class="status">Status H3 tag</h3>
                <h3 class="value">Value H3 tag</h3>
                <div class="buttons">
                    <button>Button 1</button>
                    <button>Button 2</button>
                    <button>Button 3</button>
                    <button>Button 4</button>
                </div>
            </showcase-box>
        \`;

    }

}`;

    }

    get demoComponentsWrapperCode() {
        return `<div class="demoComponents">
    <example-showcase-box></example-showcase-box>
    <example-showcase-box></example-showcase-box>
</div>`;
    }

}
