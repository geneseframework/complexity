import { Infos } from './infos.model';
import { PrimitiveType } from './primitive-type.model';
import { ArrayCreationExplicitInitSuffix } from './array-creation-explicit-init-suffix.model';
import { ClassOrInterfaceType } from './class-or-interface-type.model';
import { ArrayCreationDefaultInitSuffix } from './array-creation-default-init-suffix.model';

export class ArrayCreationExpressionChildren {
    New?: Infos[] = [new Infos()];
    primitiveType?: PrimitiveType[] = [new PrimitiveType()];
    arrayCreationExplicitInitSuffix?: ArrayCreationExplicitInitSuffix[] = [new ArrayCreationExplicitInitSuffix()];
    classOrInterfaceType?: ClassOrInterfaceType[] = [new ClassOrInterfaceType()];
    arrayCreationDefaultInitSuffix?: ArrayCreationDefaultInitSuffix[] = [new ArrayCreationDefaultInitSuffix()];
}
