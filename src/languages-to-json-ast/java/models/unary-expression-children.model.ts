import { Primary } from './primary.model';
import { Infos } from './infos.model';

export class UnaryExpressionChildren {
    primary?: Primary[] = [new Primary()];
    UnaryPrefixOperator?: Infos[] = [new Infos()];
    UnarySuffixOperator?: Infos[] = [new Infos()];
}
