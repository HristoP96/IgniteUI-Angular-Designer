import * as fs from 'fs';
import * as path from 'path';
import { Component } from '../models/Component';

export class DataFileBuilder {
    private component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    public addLocalDataFileContent(): any {
        switch(this.component.name){
            case 'IgxGridComponent':
                return fs.readFileSync(path.join(__dirname, '../localData/data.ts'));
        }
    }

    public addCustomDataFileContent(customFile: Blob): any {
        const reader = new FileReader();
        const content =  reader.readAsText(customFile);
        return content;
    }

    // private resolveDataKeys(component: Component) {
    //     switch (this.component.dataType) {
    //         case 'tree':
    //             const childDataKeyInput = this.component.inputs.find((input) =>
    //             input.name === 'childDataKey' && input.value as boolean);
    //             if (childDataKeyInput.value) {
    //                 childDataKeyInput.value = 'Employees';
    //                 data = fs.readFileSync(path.join(__dirname, '../localData/tree-data.ts'));
    //             } else {
    //                 const foreignKey = this.component.inputs.find((input) => 
    //                 input.name === 'foreignKey' && input.value as boolean);
    //                 data = fs.readFileSync(path.join(__dirname, '../localData/tree-data_foreignKey.ts'));
    //             }
    //             break;
    //         case 'hierarchical':
    //             data = fs.readFileSync(path.join(__dirname, '../localData/hierarchical-data.ts'));
    //             break;
    //         case 'flat':
    //             data = fs.readFileSync(path.join(__dirname, '../localData/data.ts'));
    //     }
    // }
}
