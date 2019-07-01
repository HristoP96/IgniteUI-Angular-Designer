import * as fs from 'fs';
import * as path from 'path';
import { Component } from '../models/Component';
import { IFiles } from '../models/Project';
import { ComponentTemplateBuilder } from './TemplateBuilder';
import { TsFileBuilder } from './TsFileBuilder';

export class ProjectFilesGenerator {
    public files: IFiles;
    private tsFileContent: string;
    private templateFileContent: string;
    private stylingFileContent: string = '';
    private dataFileContent: string;
    private dependenciesContent: string;
    private angularFileContent: string;
    private globalStylesFileContent: string;
    private ctb: ComponentTemplateBuilder;
    private tfb: TsFileBuilder;
    private component: Component;

    constructor(component: Component) {
        this.component =  component;
        this.ctb = new ComponentTemplateBuilder();
        this.tfb = new TsFileBuilder(component);
    }

    private generateSrcFiles( ){
        this.templateFileContent = this.ctb.generateTemplate(this.component);

    }
}
