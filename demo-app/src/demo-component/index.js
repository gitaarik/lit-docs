import { customElement, LitElement, html } from 'lit-element';
import { LitDocsStyle, LitAnchor } from '@app/lit-docs/index';
import '@app/lit-docs/index';
import './example-demo-component';


@customElement('demo-component')
export class DemoComponent extends LitAnchor(LitDocsStyle(LitElement)) {

    render() {

        return html`

            <h1>DemoComponent</h1>

            <p>
                The <code>DemoComponent</code> mixin can be used for components
                that demonstrate some functionality of your library. It adds
                some basic styles for the component, so that all demo
                components have consistent styling.
            </p>

            <h2>Example</h2>

            <p>
                <example-demo-component></example-demo-component>
            </p>

            <h2>Usage</h2>

            <p><lit-docs-code-block .code=${this.demoShellCode}></lit-docs-code-block></p>

            <h1>Multiple demo components</h1>

            <p>
                If you want to show multiple demo components, it is advised to
                wrap them in <code>&lt;div class="demoComponents"&gt;&lt;div&gt;</code>,
                so that they have some margin from each other, and stay
                arranged well on different viewports:
            </p>

            <h2>Example</h2>

            <div class="demoComponents">
                <example-demo-component></example-demo-component>
                <example-demo-component></example-demo-component>
            </div>

            <h2>Usage</h2>

            <p><lit-docs-code-block .code=${this.demoComponentsWrapperCode}></lit-docs-code-block></p>

        `;

    }

    get demoShellCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { DemoComponent } from 'lit-docs';


@customElement('example-demo-component')
export class ExampleDemoComponent extends DemoComponent(LitElement) {

    render() {

        return html\`
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
        \`;

    }

}`;

    }

    get demoComponentsWrapperCode() {
        return `<div class="demoComponents">
    <example-demo-component></example-demo-component>
    <example-demo-component></example-demo-component>
</div>`;
    }

}
