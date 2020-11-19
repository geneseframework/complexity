import { Location } from './location.model';
import { TryStatementChildren } from './try-statement-children.model';

export class TryStatement {
    name ?= '';
    children?: TryStatementChildren = new TryStatementChildren();
    location?: Location = new Location();
}
