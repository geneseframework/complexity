import { Infos } from './infos.model';
import { ConstantExpression } from './constant-expression.model';

export class SwitchLabelChildren {
    Case?: Infos[] = [new Infos()];
    constantExpression?: ConstantExpression[] = [new ConstantExpression()];
    Colon?: Infos[] = [new Infos()];
}
