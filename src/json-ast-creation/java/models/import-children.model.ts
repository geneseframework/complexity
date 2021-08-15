import { Infos } from './infos.model';
import { PackageOrTypeNameElement } from './package-or-type-name-element.model';

/**
 * We are forced to write on PascalCase some properties
 * java-parser returns also PascalCase properties
 */
export class ImportChildren {
    Import?: Infos[] = [new Infos()];
    packageOrTypeName?: PackageOrTypeNameElement[] = [new PackageOrTypeNameElement()];
    Semicolon?: Infos[] = [new Infos()];
}
