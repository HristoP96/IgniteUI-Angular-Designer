import { Component, OnInit,
   Type, ViewChild, AfterViewInit, Renderer2, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { DATA } from '../objects/data';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import {GridFeatures} from '../objects/features';
import { GridObject, IGridObject } from '../objects/grid';

@Component({
  selector: 'app-design-area',
  templateUrl: './design-area.component.html',
  styleUrls: ['./design-area.component.scss']
})
export class DesignAreaComponent implements OnInit {
  public files: Observable<any>;
  public gridType = {type: IgxGridComponent};
  // public gridFactory;
  public styleSyntax = 0;
  public gridObject = {};
  data;
  features = Object.keys(GridFeatures);
  public widthResponsive = true ;
  public heightResponsive = false;
  public width = '';
  public height = '';

  constructor(private service: DataService, private renderer: Renderer2, private el: ElementRef,
    private factoryRes: ComponentFactoryResolver, private vcr: ViewContainerRef) {
      const factory = this.factoryRes.resolveComponentFactory(this.gridType.type);
      this.gridObject['inputs'] = {};
      factory.inputs.forEach(input => this.gridObject['inputs'][input['templateName']] = undefined);
      this.gridObject['selector'] = factory.selector;
      this.gridObject['inputs']['data'] = 'data';
  }
  ngOnInit() {
    this.data = DATA;
    this.files  = this.service.getData();
  }

  setResponsive(element) {
    element.width = element.width + '%';
    return true;
  }

  public check(event) {
    const features = GridFeatures;
    Object.keys(this.gridObject['inputs']).forEach(input => {
      event.selectedItems().forEach(selected => {
        if (input === features[selected]) {
          this.gridObject['inputs'][input] = true;
        }
      });
    });
  }

  public saveComponent(component) {
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
    // Object.keys(this.gridObject['inputs']).forEach(key => this.gridObject['inputs'][key] = undefined );
    result['template'] = template.outerHTML.replace('data', '[data]');
    this.service.postData(result);
  }
}
