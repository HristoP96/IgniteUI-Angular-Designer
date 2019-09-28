import { Component, IInput } from './Component';

export class NgTemplate {
  public template: string;
  public host: Component;
  public components: Component[];
  public selector: string = 'ng-template';
  public directive: string;

  constructor(components: Component[], host: Component, directive?: string) {
    this.components = components;
    this.host = host;
    if (directive) {
      this.directive = directive;
    }
  }
}
