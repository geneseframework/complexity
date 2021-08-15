import { Location } from './location.model';
import { LocalVariableTypeChildren } from './local-variable-type-children.model';

export class LocalVariableType {
    name ?= '';
    children?: LocalVariableTypeChildren = new LocalVariableTypeChildren();
    location?: Location = new Location();
}
