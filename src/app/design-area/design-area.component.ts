import {
  Component, OnInit,
  Type, ViewChild, AfterViewInit, Renderer2, ElementRef, ViewContainerRef, ComponentFactoryResolver, Inject, Injector
} from '@angular/core';
import { IgxGridComponent, IgxDropDownComponent, ConnectedPositioningStrategy } from 'igniteui-angular';
import { IgxHierarchicalGridComponent } from 'igniteui-angular';
import { IgxTreeGridComponent, IgxComboComponent } from 'igniteui-angular';
// import { SINGERS } from '../objects/hierarchical-data';
// import { EMPLOYEE_DATA } from '../objects/tree-data';
// import { DATA } from '../objects/data';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { GridFeatures, ComboFeatures, IgxComponentFeature } from '../objects/features';
import { ComboData } from '../objects/combo-data';
// import sdk from '@stackblitz/sdk';
import { keyframes } from '@angular/animations';
import { componentFactoryName } from '@angular/compiler';

interface HierarchicalStructure {
  tree: { key: string, parent?: string, level: number }[];
}

interface IgxComponent {
  name: string;
  obj: {
    type?: Type<any>,
    subTypes?: IgxComponent[],
    data?: any,
    dataName?: string
  };
  features?: IgxComponentFeature[];
}
@Component({
  selector: 'app-design-area',
  templateUrl: './design-area.component.html',
  styleUrls: ['./design-area.component.scss'],
  providers: []
})
export class DesignAreaComponent implements OnInit {

  public gridTypes: IgxComponent[] = [
    {
      name: 'IgxHierarchicalGrid', obj: { type: IgxHierarchicalGridComponent, data: 'SINGERS', dataName: 'SINGERS' },
      features: GridFeatures
    },
    {
      name: 'IgxTreeGrid', obj: { type: IgxTreeGridComponent, data: 'EMPLOYEE_DATA', dataName: 'EMPLOYEE_DATA' },
      features: GridFeatures
    },
    { name: 'IgxGrid', obj: { type: IgxGridComponent, data: 'DATA', dataName: 'DATA' }, features: GridFeatures }
  ];
  public files: Observable<any>;
  public components: IgxComponent[] = [
    { name: 'Grid', obj: { subTypes: this.gridTypes } },

    { name: 'IgxCombo', obj: { type: IgxComboComponent, data: ComboData, dataName: 'ComboData' }, features: ComboFeatures }
  ];
  public igxComponentObject = undefined;
  type: IgxComponent;
  data;
  features;
  public widthResponsive;
  public heightResponsive;
  public width = '';
  public height = '';
  public project;
  dataObjKeys;
  constructor(private service: DataService, private renderer: Renderer2,
    private factoryRes: ComponentFactoryResolver, private vcr: ViewContainerRef) {
    const factory = this.factoryRes.resolveComponentFactory(IgxComboComponent);
    const componentInstance = this.factoryRes.resolveComponentFactory(IgxComboComponent).create(this.vcr.injector).instance;
  }

  ngOnInit() {
    this.service.project.subscribe(proj => this.project = proj);

  }
  setResponsive(element) {
    element.width = element.width + '%';
    return true;
  }

  public check(event, feature?: IgxComponentFeature) {
    let property;
    if (event instanceof Array) {
      this.type.features.forEach(f => {
        typeof f.prop === 'string' ?
          property = f.prop : property = f.prop.name;
        if (event.every(obj => obj.prop !== f.prop)) {
          this.igxComponentObject['inputs'][property] = undefined;
        } else {
          this.igxComponentObject['inputs'][property] = true;
        }
      });
    } else if (typeof feature.prop !== 'object') {
      this.igxComponentObject['inputs'][feature.prop] = event.checked;
    }
  }

  public getKeyProps() {
    return Object.keys(this.igxComponentObject['inputs']).filter(key => key.toLowerCase().includes('key'));
  }

  public addPropValue(event, property) {
    this.igxComponentObject['inputs'][property] = event;
  }

  public saveComponent() {
    const component = this.igxComponentObject;
    if (this.width) {
      this.igxComponentObject['inputs']['width'] = this.widthResponsive ? this.width + '%' : this.width + 'px';
    }
    if (this.height) {
      this.igxComponentObject['inputs']['height'] = this.heightResponsive ? this.height + '%' : this.height + 'px';
    }

    const keys = Object.keys(component['inputs']);
    keys.forEach(key => {
      if (!this.igxComponentObject['inputs'][key]) {
        delete this.igxComponentObject['inputs'][key];
      }
    });

    this.service.postData(this.igxComponentObject);

  }
  public openStackBlitz() {
   // sdk.openProject(this.project);
    this.width = '';
    this.height = '';
    this.project = undefined;
    this.igxComponentObject = undefined;
    this.features = undefined;
    this.type = undefined;
  }

  public deleteObj() {
    this.igxComponentObject = undefined;
    this.features = undefined;
    this.type = undefined;
  }

  public createComponent(component: IgxComponent): any {
    if (component.obj.subTypes) {
      this.type = component;
      return;
    }
    this.type = component;
    this.igxComponentObject = {};
    this.heightResponsive = false;
    this.widthResponsive = true;
    this.data = component.obj.data;
    this.dataObjKeys = Object.keys(this.type.obj.data[0]);
    if (component.features) {
      this.features = component.features;
    }

    const factory = this.factoryRes.resolveComponentFactory(component.obj.type);


    this.igxComponentObject['inputs'] = {};
    factory.inputs.forEach(input => {
      if (input['templateName'] === 'data') {
        this.igxComponentObject['inputs'][input['templateName']] = this.data;
      } else if (input['templateName'] === 'height') {
        this.igxComponentObject['inputs'][input['templateName']] = 1;
      } else  {
        this.igxComponentObject['inputs'][input['templateName']] = undefined;
      }
    });
    if (component.obj.data) {
      this.igxComponentObject['data'] = {};
      this.igxComponentObject['data']['name'] = component.obj.dataName;
    }
    this.igxComponentObject['selector'] = factory.selector;
    this.igxComponentObject['name'] = factory.componentType.name;
    this.igxComponentObject['module'] = factory.componentType.name.replace('Component', 'Module');
  }

  // private iterate(data, key) {
  //   let record = data;
  //   let str = '';
  //   let child;
  //   Object.values(record).forEach(obj => {
  //     str = `\n<igx-row-island autoGenerate="true"  [key]="'${key}'">\n
  //     ${Object.keys(obj).map(k => {
  //       if (typeof obj[k] === 'object' && !(obj[k] instanceof Date)) {
  //          child = `${this.iterate(obj[k], k)}`;
  //       }
  //     }).join('')} \n${ child ? child : ''}\n </igx-row-island>`;
  //   });
  //   return str;
  // }

  // private test(data) {
  //   let res ;
  //   res = `${Object.keys(data[0]).map(key => {
  //     if (typeof data[0][key] === 'object') {
  //       return this.iterate(data[0][key], key);
  //     }
  //   }).join('')}`;
  //   console.log(res);
  //   return res;
  // }

  public testEv(arg) {
    const reader = new FileReader();
    reader.readAsText(arg.target.files[0]);
  }
}

