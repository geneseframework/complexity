import { ConstructorModifierChildren } from './constructor-modifier-children.model';
import { Location } from './location.model';

export class ConstructorModifier {
    name ?= '';
    children?: ConstructorModifierChildren = new ConstructorModifierChildren();
    location?: Location = new Location();
}
