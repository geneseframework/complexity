import { Location } from './location.model';
import { ReferenceTypeCastExpressionChildren } from './reference-type-cast-expression-children.model';

export class ReferenceTypeCastExpression {
    name ?= '';
    children?: ReferenceTypeCastExpressionChildren = new ReferenceTypeCastExpressionChildren();
    location?: Location = new Location();
}
