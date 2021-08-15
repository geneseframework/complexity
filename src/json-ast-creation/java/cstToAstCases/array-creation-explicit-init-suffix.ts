import { cstToAst } from '../cst-to-ast';
import { ArrayCreationExplicitInitSuffix } from '../models/array-creation-explicit-init-suffix.model';
import { ArrayCreationExplicitInitSuffixChildren } from '../models/array-creation-explicit-init-suffix-children.model';

// @ts-ignore
export function run(cstNode: ArrayCreationExplicitInitSuffix, children: ArrayCreationExplicitInitSuffixChildren): any {
    const arrayInitializer = children.arrayInitializer;

    return [
        ...[].concat(...arrayInitializer?.map(e => cstToAst(e)) ?? [])
    ];
}
