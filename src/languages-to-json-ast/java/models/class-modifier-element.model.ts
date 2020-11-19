import { ClassModifierChildren } from './class-modifier-children.model';
import { Location } from './location.model';
import { Children } from '../interfaces/Children';

export class ClassModifierElement implements Children {
    name ?= '';
    children?: ClassModifierChildren = new ClassModifierChildren();
    location?: Location = new Location();
}
