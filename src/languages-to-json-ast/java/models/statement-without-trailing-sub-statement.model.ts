import { Location } from './location.model';
import { StatementWithoutTrailingSubstatementChildren } from './statement-without-trailing-substatement-children.model';

export class StatementWithoutTrailingSubstatement {
    name ?= '';
    children?: StatementWithoutTrailingSubstatementChildren = new StatementWithoutTrailingSubstatementChildren();
    location?: Location = new Location();
}
