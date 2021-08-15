import { UnannReferenceType } from './unann-reference-type.model';
import { UnannPrimitiveType } from './unann-primitive-type.model';

export class UnannTypeChildren {
    unannReferenceType?: UnannReferenceType[] = [new UnannReferenceType()];
    unannPrimitiveType?: UnannPrimitiveType[] = [new UnannPrimitiveType()];
}
