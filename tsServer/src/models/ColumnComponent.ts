import { Component, IInput, resetInputs } from './Component';
import { NgTemplate } from './NgTemplate';
export enum ColumnDataType {
  String = 'string',
  Bool = 'boolean',
  Number = 'number',
  Date = 'date'
}
export class ColumnComponent extends Component {
  private static num = 0;

  public children: Component[] = [];
  public inputs: IInput[];
  public template: string;

  private _dataType: ColumnDataType = null;
  private _editable: boolean = false;
  private _field: string = null;
  private _groupable: boolean = false;
  private _header: string = null;
  private _movable: boolean = false;
  private _resizable: boolean = false;
  private _searchable: boolean = false;
  private _sortable: boolean = false;
  private _ngTemplate: NgTemplate = null;

  constructor(field: string, dataType: ColumnDataType) {
    super('igx-column',
      'IgxColumnComponent',
      'column' + ColumnComponent.num++,
      null, [{implicit: true, name: 'value'}, {implicit: false, name: 'cell'}]);
    this.setInputs();
    this.field = field;
    this.header = this.setHeader(field);
    this.dataType = dataType;

  }

  public set ngTemplate(template: NgTemplate) {
    this._ngTemplate = template;
  }

  public get ngTemplate() {
    return this._ngTemplate;
  }

  public set dataType(val: any) {
    this._dataType = val as ColumnDataType;
    resetInputs(this, 'dataType', val);
  }

  public get dataType() {
    return this._dataType;
  }

  public set editable(val: boolean) {
    this._editable = val;
    resetInputs(this, 'editable', val);
  }

  public get editable() {
    return this._editable;
  }

  public set field(val: string) {
    this._field = val;
    resetInputs(this, 'field', val);
  }

  public get field() {
    return this._field;
  }

  public set groupable(val: boolean) {
    this._groupable = val;
    resetInputs(this, 'groupable', val);
  }

  public get groupable() {
    return this._groupable;
  }

  public set header(val: string) {
    this._header = val;
    resetInputs(this, 'header', val);
  }

  public get header() {
    return this._header;
  }

  public set movable(val: boolean) {
    this._movable = val;
    resetInputs(this, 'movable', val);
  }

  public get movable() {
    return this._movable;
  }

  public set resizable(val: boolean) {
    this._resizable = val;
    resetInputs(this, 'resizable', val);
  }

  public get resizable() {
    return this._resizable;
  }

  public set searchable(val: boolean) {
    this._searchable = val;
    resetInputs(this, 'searchable', val);
  }

  public get searchable() {
    return this._searchable;
  }

  public set sortable(val: boolean) {
    this._sortable = val;
    resetInputs(this, 'sortable', val);
  }

  public get sortable() {
    return this._sortable;
  }

  private setHeader(field: string): string {
    let res = '';
    const upperCaseChars = field.match(/[A-Z]{1,}/g);
    for (let index = 0; index < upperCaseChars.length; index++) {
      if (!(index === upperCaseChars.length - 1)) {
        res += field.substring(field.indexOf(upperCaseChars[index]),
          field.indexOf(upperCaseChars[index + 1])) + ' ';
      } else {
        res += field.substring(field.indexOf(upperCaseChars[index]));
      }
    }
    return res;
  }

}
