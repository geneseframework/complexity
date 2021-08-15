import { Location } from './location.model';
import { TypeArgumentsChildren } from './type-arguments-children.model';

export class TypeArguments {
    name ?= '';
    children?: TypeArgumentsChildren = new TypeArgumentsChildren();
    location?: Location = new Location();
}
