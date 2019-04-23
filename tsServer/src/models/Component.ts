interface IInput {
    name: string;
    value: string | number | boolean | object;
}

interface IData {
    name: string;
    value: any;

}
export class Component {
    public data: object;
    public selector: string;
    public inputs: IInput[];
    public name: string;
    public templateInstance: string;
    public module: string;
    public childNodes: Component[];

    constructor(data: object,
                selector: string,
                inputs: IInput[],
                name: string,
                module: string,
                childNodes?: Component[]) {
        this.data = data;
        this.selector = selector;
        this.inputs = inputs;
        this.templateInstance = `#${this.selector.substr(this.selector.indexOf('-') + 1)}`;
        this.name = name;
        this.module = module;
        if (childNodes) {
        this.childNodes = childNodes;
        }
    }

}
