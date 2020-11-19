import { Location } from './location.model';
import { DimExprsChildren } from './dim-exprs-children.model';

export class DimExprs {
    name ?= '';
    children?: DimExprsChildren = new DimExprsChildren();
    location?: Location = new Location();
}
