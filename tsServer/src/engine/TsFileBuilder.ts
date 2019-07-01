import * as fs from 'fs';
import * as path from 'path';
import { Component } from '../models/Component';

export class TsFileBuilder {
    public declarations: string[];
    public initialization: string;
    public attributes: Map<string, any>;
    public component: Component;

// tslint:disable-next-line: variable-name
    private _tsFile: string;
    constructor(component: Component) {
        this.component = component;
        this.attributes = new Map<string, any>();
        this._tsFile = fs.readFileSync(path.join(__dirname,
            './templates/component_templates/component.ts.template'),
            { encoding: 'utf8' });
    }

    get tsFile() {
        return this._tsFile;
    }
}
