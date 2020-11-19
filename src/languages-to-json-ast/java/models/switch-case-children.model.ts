import { SwitchLabel } from './switch-label.model';
import { Location } from './location.model';
import { Infos } from './infos.model';
import { Expression } from './expression.model';

export class SwitchCaseChildren {
    switchLabel?: SwitchLabel[] = [new SwitchLabel()];
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
                                                    }],
                                                Semicolon?: Infos[]
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
    }] = [{
        name: '',
        children: {
            blockStatement : [{
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
                                            Semicolon: [new Infos()]
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
                location: new Location(),
            }]
        },
        location: new Location(),
    }]
}
