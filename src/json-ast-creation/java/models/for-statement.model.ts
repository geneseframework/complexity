import { Location } from './location.model';
import { ForStatementChildren } from './for-statement-children.model';

export class ForStatement {
    name ?= '';
    children?: ForStatementChildren  = new ForStatementChildren();
    location?: Location = new Location();
}
