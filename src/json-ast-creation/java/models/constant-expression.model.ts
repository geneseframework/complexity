import { Location } from './location.model';
import { ConstantExpressionChildren } from './constant-expression-children.model';

export class ConstantExpression {
    name ?= '';
    children?: ConstantExpressionChildren = new ConstantExpressionChildren();
    location?: Location = new Location();
}
