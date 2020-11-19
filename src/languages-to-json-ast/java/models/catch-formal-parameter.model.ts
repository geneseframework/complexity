import { CatchFormalParameterChildren } from './catch-formal-parameter-children.model';
import { Location } from './location.model';

export class CatchFormalParameter {
    name ?= '';
    children?: CatchFormalParameterChildren = new CatchFormalParameterChildren();
    location?: Location = new Location();
}
