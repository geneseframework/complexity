import { PrimitiveCastExpression } from './primitive-cast-expression.model';
import { ReferenceTypeCastExpression } from './reference-type-cast-expression.model';

export class CastExpressionChildren {
    primitiveCastExpression?: PrimitiveCastExpression[] = [new PrimitiveCastExpression()];
    referenceTypeCastExpression?: ReferenceTypeCastExpression[] = [new ReferenceTypeCastExpression()];
}
