import { PackageDeclarationElement } from './package-declaration-element.model';
import { ImportDeclarationElement } from './import-declaration-element.model';
import { TypeDeclarationElement } from './type-declaration-element.model';

export class OrdinaryCompilationUnitChildren {
    packageDeclaration?: PackageDeclarationElement[] = [new PackageDeclarationElement()];
    importDeclaration?: ImportDeclarationElement[] = [new ImportDeclarationElement()];
    typeDeclaration?: TypeDeclarationElement[] = [new TypeDeclarationElement()];
}
