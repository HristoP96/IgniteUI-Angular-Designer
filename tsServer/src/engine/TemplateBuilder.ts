import { Component } from '../models/Component';
import { GridComponent } from '../models/grids/GridComponent';
import { ITemplateGenerator } from '../models/ITemplateGenerator';
import { NgTemplateBuilder } from './NgTemplateBuilder';
import { TsFileBuilder } from './TsFileBuilder';

export class ComponentTemplateBuilder implements ITemplateGenerator {
  public inputsForBinding: Map<string, any>;

  constructor() {
    this.inputsForBinding = new Map<string, any>();
  }
  public generateTemplate(component: Component): string {
    let res = '';
    if (component.children.length === 0) {
      res = `${this.openOuterTemplate(component)}${this.closeOuterTemplate(component)}` + '\r\n';
    } else {
      // tslint:disable-next-line: max-line-length
      res = `${this.openOuterTemplate(component)}\r\n${this.addChildNodes(component)}
${ this.closeOuterTemplate(component)}`;
    }

    return res;
  }

  public openOuterTemplate(component: Component): string {
    let builder = '';
    const open = '<';
    const selector = component.selector;
    const close = '>';
    const dataBinding = this.inputs_assigning(component).trimRight();
    builder = `${open + selector} ${component.templateInstance} ${dataBinding} ${close}`;
    return builder;
  }

  public addChildNodes(component: Component) {
    let builder = '';
    if (component.children.length !== 0) {
      component.children.forEach((child) => {
        if ((child as any).ngTemplate) {
          // tslint:disable-next-line:max-line-length
          child.template = ((this as ITemplateGenerator) as NgTemplateBuilder).generateTemplate((child as any).ngTemplate);
        } else {
          child.template = this.generateTemplate(child);
        }
        builder += child.template + '\t';
      });
      return '\t' + builder;
    }
    return builder;
  }

  public closeOuterTemplate(component: Component): string {
    const open = '<';
    const selector = component.selector;
    const close = '>';
    return `${open}/${selector + close}`;
  }

  private inputs_assigning(component: Component): string {
    let result = ' ';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < component.inputs.length; i++) {

      const input = component.inputs[i];
      if (input.value) {
        switch (typeof input.value) {
          case 'number':
            result = `[${input.name}]="${input.value}" ` + result;
            break;
          case 'boolean':
            if (input.value) {
              result = `${input.name}="${input.value}" ` + result;
            }
            break;
          case 'string':
            if (!this.isDateString(input.value as string)) {
              result = `${input.name}="${input.value}" ` + result;
            } else {
              const dateSerialNumber = Date.parse(input.value as string);
              component.inputsForDataBind.set(input.name, new Date(dateSerialNumber));
              result = `${input.name}="${input.value}" ` + result;
            }
            break;
          case 'object':
            component.inputsForDataBind.set(input.name, input.value);
            result = `[${input.name}]="${input.name}" ` + result;
        }
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
// new ComponentTemplateBuilder().generateTemplate(new GridComponent());
