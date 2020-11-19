import { Infos } from './infos.model';
import { TypeIdentifierElement } from './type-identifier-element.model';
import { ClassBodyElement } from './class-body-element.model';

export class NormalClassDeclarationChildren {
    Class?: Infos[] = [new Infos()];
    typeIdentifier?: TypeIdentifierElement[] = [new TypeIdentifierElement()];
    classBody?: ClassBodyElement[] = [new ClassBodyElement()];
}
