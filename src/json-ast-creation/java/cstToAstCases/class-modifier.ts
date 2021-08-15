import { cstToAst } from '../cst-to-ast';
import { ClassModifierElement } from '../models/class-modifier-element.model';
import { ClassModifierChildren } from '../models/class-modifier-children.model';

// @ts-ignore
export function run(cstNode: ClassModifierElement, children: ClassModifierChildren): any {
    const Public = children.Public;

    return {
        kind: 'ClassModifier',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...Public.map(e => cstToAst(e, 'public')),
        ]
    };
}
