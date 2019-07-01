import { Component } from '../models/Component';
import { ITemplateGenerator } from '../models/ITemplateGenerator';
import { NgTemplate } from '../models/NgTemplate';

export class NgTemplateBuilder implements ITemplateGenerator {

  public generateTemplate(ngTemplate: NgTemplate): string {
    return '';
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
        templateVars += `let-${variable} `;
       });
      }
    });

    const close = '>';
    builder = `${open + selector} ${directive} ${templateVars} ${close}`;
    return builder;
  }

  public addChildNodes(ngTemplate: NgTemplate): any {
    if (ngTemplate.components.length !== 0) {
      ngTemplate.components.forEach((c) => {
        if (this.hasComponentTemplateVariables(c)){
          const val = this.returnComponentTemplateVars(c).find(((variable)=>{
            return variable === 'val';
          }));
        }
      });
    }
  }

  public closeOuterTemplate(ngTemplate: NgTemplate): string {
    throw new Error('Method not implemented.');
  }

  private returnComponentTemplateVars(component: Component): string[] | null {
        if (component.templateVariables.length !== 0) {
          return component.templateVariables;
        }
        return null;
  }

  private hasComponentTemplateVariables(component: Component): boolean{
    return component.templateVariables ? true : false;
  }
}
