import { Location } from './location.model';
import { LambdaExpressionChildren } from './lambda-expression-children.model';

export class LambdaExpression {
    name ?= '';
    children?: LambdaExpressionChildren = new LambdaExpressionChildren();
    location?: Location = new Location();
}
