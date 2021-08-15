import { ClassOrInterfaceTypeToInstanciateChildren } from './class-or-interface-type-to-instantiate-children.model';
import { Location } from './location.model';

export class ClassOrInterfaceTypeToInstanciate {
    name ?= '';
    classOrInterfaceTypeToInstantiate?: ClassOrInterfaceTypeToInstanciateChildren[] = [new ClassOrInterfaceTypeToInstanciateChildren()];
    location?: Location = new Location();
}
