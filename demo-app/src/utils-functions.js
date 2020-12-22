import { customElement, LitElement, html } from 'lit-element';
import { DemoPage } from '@app/helpers/index';
import { currentTime } from '@app/helpers/index';


@customElement('util-functions')
export class UtilFunctions extends DemoPage(LitElement) {

    render() {

        return html`

            <h1>Utility functions</h1>

            <h2><code-small>currentTime()</current-time></h2>

            <h3>Description</h3>

            <p>
                Returns the current time
            </p>

            <h3>Usage</h3>

            <p><code-big .code=${this.currentTimeUsageCode}></code-big></p>

            <h3>Output</h3>

            <p>The current time is: ${currentTime()}</p>

        `;

    }

    get currentTimeUsageCode() {
        return `import { currentTime } from 'lit-element-demo-app-helpers';

console.log('The current time is: ' + currentTime());`;
    }

}
