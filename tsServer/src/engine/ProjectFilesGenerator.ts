import * as fs from 'fs';
import * as path from 'path';
import { Component } from '../models/Component';
import { IFiles } from '../models/Project';
import { ComponentTemplateBuilder } from './TemplateBuilder';
import { TsFileBuilder } from './TsFileBuilder';

export class ProjectFilesGenerator {
    public files: IFiles;
    private tsFile: string;
    private templateFile: string;
    private stylingFile: string = '';
    private dataFile: string;
    constructor(public component: Component, private ctb: ComponentTemplateBuilder, private tfb: TsFileBuilder ) {

    }
}
