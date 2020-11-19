import { Location } from './location.model';
import { OrdinaryCompilationUnitChildren } from './ordinary-compilation-unit-children.model';

export class OrdinaryCompilationUnit {
    name ?= '';
    children?: OrdinaryCompilationUnitChildren = new OrdinaryCompilationUnitChildren();
    location?: Location = new Location();
}
