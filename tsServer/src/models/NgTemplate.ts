import { Component, IInput } from './Component';

export class NgTempalte extends Component {
  public inputs: IInput[] = [];
  public children: Component[]
  public template: string;
}
