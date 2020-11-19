import { ClassModifierElement } from './class-modifier-element.model';
import { NormalClassDeclarationElement } from './normal-class-declaration-element.model';

export class ClassDeclarationChildren {
    classModifier?: ClassModifierElement[] = [new ClassModifierElement()];
    normalClassDeclaration?: NormalClassDeclarationElement[] = [new NormalClassDeclarationElement()];
}
