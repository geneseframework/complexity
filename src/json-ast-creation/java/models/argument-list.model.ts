import { Location } from './location.model';
import { ArgumentListChildren } from './argument-list-children.model';

export class ArgumentList {
    name ?= '';
    children?: ArgumentListChildren = new ArgumentListChildren();
    location?: Location = new Location();
}
