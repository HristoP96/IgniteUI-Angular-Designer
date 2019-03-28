import { Component, OnInit, Type, ViewChild, AfterViewInit } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { DATA } from '../objects/data';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-design-area',
  templateUrl: './design-area.component.html',
  styleUrls: ['./design-area.component.scss']
})
export class DesignAreaComponent implements OnInit {
  public files: Observable<any>;
  @ViewChild('grid', { read: IgxGridComponent })
  public grid: IgxGridComponent;
  autogenerate = true;
  styleSyntax = 1;
  data = DATA;
  constructor(private service: DataService) {
  }
  ngOnInit() {
    this.files  = this.service.getData();

  }

}