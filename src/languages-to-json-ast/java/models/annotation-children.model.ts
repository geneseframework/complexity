import { Infos } from './infos.model';
import { TypeNameElement } from './type-name-element.model';

export class AnnotationChildren {
    At?: Infos[] = [new Infos()];
    typeName?: TypeNameElement[] = [new TypeNameElement()];
}
