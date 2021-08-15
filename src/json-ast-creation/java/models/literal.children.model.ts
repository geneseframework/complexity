import { IntegerLiteral } from './integer-literal.model';
import { BooleanLiteral } from './boolean-literal.model';
import { Infos } from './infos.model';

export class LiteralChildren {
    integerLiteral?: IntegerLiteral[] = [new IntegerLiteral()];
    booleanLiteral?: BooleanLiteral[] = [new BooleanLiteral()];
    StringLiteral?: Infos[] = [new Infos()];
    Null?: Infos[] = [new Infos()];
}
