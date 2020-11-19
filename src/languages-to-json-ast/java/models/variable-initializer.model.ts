import { Location } from './location.model';
import { VariableInitializerChildren } from './variable-initializer-children.model';

export class VariableInitializer {
    name ?= '';
    children?: VariableInitializerChildren = new VariableInitializerChildren();
    location?: Location = new Location();
}
