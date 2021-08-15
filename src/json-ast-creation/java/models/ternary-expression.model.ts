import { Location } from './location.model';
import { TernaryExpressionChildren } from './ternary-expression-children.model';

export class TernaryExpression {
    name ?= '';
    children?: TernaryExpressionChildren = new TernaryExpressionChildren();
    location?: Location = new Location();
}
