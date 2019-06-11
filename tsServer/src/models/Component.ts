export interface IInput {
    name: string;
    value: string | number | boolean | object;
}

export interface IData {
    name: string;
    value: any;
}
export abstract class Component {
    public selector: string;
    public abstract inputs: IInput[];
    public abstract children: Component[];
    public abstract template: string;
    public name: string;
    public templateInstance: string;
    public module: string;
    public inputsForDataBind: Map<string, any>;
    constructor(selector: string,
                name: string,
                templateInstance: string,
                module?: string
                ) {
        this.selector = selector;
        this.templateInstance = `#${templateInstance}`;
        this.name = name;
        if (module) {
            this.module = module;
        }
    }
    public abstract setInputs(): void;
}
