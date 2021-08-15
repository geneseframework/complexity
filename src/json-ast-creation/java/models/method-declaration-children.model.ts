import { MethodModifier } from './method-modifier.model';
import { MethodHeader } from './method-header.model';
import { MethodBody } from './method-body.model';

export class MethodDeclarationChildren {
    methodModifier?: MethodModifier[] = [new MethodModifier()];
    methodHeader?: MethodHeader[] = [new MethodHeader()];
    methodBody?: MethodBody[] = [new MethodBody()];
}
