import { CatchClauseChildren } from './catch-clause-children.model';
import { Location } from './location.model';

export class CatchClause {
    name ?= '';
    children?: CatchClauseChildren = new CatchClauseChildren();
    location?: Location = new Location();
}
