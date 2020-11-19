import { MethodBody } from './method-body.model';
import { MethodHeader } from './method-header.model';

export class InterfaceMethodDeclarationChildren {
    methodHeader?: MethodHeader[] = [new MethodHeader()];
    methodBody?: MethodBody[] = [new MethodBody()];
}
