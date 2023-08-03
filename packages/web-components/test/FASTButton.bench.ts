import { customElement, html, FASTElement } from "@microsoft/fast-element";
import { ButtonDefinition } from "@fluentui/web-components";
export { tests } from './WrappedTests';

export const FluentDesignSystem = Object.freeze({
    prefix: 'fluent',
    shadowRootMode: 'open',
    registry: customElements,
});

ButtonDefinition.define(FluentDesignSystem.registry);

@customElement({
    name: "test-app",
    template: html`
        <fluent-button>FAST Button</fluent-button>
    `
})
export class Button extends FASTElement {}

const itemRenderer = () => {
    const btn = document.createElement("test-app");
    return btn;
};

export default itemRenderer;