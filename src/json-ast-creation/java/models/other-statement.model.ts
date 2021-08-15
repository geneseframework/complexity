import { StatementWithoutTrailingSubstatement } from './statement-without-trailing-sub-statement.model';
import { Location } from './location.model';

export class OtherStatement {
    name ?= '';
    children?: StatementWithoutTrailingSubstatement[] = [new StatementWithoutTrailingSubstatement()];
    location?: Location = new Location();
}
