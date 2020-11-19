import { Location } from './location.model';
import { BasicForStatementChildren } from './basic-for-statement-children.model';

export class BasicForStatement {
    name ?= '';
    children?: BasicForStatementChildren  = new BasicForStatementChildren();
    location?: Location = new Location();
}
