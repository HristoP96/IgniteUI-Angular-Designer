import { Component, IInput } from './Component';

export enum ColumnDataType {
    String = 'string',
    Bool = 'boolean',
    Number = 'number',
    Date = 'date'
}
export class ColumnComponent extends Component {

    public static num = 0;
    public inputs: IInput[];
    public template: string;
    public field: string;
    public header: string;
    public dataType: ColumnDataType;
    public editable: boolean = false;
    public groupable: boolean = false;
    public movable: boolean = false;
    public resizable: boolean = false;
    public searchable: boolean = false;
    public sortable: boolean = false;
    public children: Component[] = [];

    constructor(field: string, dataType: ColumnDataType) {
        super('igx-column',
            'IgxColumnComponent',
            'column' + ColumnComponent.num++);
        this.field = field;
        this.header = this.setHeader(field);
        this.dataType = dataType;
    }

    public setInputs(): void {
        this.inputs = [];
        const componentObj = Object.create(this);
        Object.keys(this).forEach((key) => {
            if (typeof componentObj[key] !== 'function') {
                switch (key) {
                    case 'num':
                    case 'inputs':
                    case 'template':
                    case 'children':
                    case 'selector':
                    case 'name':
                    case 'templateInstance':
                    case 'module':
                        break;
                    default:
                        this.inputs.push({ name: key, value: componentObj[key] });
                }
            }

        });
    }

    private setHeader(field: string): string {
        let res = ' ';
        field.split(RegExp('A-Z')).forEach((part) =>
            res += part);
        return res;
    }

}
