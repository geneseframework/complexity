import { Location } from './location.model';
import { UnaryExpressionNotPlusMinusChildren } from './unary-expression-not-plus-minus-children.model';

export class UnaryExpressionNotPlusMinus {
    name ?= '';
    children?: UnaryExpressionNotPlusMinusChildren = new UnaryExpressionNotPlusMinusChildren();
    location?: Location = new Location();
}
