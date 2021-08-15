import { Location } from './location.model';
import { Infos } from './infos.model';
import { UnaryExpression } from './unary-expression.model';

export class BinaryExpressionChildren {
    unaryExpression?: UnaryExpression[] = [new UnaryExpression()];
    BinaryOperator?: Infos[] = [new Infos()];
    AssignmentOperator?: Infos[] = [new Infos()];
    Less?: Infos[] = [new Infos()];
    Greater?: Infos[] = [new Infos()];
    expression?: [{
        name ?: '',
        children?: {
            ternaryExpression?: [{
                name ?: '',
                children?: {
                    binaryExpression?: [{
                        name ?: '',
                        children?: {
                            unaryExpression?: UnaryExpression[],
                            BinaryOperator?: Infos[]
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
            ternaryExpression : [{
                name: '',
                children: {
                    binaryExpression: [{
                        name: '',
                        children: {
                            unaryExpression: [new UnaryExpression()],
                            BinaryOperator: [new Infos()]
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
