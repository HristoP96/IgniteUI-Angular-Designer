import { Component, IInputs } from "../Component";

export class HierarchicalGridComponent extends Component {

    constructor(inputs: IInputs[], childNodes: Component[], data?: any) {
        super('igx-hierarchical-grid',
            inputs,
            'hierarchical',
            'IgxHierarchicalGrid',
            'hierarchicalGrid',
            'IgxHierarchicalGridModule',
            childNodes,
            data);
    }
}
