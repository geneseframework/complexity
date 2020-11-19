import { AnnotationChildren } from './annotation-children.model';
import { Location } from './location.model';

export class AnnotationElement {
    name ?= '';
    children?: AnnotationChildren = new AnnotationChildren();
    location?: Location = new Location();
}
