import { IInput } from './Component';

export interface IInput {
  name: string;
  value: Input;
}

export interface IData {
  name: string;
  value: any;
}

type Input = string | number | boolean | object | null;

export function resetInputs(component: Component, inputName: string, newValue: Input): void {
  component.inputs.find((input) => input.name === inputName).value = newValue;
}

export interface IComponentModel {
  [index: string]: any;
}
export abstract class Component {
  public selector: string;
  public abstract inputs: IInput[];
  public abstract children: Component[];
  public abstract template: string;
  public name: string;
  public templateInstance: string;
  public module: string;
  public inputsForDataBind: Map<string, any>;
  constructor(
    selector: string,
    name: string,
    templateInstance: string,
    module?: string
  ) {
    this.selector = selector;
    this.templateInstance = `#${templateInstance}`;
    this.name = name;
    this.inputsForDataBind = new Map<string, any>();
    if (module) {
      this.module = module;
    }
  }
  public setInputs(): void {
    this.inputs = [];

    const componentModel: IComponentModel = {
      children: this.children,
      inputs: this.inputs,
      inputsForDataBind: this.inputsForDataBind,
      module: this.module,
      name: this.name,
      selector: this.selector,
      template: this.template,
      templateInstance: this.templateInstance
    };

    const componentObject = Object.create(this);
    Object.keys(this).forEach((property) => {
      if (
        typeof componentObject[property] !== 'function' &&
        !componentModel[property]
      ) {
        this.inputs.push({
          name: property.replace('_', ''),
          value: componentObject[property]
        });
      }
    });
  }
}
