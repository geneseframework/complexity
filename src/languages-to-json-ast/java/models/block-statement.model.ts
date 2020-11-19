import { Location } from './location.model';
import { BlockStatementChildren } from './block-statement-children.model';

export class BlockStatement {
    name ?= '';
    children?: BlockStatementChildren = new BlockStatementChildren();
    location?: Location = new Location();
}
