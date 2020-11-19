import { Location } from './location.model';
import { UnannClassOrInterfaceTypeChildren } from './unann-class-or-interface-type-children.model';

export class UnannClassOrInterfaceType {
    name ?= '';
    children?: UnannClassOrInterfaceTypeChildren = new UnannClassOrInterfaceTypeChildren();
    location?: Location = new Location();
}
