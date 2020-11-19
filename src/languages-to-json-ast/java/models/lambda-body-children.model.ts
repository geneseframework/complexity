import { Block } from './block.model';
import { Expression } from './expression.model';

export class LambdaBodyChildren {
    block?: Block[] = [new Block()];
    expression?: Expression[] = [new Expression()];
}
