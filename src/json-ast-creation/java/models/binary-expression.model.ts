import { Location } from './location.model';
import { BinaryExpressionChildren } from './binary-expression-children.model';

export class BinaryExpression {
    name ?= '';
    children?: BinaryExpressionChildren = new BinaryExpressionChildren();
    location?: Location = new Location();
}
