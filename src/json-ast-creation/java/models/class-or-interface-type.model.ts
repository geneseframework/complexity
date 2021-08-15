import { Location } from './location.model';
import { ClassOrInterfaceTypeChildren } from './class-or-interface-type-children.model';

export class ClassOrInterfaceType {
    name ?= '';
    children?: ClassOrInterfaceTypeChildren = new ClassOrInterfaceTypeChildren();
    location?: Location = new Location()
}
