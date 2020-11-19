import { PrimaryPrefix } from './primary-prefix.model';
import { PrimarySuffix } from './primary-suffix.model';

export class PrimaryChildren {
    primaryPrefix?: PrimaryPrefix[] = [new PrimaryPrefix()];
    primarySuffix?: PrimarySuffix[] = [new PrimarySuffix()];
}
