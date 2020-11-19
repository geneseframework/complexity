import { SwitchStatement } from './switch-statement.model';
import { ExpressionStatement } from './expression-statement.model';
import { ReturnStatement } from './return-statement.model';
import { Infos } from './infos.model';
import { StatementExpression } from './statement-expression.model';
import { Location } from './location.model';
import { DoStatement } from './do-statement.model';
import { TryStatement } from './try-statement.model';
import { ThrowStatementElement } from './throw-statement.model';
import { AssertStatement } from './assert-statement.model';

export class StatementWithoutTrailingSubstatementChildren {
    switchStatement?: SwitchStatement[] = [new SwitchStatement()];
    expressionStatement?: ExpressionStatement[] = [new ExpressionStatement()];
    returnStatement?: ReturnStatement[] = [new ReturnStatement()];
    doStatement?: DoStatement[] = [new DoStatement()];
    tryStatement?: TryStatement[] = [new TryStatement()];
    throwStatement?: ThrowStatementElement[] = [new ThrowStatementElement()];
    assertStatement?: AssertStatement[] = [new AssertStatement()];
    block?: [{
        name?: '',
        children?: {
            LCurly?: Infos[];
            blockStatements?: [{
                name?: '',
                children?: {
                    blockStatement?: [{
                        name?: '',
                        children?: {
                            statement?: [{
                                name?: '',
                                children?: {
                                    statementWithoutTrailingSubstatement?: [{
                                        name?: '',
                                        children?: {
                                            expressionStatement?: [{
                                                name?: '',
                                                children?: {
                                                    statementExpression?: StatementExpression[]
                                                }
                                                location?: Location
                                            }]
                                        }
                                        location?: Location
                                    }]
                                }
                                location?: Location
                            }],
                        }
                        location?: Location
                    }],
                },
                location?: Location,
            }],
            RCurly?: Infos[];
        },
        location?: Location
    }] = [{
        name: '',
        children: {
            LCurly: [new Infos()],
            blockStatements: [{
                name: '',
                children: {
                    blockStatement: [{
                        name: '',
                        children: {
                            statement: [{
                                name: '',
                                children: {
                                    statementWithoutTrailingSubstatement: [{
                                        name: '',
                                        children: {
                                            expressionStatement: [{
                                                name: '',
                                                children: {
                                                    statementExpression: [new StatementExpression()],
                                                },
                                                location: new Location()
                                            }],
                                        },
                                        location: new Location()
                                    }]
                                },
                                location: new Location()
                            }],
                        },
                        location: new Location()
                    }]
                },
                location: new Location()
            }],
            RCurly: [new Infos()]
        },
        location: new Location()
    }];
}
