import { Expression } from './expression.model';
import { ArrayInitializer } from './array-initializer.model';

export class VariableInitializerChildren {
    expression?: Expression[] = [new Expression()];
    arrayInitializer?: ArrayInitializer[] = [new ArrayInitializer()];
}
