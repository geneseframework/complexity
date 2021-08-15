import { BlockStatements } from './block-statements.model';
import { Infos } from './infos.model';
import { ExplicitConstructorInvocation } from './explicit-constructor-invocation';

export class ConstructorBodyChildren {
    LCurly?: Infos[] = [new Infos()];
    RCurly?: Infos[] = [new Infos()];
    blockStatements: BlockStatements[] = [new BlockStatements()];
    explicitConstructorInvocation?: ExplicitConstructorInvocation[] = [new ExplicitConstructorInvocation()];
}
