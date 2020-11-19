import { FqnOrRefTypePartFirst } from './fqn-or-ref-type-part-first.model';
import { FqnOrRefTypePartRest } from './fqn-or-ref-type-part-rest.model';

export class FqnOrRefTypeChildren {
    fqnOrRefTypePartFirst?: FqnOrRefTypePartFirst[] = [new FqnOrRefTypePartFirst()];
    fqnOrRefTypePartRest?: FqnOrRefTypePartRest[] = [new FqnOrRefTypePartRest()];
}
