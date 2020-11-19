import { Location } from './location.model';
import { StatementExpressionChildren } from './statement-expression-children.model';

export class StatementExpression {
    name ?= '';
    children?: StatementExpressionChildren[] = [new StatementExpressionChildren()];
    location?: Location = new Location();
}
