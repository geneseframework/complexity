import { Location } from './location.model';
import { UnqualifiedClassInstanceCreationExpressionChildren } from './unqualified-class-instance-creation-expression-children.model';

export class UnqualifiedClassInstanceCreationExpression {
    name ?= '';
    children?: UnqualifiedClassInstanceCreationExpressionChildren = new UnqualifiedClassInstanceCreationExpressionChildren();
    location?: Location = new Location();
}
