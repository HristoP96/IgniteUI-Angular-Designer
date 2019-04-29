import { Component, IInput } from '../Component';

export abstract class GridModel extends Component {

    public set perPage(num: number) {
        if (this.paging) {
            this._perPage = num;
        } else {
            this._perPage = undefined;
        }
    }

    public get perPage() {
        return this._perPage;
    }

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

    private _perPage: number = 15;
    public abstract setChildren(): void;
    public abstract generateGridTemplate(): void;

}
