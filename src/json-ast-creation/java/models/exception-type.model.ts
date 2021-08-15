import { Location } from './location.model';
import { ExceptionTypeChildren } from './exception-type-children.model';

export class ExceptionType {
    name ?= '';
    children?: ExceptionTypeChildren = new ExceptionTypeChildren();
    location?: Location = new Location();
}
