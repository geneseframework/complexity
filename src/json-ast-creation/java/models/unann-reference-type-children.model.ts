import { UnannClassOrInterfaceType } from './unann-class-or-interface-type.model';
import { Dims } from './dims.model';

export class UnannReferenceTypeChildren {
    unannClassOrInterfaceType?: UnannClassOrInterfaceType[] = [new UnannClassOrInterfaceType()];
    dims?: Dims[] = [new Dims()];
}
