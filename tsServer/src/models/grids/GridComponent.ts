import { ComponentTemplateBuilder } from '../../engine/TemplateBuilder';
import { ColumnComponent, ColumnDataType } from '../ColumnComponent';
import { Component, IInput } from '../Component';
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
    }

    public setInputs(): void {
        this.inputs = [];
        const gridObj = Object.create(this);
        Object.keys(this).forEach((key) => {
            if (typeof gridObj[key] !== 'function') {
                switch (key) {
                    case 'inputs':
                    case 'template':
                    case 'children':
                    case 'selector':
                    case 'name':
                    case 'templateInstance':
                    case 'module':
                        break;
                    default:
                        this.inputs.push({ name: key, value: gridObj[key] });
                }
            }
        });
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
        this.template = new ComponentTemplateBuilder().generateTemplate(this);
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
