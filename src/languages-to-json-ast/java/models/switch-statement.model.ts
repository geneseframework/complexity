import { Location } from './location.model';
import { SwitchStatementChildren } from './switch-statement-children.model';

export class SwitchStatement {
    name ?= '';
    children?: SwitchStatementChildren = new SwitchStatementChildren();
    location?: Location = new Location();
}
