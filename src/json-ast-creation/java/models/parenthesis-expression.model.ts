import { Location } from './location.model';
import { ParenthesisExpressionChildren } from './parenthesis-expression-children.model';

export class ParenthesisExpression {
    name ?= '';
    children?: ParenthesisExpressionChildren = new ParenthesisExpressionChildren();
    location?: Location = new Location();
}
