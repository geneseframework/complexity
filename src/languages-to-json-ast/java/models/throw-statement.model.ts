import { Location } from './location.model';
import { ThrowStatementElementChildren } from './throw-statement-element-children.model';

export class ThrowStatementElement {
    name?= '';
    children?: ThrowStatementElementChildren = new ThrowStatementElementChildren();
    location?: Location = new Location();
}
