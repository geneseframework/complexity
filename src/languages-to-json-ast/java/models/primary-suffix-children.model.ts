import { Infos } from './infos.model';
import { MethodInvocationSuffix } from './method-invocation-suffix.model';
import { ClassLiteralSuffix } from './class-literal-suffix.model';
import { MethodReferenceSuffix } from './method-reference-suffix.model';
import { ArrayAccessSuffix } from './array-access-suffix.model';

export class PrimarySuffixChildren {
    Identifier?: Infos[] = [new Infos()];
    methodInvocationSuffix?: MethodInvocationSuffix[] = [new MethodInvocationSuffix()];
    classLiteralSuffix?: ClassLiteralSuffix[] = [new ClassLiteralSuffix()];
    methodReferenceSuffix?: MethodReferenceSuffix[] = [new MethodReferenceSuffix()];
    arrayAccessSuffix?: ArrayAccessSuffix[] = [new ArrayAccessSuffix()];
}
