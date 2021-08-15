import { Infos } from './infos.model';
import { ClassBodyDeclarationElement } from './class-body-declaration-element.model';

export class ClassBodyChildren {
    LCurly?: Infos[] = [new Infos()];
    classBodyDeclaration?: ClassBodyDeclarationElement[] = [new ClassBodyDeclarationElement()];
    RCurly?: Infos[] = [new Infos()];
}
