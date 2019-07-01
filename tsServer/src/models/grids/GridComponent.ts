import { ComponentTemplateBuilder } from '../../engine/TemplateBuilder';
import {DATA} from '../../localData/data';
import { ColumnComponent, ColumnDataType } from '../ColumnComponent';
import { Component, IInput, resetInputs } from '../Component';
import { GridModel } from './GridModel';
export class GridComponent extends GridModel {
    public inputs: IInput[];
    public template: string;
    public children: ColumnComponent[] = [];

    constructor() {
        super('igx-grid',
            'IgxGridComponent',
            'grid',
            'IgxGridModule');
        this.setInputs();
        this.data = DATA;
        this.primaryKey = 'ProductID';
        this.setChildren();
    }

    public set autoGenerate(val: boolean) {
      this._autoGenerate = val;
      resetInputs(this, 'autoGenerate', val);
    }

    public get autoGenerate() {
      return this._autoGenerate;
    }

    public set allowFiltering(val: boolean) {
      this._allowFiltering = val;
      resetInputs(this, 'allowFiltering', val);
    }

    public get allowFiltering() {
      return this._allowFiltering;
    }

    public set columnHiding(val: boolean) {
      this._columnHiding = val;
      resetInputs(this, 'columnHiding', val);
    }

    public get columnHiding() {
      return this._columnHiding;
    }

    public set data(val: any) {
      this._data = val;
      resetInputs(this, 'data', val);
    }

    public get data() {
      return this._data;
    }

    public set height(val: string) {
      this._height = val;
      resetInputs(this, 'height', val);
    }

    public get height() {
      return this._height;
    }

    public set paging(val: boolean) {
      if (val) {
        this.perPage = 15;
      } else {
        this.perPage = null;
      }
      this._paging = val;
      resetInputs(this, 'paging', val);
    }

    public get paging() {
      return this._paging;
    }

    public set perPage(val: number) {
      this._perPage = val;
      resetInputs(this, 'perPage', val);
    }

    public get perPage() {
      return this._perPage;
    }

    public set primaryKey(val: string) {
      this._primaryKey = val;
      resetInputs(this, 'primaryKey', val);
    }

    public get primaryKey() {
      return this._primaryKey;
    }

    public set rowEditable(val: boolean) {
      this._rowEditable = val;
      resetInputs(this, 'rowEditable', val);
    }

    public get rowEditable() {
      return this._rowEditable;
    }

    public set selection(val: boolean) {
      this._selection = val;
      resetInputs(this, 'selection', val);
    }

    public get selection() {
      return this._selection;
    }

    public set toolbar(val: boolean) {
      this._toolbar = val;
      resetInputs(this, 'toolbar', val);
    }

    public get toolbar() {
      return this._toolbar;
    }

    public set width(val: string) {
      this._width = val;
      resetInputs(this, 'width', val);
    }

    public get width() {
      return this._width;
    }

    public setChildren(): void {
        if (!this.autoGenerate) {
            const firstDataRecord = this.data[0];
            Object.keys(firstDataRecord).forEach((key) => {
                const column = new ColumnComponent(key, this.getColumnType(firstDataRecord[key]));
                this.children.push(column);
            });
        }
    }

    public generateGridTemplate(): void {
        const ctb =  new ComponentTemplateBuilder();
        this.template = ctb.generateTemplate(this);
    }

    public addData(custom?: Blob) {
        if (custom) {
            const reader = new FileReader();
            reader.readAsText(custom);
        }
    }

    private getColumnType(value: any) {
        switch (typeof value) {
            case 'string':
                return ColumnDataType.String;
            case 'number':
                return ColumnDataType.Number;
            case 'boolean':
                return ColumnDataType.Bool;
            case 'object':
                return ColumnDataType.Date;
        }
    }
}
