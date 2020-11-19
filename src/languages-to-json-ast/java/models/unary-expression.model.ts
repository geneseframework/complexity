import { Location } from './location.model';
import { UnaryExpressionChildren } from './unary-expression-children.model';

export class UnaryExpression {
    name ?= '';
    children?: UnaryExpressionChildren = new UnaryExpressionChildren();
    location?: Location = new Location();
}
