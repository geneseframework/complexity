import { Location } from './location.model';
import { NewExpressionChildren } from './new-expression-children.model';

export class NewExpression {
    name ?= '';
    children?: NewExpressionChildren = new NewExpressionChildren();
    location?: Location = new Location();
}
