import { PackageOrTypeNameChildren } from './package-or-type-name-children.model';
import { Location } from './location.model';

export class PackageOrTypeNameElement {
    name ?= '';
    children?: PackageOrTypeNameChildren = new PackageOrTypeNameChildren();
    location?: Location = new Location();
}
