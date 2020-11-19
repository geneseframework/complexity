import { Location } from './location.model';
import { ExpressionStatementChildren } from './expression-statement-children.model';

export class ExpressionStatement {
    name ?= '';
    children?: ExpressionStatementChildren = new ExpressionStatementChildren();
    location?: Location = new Location();
}
