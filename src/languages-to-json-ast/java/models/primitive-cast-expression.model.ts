import { Location } from './location.model';
import { PrimitiveCastExpressionChildren } from './primitive-cast-expression-children.model';

export class PrimitiveCastExpression {
    name ?= '';
    children?: PrimitiveCastExpressionChildren = new PrimitiveCastExpressionChildren();
    location?: Location = new Location();
}
