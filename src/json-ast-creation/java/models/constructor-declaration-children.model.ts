import { ConstructorBody } from './constructor-body.model';
import { ConstructorDeclarator } from './constructor-declarator.model';
import { ConstructorModifier } from './constructor-modifier.model';

export class ConstructorDeclarationElementChildren {
    constructorModifier?: ConstructorModifier[] = [new ConstructorModifier()];
    constructorDeclarator?: ConstructorDeclarator[] = [new ConstructorDeclarator()];
    constructorBody?: ConstructorBody[] = [new ConstructorBody()];
}
