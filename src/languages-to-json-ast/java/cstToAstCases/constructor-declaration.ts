import { cstToAst } from '../cst-to-ast';
import { ConstructorDeclarationElementChildren } from '../models/constructor-declaration-children.model';
import { ConstructorDeclarationElement } from '../models/constructor-declaration.model';


export function run(cstNode: ConstructorDeclarationElement, children: ConstructorDeclarationElementChildren): any {
    const constructorBody = children.constructorBody;
    const constructorDeclarator = children.constructorDeclarator;
    const constructorDeclaratorAst = [].concat(...constructorDeclarator.map(e => cstToAst(e)));
    const name = constructorDeclaratorAst.find(e => e.kind === 'Identifier').name;

    return {
        kind: 'Constructor',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        name: name,
        children: [
            ...[].concat(...constructorDeclaratorAst.filter(e => e.kind === 'Parameter')),
            ...[].concat(...constructorBody.map(e => cstToAst(e))),
        ]
    };
}
