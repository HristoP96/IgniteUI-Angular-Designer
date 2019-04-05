export interface IGridObject {

    width: string;
    height: string;
    selector?: string;
    feature: Array<string>;
    styleSyntax?: number;
    autoGenerate: boolean;
    generateComponent?: () => Object;
}
export class GridObject implements IGridObject {
    public _width;
    public _height;
    public _widthSuff;
    public _heightSuff;

    public set width(value: any) {
        this._width = value;
    }
    public set height(value: any) {
        this._height = value;
    }
    public set widthSuff(value: string) {
        this._widthSuff = value;
    }
    public set heightSuff(value: string) {
        this._heightSuff = value;
    }

    public get width() {
        return `${this._width}${this._widthSuff}`;
    }
    public get height() {
        return `${this._height}${this._heightSuff}`;
    }
    public get widthSuff() {
        return `${this._widthSuff}`;
    }
    public get heightSuff() {
        return `${this._heightSuff}`;
    }

    public generateComponent() {
        const component: IGridObject = {
            autoGenerate: this.autoGenerate,
            feature: this.feature,
            width: this.width,
            height: this.height,
        };
        return component;
    }
    constructor(
        public selector = 'igx-grid',
        public feature = [],
        public styleSyntax = 0,
        public autoGenerate = true) {
        this.width = 100;
        this.height = 700;
        this.widthSuff = '%';
        this.heightSuff = 'px';
    }

}

