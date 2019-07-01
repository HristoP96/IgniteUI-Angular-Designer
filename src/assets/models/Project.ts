export interface IFiles {
    [path: string]: string;
}

interface IDependency {
    [name: string]: string;
}

export class StackBlitzProject {
    public files: IFiles;
    public dependencies: IDependency;
    public template: 'angular-cli';
    public title: 'Ignite UI for Angular';
    constructor(files: IFiles, dependencies: IDependency) {
        this.files = files;
        this.dependencies = dependencies;
    }
}
