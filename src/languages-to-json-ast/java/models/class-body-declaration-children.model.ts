import { ClassMemberDeclarationElement } from './class-member-declaration-element.model';
import { ConstructorDeclarationElement } from './constructor-declaration.model';

export class ClassBodyDeclarationChildren {
    classMemberDeclaration?: ClassMemberDeclarationElement[] = [new ClassMemberDeclarationElement()];
    constructorDeclaration?: ConstructorDeclarationElement[] = [new ConstructorDeclarationElement()];
}
