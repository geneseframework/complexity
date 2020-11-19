import { Location } from './location.model';
import { ReturnStatementChildren } from './return-statement-children.model';

export class ReturnStatement {
    name ?= '';
    children?: ReturnStatementChildren = new ReturnStatementChildren();
    location?: Location = new Location();
}
