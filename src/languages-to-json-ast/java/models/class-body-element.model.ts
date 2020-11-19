import { Location } from './location.model';
import { ClassBodyChildren } from './class-body-children.model';
import { Children } from '../interfaces/Children';

export class ClassBodyElement implements Children {
    name ?= '';
    children?: ClassBodyChildren = new ClassBodyChildren();
    location?: Location = new Location();
}
