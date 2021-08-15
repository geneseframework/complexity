import { IfStatement } from './if-statement.model';
import { StatementWithoutTrailingSubstatement } from './statement-without-trailing-sub-statement.model';
import { WhileStatement } from './while-statement.model';
import { ForStatement } from './for-statement.model';

export class StatementChildren {
    ifStatement?: IfStatement[] = [new IfStatement()];
    forStatement?: ForStatement[] = [new ForStatement()];
    statementWithoutTrailingSubstatement?: StatementWithoutTrailingSubstatement[] = [new StatementWithoutTrailingSubstatement()];
    whileStatement?: WhileStatement[] = [new WhileStatement()];
}
