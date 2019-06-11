import { Component, IInput } from './Component';

export enum ColumnDataType {
    String = 'string',
    Bool = 'boolean',
    Number = 'number',
    Date = 'date'
}
export class ColumnComponent extends Component {

    private static num = 0;
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
        this.setInputs();
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
