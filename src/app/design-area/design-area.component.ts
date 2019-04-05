import {
  Component, OnInit,
  Type, ViewChild, AfterViewInit, Renderer2, ElementRef, ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';
import { IgxGridComponent, IgxDropDownComponent, ConnectedPositioningStrategy } from 'igniteui-angular';
import { IgxHierarchicalGridComponent } from 'igniteui-angular';
import { IgxTreeGridComponent, IgxComboComponent } from 'igniteui-angular';
import { SINGERS } from '../objects/hierarchical-data';
import { EMPLOYEE_DATA } from '../objects/tree-data';
import { DATA } from '../objects/data';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { GridFeatures, ComboFeatures } from '../objects/features';
import {ComboData} from '../objects/combo-data';
import { GridObject, IGridObject } from '../objects/grid';
import sdk from '@stackblitz/sdk';
import { keyframes } from '@angular/animations';
import { componentFactoryName } from '@angular/compiler';

interface HierarchicalStructure {
  tree: { key: string, parent?: string, level: number}[];
}
@Component({
  selector: 'app-design-area',
  templateUrl: './design-area.component.html',
  styleUrls: ['./design-area.component.scss']
})
export class DesignAreaComponent implements OnInit {

  public files: Observable<any>;
  public gridTypes = [
    { name: 'IgxGrid', obj: { type: IgxGridComponent, data: DATA, dataName: 'DATA' }, features: GridFeatures },
  //   { name: 'IgxHierarGrid', obj: { type: IgxHierarchicalGridComponent, data: SINGERS, dataName: 'SINGERS' }
  //  },
  //   { name: 'IgxTreeGrid', obj: { type: IgxTreeGridComponent, data: EMPLOYEE_DATA, dataName: 'EMPLOYEE_DATA' }
  //  }
  {name: 'IgxCombo', obj: {type: IgxComboComponent, data: ComboData, dataName: 'ComboData'}, features: ComboFeatures}
  ];
  // public gridFactory;
  public styleSyntax = 0;
  public gridObject = undefined;
  type;
  data;
  gridFeatures;
  comboFeatures;
  public widthResponsive = true;
  public heightResponsive = false;
  public width = '';
  public height = '';
  public project;
  dataObjKeys;
  constructor(private service: DataService, private renderer: Renderer2, private el: ElementRef,
    private factoryRes: ComponentFactoryResolver, private vcr: ViewContainerRef) {

  }
  ngOnInit() {
    this.service.project.subscribe(proj => this.project = proj);

    this.files = this.service.getData();
  }
  setResponsive(element) {
    element.width = element.width + '%';
    return true;
  }

  public check(event, feature?: any) {
    if (event instanceof Array) {
      this.type.features .forEach(f => {
        if (event.every( obj => obj.prop !== f.prop)) {
          this.gridObject['inputs'][f.prop] = undefined;
        } else {
          this.gridObject['inputs'][f.prop] = true;
         }
      });
    } else if ( typeof feature.prop !== 'object') {
      this.gridObject['inputs'][feature.prop] = event.checked;
    }
  }

  public addPropValue(event, property) {
    this.gridObject['inputs'][property] = event;
  }

  public saveComponent() {
    const component = this.gridObject;
    const template =  this.renderer.createElement(component['selector']);
    if (this.width) {
      component['inputs']['width'] = this.widthResponsive ? this.width + '%' : this.width + 'px';
    }
    if (this.height) {
      component['inputs']['height'] = this.heightResponsive ? this.height + '%' : this.height + 'px';
    }
    const keys = Object.keys(component['inputs']).filter(input => component['inputs'][input]);
    keys.forEach(key => {
      template.setAttribute(key, component['inputs'][key]);
    });
    template.removeAttribute('_ngcontent-c1');

    const result = {};
    this.width = '';
    this.height = '';
    result['template'] = template.outerHTML.replace('data', '[data]');
    keys.forEach(key => {
      if (result['template'].includes(key.toLocaleLowerCase())) {
        result['template'] =  result['template'].replace(key.toLocaleLowerCase(), key);
      }
    });
    Object.keys(this.gridObject['inputs']).forEach(key => { if (key !== 'data' && key !== 'autoGenerate') {
                                                                 this.gridObject['inputs'][key] = undefined;
                                                                }} );
    result['selector'] = component['selector'];
    result['name'] = component['name'];
    result['module'] = component['module'];
    result['data'] = component['data'];
    this.service.postData(result);

  }
  public openStackBlitz() {
    sdk.openProject(this.project);
    this.project = undefined;
    this.gridObject = undefined;
    this.gridFeatures = undefined;
    this.comboFeatures = undefined;
  }

  public createComponent(component): any {
    this.type = component;
    this.gridObject = {};
    this.data = component.obj.data;
    this.dataObjKeys = Object.keys(this.data[0]);
    const factory = this.factoryRes.resolveComponentFactory(component.obj.type);
    if (factory.componentType.name.includes('Grid')) {
      this.gridFeatures = component.features;
    } else {
      this.comboFeatures = component.features;
    }

    this.gridObject['inputs'] = {};
    factory.inputs.forEach(input => {
        if (input['templateName'] === 'autoGenerate') {
          this.gridObject['inputs'][input['templateName']] = true;
        } else if (input['templateName'] === 'data') {
          this.gridObject['inputs'][input['templateName']] = 'data';
        } else {
          this.gridObject['inputs'][input['templateName']] = undefined;
        }
      });
    if (component.obj.data) {
      this.gridObject['data'] = {};
      this.gridObject['data']['value'] = component.obj.data;
      this.gridObject['data']['name'] = component.obj.dataName;
      // this.gridObject['data']['structure'] = this.resolveData(obj);
    }
    this.gridObject['selector'] = factory.selector;
    this.gridObject['name'] = factory.componentType.name;
    this.gridObject['module'] = factory.componentType.name.replace('Component', 'Module');
  }

  // public resolveData(obj) {
  //   const firstElement = obj.data[0];
  //   let result;
  //   if (Object.values(firstElement).every(value => typeof value !== 'object' || value instanceof Date)) {
  //     result = {type: 'flat'};
  //   } else if (obj.type.name.includes('Tree')) {
  //     const childDataKey = Object.keys(firstElement)
  //       .find(key => typeof firstElement[key] === 'object' && !(firstElement[key] instanceof Date));
  //     const  fields = Object.keys(firstElement).filter(keys => keys !== childDataKey);
  //     result = {childDataKey: childDataKey, type: 'tree', fields: fields};
  //   } else {
  //     result = this.resolveHierarchicalData(firstElement);

  //   }
  //   return result;
  // }

  // public resolveHierarchicalData(data) {
  //   const obj: HierarchicalStructure = {
  //     tree: []
  //   };
  //   const keys = new Set<string>();
  //   Object.keys(data).forEach(key => {
  //     if (data[key] && typeof data[key] === 'object' && !(data[key] instanceof Date)) {
  //       obj['tree'].push({ key: key, level: 1 });
  //       Object.values(data[key]).forEach(val =>
  //         Object.keys(val).forEach(childKey => {
  //           if (typeof val[childKey] === 'object' && !(val[childKey] instanceof Date)) {
  //             keys.add(childKey);
  //           }
  //         }));
  //       if (keys.values().next().value) {
  //         obj['tree'].push({ key: keys.values().next().value, parent: key, level: 2 });
  //       }
  //     }
  //   });
  //   return {tree: obj, maxLevel: 2, type: 'hierarchical'};
  // }

  // public resolveTreeGridComponent(template) {
  //   const fields = this.gridObject['data']['structure']['fields'];
  //   const childDataKey = this.gridObject['data']['structure']['childDataKey'];
  //   template.setAttribute('childDataKey', childDataKey);
  //   for (let index = 0; index < fields.length; index++) {
  //     const col = this.renderer.createElement('igx-column');
  //     col.setAttribute('name', fields[index]);
  //     col.removeAttribute('_ngcontent-c1');
  //     template.append(col);
  //   }
  // }

  // public resolveHierarchicalHridComponent(template) {

  // }
}
