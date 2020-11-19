import { UnaryExpression } from './unary-expression.model';
import { PrimitiveType } from './primitive-type.model';

export class PrimitiveCastExpressionChildren {
    primitiveType?: PrimitiveType[] = [new PrimitiveType()];
    unaryExpression?: UnaryExpression[] = [new UnaryExpression()];
}
