import { ClassDeclarationElement } from './class-declaration-element.model';
import { InterfaceDeclaration } from './interface-declaration.model';

export class TypeDeclarationChildren {
    classDeclaration?: ClassDeclarationElement[] = [new ClassDeclarationElement()];
    interfaceDeclaration?: InterfaceDeclaration[] = [new InterfaceDeclaration]
}
