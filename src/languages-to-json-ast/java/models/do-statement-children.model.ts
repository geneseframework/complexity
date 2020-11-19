import { Infos } from './infos.model';
import { Location } from './location.model';
import { Expression } from './expression.model';

export class DoStatementChildren {
    Do?: Infos[] = [new Infos()];
    While?: Infos[] = [new Infos()];
    LBrace?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];
    RBrace?: Infos[] = [new Infos()];
    statement?: [{
        name ?: '',
        children?: {
            statementWithoutTrailingSubstatement?: [{
                name ?: '',
                children?: {
                    block?: [{
                        name ?: '',
                        children?: {
                            LCurly? : Infos[];
                            blockStatements?: [{
                                name ?: '',
                                children?: {
                                    blockStatement?: [{
                                        name ?: '',
                                        children?: {
                                            statement?: [{
                                                name ?: '',
                                                children?: {
                                                    statementWithoutTrailingSubstatement?: [{
                                                        name ?: '',
                                                        children?: {
                                                            expressionStatement?: [{
                                                                name ?: '',
                                                                children?: {
                                                                    statementExpression?: [{
                                                                        name ?: '',
                                                                        children?: {
                                                                            expression?: Expression[]
                                                                        }
                                                                        location?: Location
                                                                    }]
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
                            RCurly? : Infos[];
                        },
                        location?: Location
                    }]
                }
                location?: Location
            }]
        }
        location?: Location
    }] = [{
        name: '',
        children: {
            statementWithoutTrailingSubstatement: [{
                name: '',
                children: {
                    block: [{
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
                                                                    statementExpression: [{
                                                                        name: '',
                                                                        children: {
                                                                            expression: [new Expression()],
                                                                        },
                                                                        location: new Location()
                                                                    }],
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
                    }]
                },
                location: new Location()
            }]
        },
        location: new Location()
    }];
}
