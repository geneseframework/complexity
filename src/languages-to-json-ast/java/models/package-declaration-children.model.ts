import { Infos } from './infos.model';

/**
 * We are forced to use PascalCase for the properties
 * java-parser returns PascalCase properties
 */
export class PackageDeclarationChildren {
    Dot?: Infos[] = [new Infos()];
    Identifier?: Infos[] = [new Infos()];
    Package?: Infos[] = [new Infos()];
    Semicolon?: Infos[] = [new Infos()];
}
