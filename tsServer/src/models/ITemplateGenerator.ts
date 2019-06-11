import { Component } from './Component';

export interface ITemplateGenerator {
    generateTemplate(component: Component): string;
}
