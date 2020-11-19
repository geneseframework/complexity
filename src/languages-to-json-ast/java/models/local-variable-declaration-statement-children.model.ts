import { LocalVariableDeclaration } from './local-variable-declaration.model';
import { Infos } from './infos.model';

export class LocalVariableDeclarationStatementChildren {
    localVariableDeclaration?: LocalVariableDeclaration[] = [new LocalVariableDeclaration()];
    Semicolon?: Infos[] = [new Infos()];
}
