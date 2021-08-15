import { Location } from './location.model';
import { ExceptionTypeListChildren } from './exception-type-list-children.model';

export class ExceptionTypeList {
    name ?= '';
    children?: ExceptionTypeListChildren = new ExceptionTypeListChildren();
    location?: Location = new Location();
}
