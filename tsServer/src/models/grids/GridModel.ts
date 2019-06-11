import { Component, IInput } from '../Component';

export abstract class GridModel extends Component {

    public autoGenerate: boolean = false;
    public selection: boolean = false;
    public toolbar: boolean = false;
    public allowFiltering: boolean = false;
    public columnHiding: boolean = false;
    public rowEditable: boolean = false;
    public paging: boolean = false;
    public width: string = '100%';
    public height: string = '700px';
    public primaryKey: string;
    public data: any;
    // tslint:disable-next-line:variable-name
    public perPage: number = 15;
    public abstract setChildren(): void;
    public abstract generateGridTemplate(): void;
    public abstract addData(): void;
}
