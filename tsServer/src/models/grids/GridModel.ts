import { Component } from '../Component';

export abstract class GridModel extends Component {

  protected _autoGenerate: boolean = false;
  protected _allowFiltering: boolean = false;
  protected _columnHiding: boolean = false;
  protected _data: any = null;
  protected _height: string = '700px';
  protected _paging: boolean = false;
  protected _perPage: number = null;
  protected _primaryKey: string = null;
  protected _rowEditable: boolean = false;
  protected _selection: boolean = false;
  protected _toolbar: boolean = false;
  protected _width: string = '100%';

  public abstract setChildren(): void;
  public abstract generateGridTemplate(): void;
  public abstract addData(): void;
}
