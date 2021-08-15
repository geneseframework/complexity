import { Location } from './location.model';
import { IfStatementChildren } from './if-statement-children.model';

export class IfStatement {
    name ?= '';
    children?: IfStatementChildren  = new IfStatementChildren();
    location?: Location = new Location();
}
