import { Component } from './Component';
import { NgTemplate } from './NgTemplate';

export interface ITemplateGenerator {
    generateTemplate(component: Component | NgTemplate): string;
    openOuterTemplate(component: Component | NgTemplate): string;
    closeOuterTemplate(component: Component | NgTemplate): string;
    addChildNodes(component: Component | NgTemplate): any | void;
}
