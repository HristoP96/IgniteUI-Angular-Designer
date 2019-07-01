import { Component, IInput } from './Component';

export class NgTemplate {
  public template: string;
  public components: Component[];
  public selector: string = 'ng-template';
  public directive: string;

  constructor(components: Component[], directive?: string) {
    this.components = components;
    if (directive) {
      this.directive = directive;
    }
  }
}
