import { Location } from './location.model';
import { ArrayCreationExpressionChildren } from './array-creation-expression-children.model';

export class ArrayCreationExpression {
    name ?= '';
    children?: ArrayCreationExpressionChildren = new ArrayCreationExpressionChildren();
    location?: Location = new Location();
}
