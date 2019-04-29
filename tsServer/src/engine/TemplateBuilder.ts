import { Component } from '../models/Component';
import { TsFileBuilder } from './TsFileBuilder';

export class ComponentTemplateBuilder {
    protected inputsForBinding: Map<string, any>;

    public generateTemplate(component: Component): string {

        return this.openOuterTemplate(component) +
               this.addChildNodes(component) +
               this.closeOuterTemplate(component);
    }

    private openOuterTemplate(component: Component): string {
        let builder = '';
        const open = '< ';
        const selector = component.selector;
        const close = ' >';
        const dataBinding = this.inputs_assigning(component);
        builder = `${open + selector} ${component.templateInstance} ${dataBinding} ${close}`
            + this.addNewLine();
        return builder;
    }

    private addChildNodes(component: Component) {
        let builder = '';
        if (component.children.length !== 0) {
            component.children.forEach((child) => {
                child.template = this.generateTemplate(child);
                builder += child.template;
            });
            return '\t' + builder;
        }
        return builder;
    }

    private closeOuterTemplate(component: Component): string {
        const open = '< ';
        const selector = component.selector;
        const close = '>';
        return `${open}/${selector + close}`;
    }

    private inputs_assigning(component: Component): string {
        let result = '\t';
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < component.inputs.length; i++) {

            const input = component.inputs[i];

            switch (typeof input.value) {
                case 'number' || 'boolean':
                    result += `${input.name}=${input.value}` + result;
                    break;

                case 'string':
                    if (!this.isDateString(input.value as string)) {
                        result += `${input.name}="${input.value}"` + result;
                    } else {
                        const dateSerialNumber = Date.parse(input.value as string);
                        this.inputsForBinding.set(input.name, new Date(dateSerialNumber));
                        result += `${input.name}="${input.value}"` + result;
                    }
                    break;
                case 'object':
                    this.inputsForBinding.set(input.name, input.value);
                    result += `[${input.name}]="${input.name}"` + result;
            }

        }

        return result;
    }

    private isDateString(val: string): boolean {
        return isNaN(Date.parse(val));
    }

    private addNewLine(): string {
        return '\r\n';
    }

}

// tslint:disable-next-line:max-classes-per-file
export class DirectiveTemplateBuilder {

}
