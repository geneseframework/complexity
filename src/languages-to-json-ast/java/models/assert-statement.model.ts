import { Location } from './location.model';
import { AssertStatementChildren } from './assert-statement-children.model';

export class AssertStatement {
    name ?= '';
    children?: AssertStatementChildren = new AssertStatementChildren();
    location?: Location = new Location();
}
