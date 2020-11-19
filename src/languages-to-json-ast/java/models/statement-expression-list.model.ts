import { StatementExpressionListChildren } from './statement-expression-list-children.model';
import { Location } from './location.model';

export class StatementExpressionList {
    name ?= '';
    children?: StatementExpressionListChildren[] = [new StatementExpressionListChildren()];
    location?: Location = new Location();
}
