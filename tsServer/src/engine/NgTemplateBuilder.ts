import { Component, IComponetTemplVariable, IInput } from '../models/Component';
import { ITemplateGenerator } from '../models/ITemplateGenerator';
import { NgTemplate } from '../models/NgTemplate';
import { ComponentTemplateBuilder } from './TemplateBuilder';

export class NgTemplateBuilder implements ITemplateGenerator {

  private ctb: ComponentTemplateBuilder;
  public generateTemplate(ngTemplate: NgTemplate): string {
    let res = '';

      // tslint:disable-next-line: max-line-length
    res = `${this.openOuterTemplate(ngTemplate)}\r\n${this.addChildNodes(ngTemplate)}
${ this.closeOuterTemplate(ngTemplate)}`;

    return res;
  }

  public openOuterTemplate(ngTemplate: NgTemplate): string {
    let builder = '';
    const open = '<';
    let directive = '';
    let templateVars = '';

    const selector = ngTemplate.selector;
    if (ngTemplate.directive) {
      directive = ngTemplate.directive;
    }

    ngTemplate.components.forEach((c) => {
      if (this.hasComponentTemplateVariables(c)) {
        this.returnComponentTemplateVars(c).forEach((variable) => {
        templateVars += variable.implicit ? `let-${variable} ` : `let-${variable.name}='${variable.name}' `;
       });
      }
    });

    const close = '>';
    builder = `${open + selector} ${directive} ${templateVars} ${close}`;
    return builder;
  }

  public addChildNodes(ngTemplate: NgTemplate): any {
    let childTemplates = ' ';
    if (ngTemplate.components.length !== 0) {
      ngTemplate.components.forEach((c) => {
        childTemplates += this.ctb.generateTemplate(c);
      });
    }
    return childTemplates;
  }

  public closeOuterTemplate(ngTemplate: NgTemplate): string {
    const open = '<';
    const selector = ngTemplate.selector;
    const close = '>';
    return `${open}/${selector + close}`;
  }

  private returnComponentTemplateVars(component: Component): IComponetTemplVariable[] | null {
        if (component.templateVariables.length !== 0) {
          return component.templateVariables;
        }
        return null;
  }

  private hasComponentTemplateVariables(component: Component): boolean {
    return component.templateVariables ? true : false;
  }

  private bindHost( ngTemplate: NgTemplate, component: Component) {
    const hostDataVar = this.getComponentDataVariable(ngTemplate.host);
    const childDataVar = this.getComponentDataVariable(component);

    // tslint:disable-next-line:max-line-length
    component.template.replace(/([[a-zA-Z]*]='[a-zA-Z0-9]*')?([a-zA-Z]*='[a-zA-Z0-9]*')?/g, `[${childDataVar.name}]='${ngTemplate.host.templateInstance}.${hostDataVar.name}'`);
  }

  private getComponentDataVariable(component: Component): IInput {
      const dataVar = component.inputs.find( input => {
        switch (input.name) {
          case 'data':
          case 'value':
          case 'dataSource':
            return input;
        }
      });
      return dataVar;
  }
}
