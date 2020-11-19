import { TypeIdentifierElement } from './type-identifier-element.model';
import { InterfaceBody } from './interface-body.model';

export class NormalInterfaceDeclarationChildren {
    typeIdentifier?: TypeIdentifierElement[] = [new TypeIdentifierElement()];
    interfaceBody?: InterfaceBody[] = [new InterfaceBody()];
}
