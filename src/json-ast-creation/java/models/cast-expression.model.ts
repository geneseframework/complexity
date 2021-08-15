import { Location } from './location.model';
import { CastExpressionChildren } from './cast-expression-children.model';

export class CastExpression {
    name ?= '';
    children?: CastExpressionChildren = new CastExpressionChildren();
    location?: Location = new Location();
}
