import { Location } from './location.model';
import { DimExprChildren } from './dim-expr-children.model';

export class DimExpr {
    name ?= '';
    children?: DimExprChildren = new DimExprChildren();
    location?: Location = new Location();
}
