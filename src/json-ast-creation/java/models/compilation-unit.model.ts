import { Location } from './location.model';
import { CompilationUnitChildren } from './compilation-unit-children.model';

export class CompilationUnit {
    name ?= '';
    children?: CompilationUnitChildren = new CompilationUnitChildren();
    location?: Location = new Location();
}
