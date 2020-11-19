import { cstToAst } from '../cst-to-ast';
import { ArrayCreationExpression } from '../models/array-creation-expression.model';
import { ArrayCreationExpressionChildren } from '../models/array-creation-expression-children.model';

// @ts-ignore
export function run(cstNode: ArrayCreationExpression, children: ArrayCreationExpressionChildren): any {
    const arrayCreationExplicitInitSuffix = children.arrayCreationExplicitInitSuffix;
    const primitiveType = children.primitiveType;
    const classOrInterfaceType = children.classOrInterfaceType;
    const arrayCreationDefaultInitSuffix = children.arrayCreationDefaultInitSuffix;

    const classOrInterfaceTypeAst = [].concat(...classOrInterfaceType?.map(e => cstToAst(e)) ?? []);
    const arrayCreationDefaultInitSuffixAst = [].concat(...arrayCreationDefaultInitSuffix?.map(e => cstToAst(e)) ?? []);
    const primitiveTypeAst = [].concat(...primitiveType?.map(e => cstToAst(e)) ?? []);

    const dimExprs = arrayCreationDefaultInitSuffixAst?.find(e => e.kind === 'DimExprs')?.children;

    return [
        ...[].concat(...arrayCreationExplicitInitSuffix?.map(e => cstToAst(e)) ?? []),
        createElementAccess([...classOrInterfaceTypeAst, ...primitiveTypeAst] , dimExprs)
    ];  
}

/**
 * Create Element Access Expression Ast Node
 * @param  {any} classOrInterfaceTypeAst
 * @param  {any} dimExprs
 * @returns any
 */
function createElementAccess(classOrInterfaceTypeAst: any, dimExprs: any): any {  
    if (!dimExprs) return undefined;

    if (dimExprs.length === 1) {
        return {
            kind: 'ElementAccessExpression',
            start: classOrInterfaceTypeAst[0]?.start,
            end: dimExprs[0]?.end,
            pos: classOrInterfaceTypeAst[0]?.pos,
            children: [
                classOrInterfaceTypeAst.find(e => e.kind === 'Identifier'),
                dimExprs[0] 
            ]
        }
    } else {
        const dimExpr = dimExprs.pop();
        return {
            kind: 'ElementAccessExpression',
            start: classOrInterfaceTypeAst[0]?.start,
            pos: classOrInterfaceTypeAst[0]?.pos,
            end: dimExpr?.end,
            children: [{
                ...createElementAccess(classOrInterfaceTypeAst, dimExprs),
                },dimExpr
            ]
        };      
    }
}
