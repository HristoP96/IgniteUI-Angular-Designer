import {ComponentTemplateBuilder} from '../engine/TemplateBuilder';
import { Component } from './Component';

export class IgxGridProjectFiles {

   public gridTemplate: string;

   protected gridComponent: Component;

   constructor(component: Component, private ctb: ComponentTemplateBuilder) {
      this.gridComponent = component;
      this.ctb = new ComponentTemplateBuilder();
      this.gridTemplate = this.ctb.generateTemplate(this.gridComponent);
   }

}
