import { Location } from './location.model';
import { ExpressionChildren } from './expression-children.model';

export class Expression {
    name ?= '';
    children?: ExpressionChildren = new ExpressionChildren();
    location?: Location = new Location();
}
