import { Location } from './location.model';
import { ClassTypeChildren } from './class-type-children.model';

export class ClassType {
    name ?= '';
    children?: ClassTypeChildren = new ClassTypeChildren();
    location?: Location = new Location();
}
