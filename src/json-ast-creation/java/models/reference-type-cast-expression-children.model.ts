import { ReferenceType } from './reference-type.model';
import { UnaryExpressionNotPlusMinus } from './unary-expression-not-plus-minus.model';
import { LambdaExpression } from './lambda-expression.model';

export class ReferenceTypeCastExpressionChildren {
    referenceType?: ReferenceType[] = [new ReferenceType()];
    unaryExpressionNotPlusMinus?: UnaryExpressionNotPlusMinus[] = [new UnaryExpressionNotPlusMinus()];
    lambdaExpression?: LambdaExpression[] = [new LambdaExpression()];
}
