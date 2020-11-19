import { AnnotationElement } from './annotation-element.model';
import { Infos } from './infos.model';

export class ClassModifierChildren {
    annotation?: AnnotationElement[] = [new AnnotationElement()];
    Public?: Infos[] = [new Infos()];
}
