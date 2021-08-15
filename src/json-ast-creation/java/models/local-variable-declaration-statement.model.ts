import { Location } from './location.model';
import { LocalVariableDeclarationStatementChildren } from './local-variable-declaration-statement-children.model';

export class LocalVariableDeclarationStatement {
    name ?= '';
    children?: LocalVariableDeclarationStatementChildren = new LocalVariableDeclarationStatementChildren();
    location?: Location = new Location();
}
