import { customElement, LitElement, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import '@app/helpers/index';
import './example-demo-component';


@customElement('demo-component-mixin')
export class DemoComponentMixin extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>DemoComponent Mixin</h1>

            <p>
                The <code-small>DemoComponent</code-small> mixin can be used
                for demo components that demonstrate some functionality of your
                library. It adds some basic styles for the component, so that
                all demo components have consistent styling.
            </p>

            <h2>Example</h2>

            <p>
                <example-demo-component></example-demo-component>
            </p>

            <h2>Usage</h2>

            <p><code-big .code=${this.demoShellCode}></code-big></p>

            <h1>Multiple demo components</h1>

            <p>
                If you use multiple demo components on your
                <a href="#demo-page-mixin">demo page</a>, it is advised to wrap
                them in <code-small>&lt;div class="demoComponents"&gt;&lt;div&gt;</code-small>,
                so that they have some margin from each other, and stay
                arranged well on different viewports:
            </p>

            <h2>Example</h2>

            <div class="demoComponents">
                <example-demo-component></example-demo-component>
                <example-demo-component></example-demo-component>
            </div>

            <h2>Usage</h2>

            <p><code-big .code=${this.demoComponentsWrapperCode}></code-big></p>

        `;

    }

    get demoShellCode() {

        return `import { customElement, LitElement, html } from 'lit-element';
import { DemoComponent } from 'lit-state-demo-app-helpers';


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
