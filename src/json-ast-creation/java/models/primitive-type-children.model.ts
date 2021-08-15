import { NumericType } from './numeric-type.model';
import { Infos } from './infos.model';

export class PrimitiveTypeChildren {
    numericType?: NumericType[] = [new NumericType()];
    Boolean?: Infos[] = [new Infos()];
}
