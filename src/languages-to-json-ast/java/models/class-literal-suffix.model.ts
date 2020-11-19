import { Location } from './location.model';
import { ClassLiteralSuffixChildren } from './class-literal-suffix-children.model';

export class ClassLiteralSuffix {
    name ?= '';
    children?: ClassLiteralSuffixChildren = new ClassLiteralSuffixChildren();
    location?: Location = new Location();
}
