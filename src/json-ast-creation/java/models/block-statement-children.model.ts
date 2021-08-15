import { Statement } from './statement.model';
import { LocalVariableDeclarationStatement } from './local-variable-declaration-statement.model';

export class BlockStatementChildren {
    statement?: Statement[] = [new Statement()];
    localVariableDeclarationStatement?: LocalVariableDeclarationStatement[] = [new LocalVariableDeclarationStatement()];
}
