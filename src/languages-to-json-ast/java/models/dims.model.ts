import { Location } from './location.model';
import { DimsChildren } from './dims-children.model';

export class Dims {
    name ?= '';
    children?: DimsChildren = new DimsChildren();
    location?: Location = new Location();
}
