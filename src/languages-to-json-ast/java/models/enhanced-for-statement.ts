import { Location } from './location.model';
import { EnhancedForStatementChildren } from './enhanced-for-statement-children.model';

export class EnhancedForStatement {
    name ?= '';
    children?: EnhancedForStatementChildren = new EnhancedForStatementChildren();
    location?: Location = new Location();
}
