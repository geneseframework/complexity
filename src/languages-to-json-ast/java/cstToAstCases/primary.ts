import { cstToAst } from '../cst-to-ast';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';
import { clone } from '@genese/core';


export function run(cstNode: Primary, children: PrimaryChildren): any {
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;

    const primaryPrefixAst = [].concat(...primaryPrefix?.map(e => cstToAst(e)) ?? []);
    const primarySuffixAst = [].concat(...primarySuffix?.map(e => cstToAst(e)) ?? []);

    return process(cstNode, primaryPrefixAst, primarySuffixAst);
}

function process(cstNode: any, prefix: any, suffix: any): any {
    const methodInvocationSuffix = suffix.filter(e => e.kind === 'MethodInvocationSuffix');
    const arrayAccessSuffix = suffix.filter(e => e.kind === 'ArrayAccessSuffix');

    if (Array.isArray(arrayAccessSuffix) && arrayAccessSuffix.length > 0) {
        return createElementAccess(cstNode, prefix, suffix, arrayAccessSuffix);
    }
    if (Array.isArray(methodInvocationSuffix) && methodInvocationSuffix.length > 0) {
        return handleMethodInvocationSuffix(cstNode, prefix, suffix, methodInvocationSuffix);
    }
    return handleNoMethodInvocationSuffix(prefix, suffix);
}

/**
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 */
function handleNoMethodInvocationSuffix(primaryPrefixAst: any, primarySuffixAst: any) {
    if (primarySuffixAst.length === 1 && primarySuffixAst[0].kind === 'ClassLiteralSuffix') {
        primaryPrefixAst.push(...primarySuffixAst.pop().children)
    }
    if (primaryPrefixAst.length > 1) {
        return [
            toPropertyAccessExpression(primaryPrefixAst, false, []),
            ...primarySuffixAst
        ];
    }
    if (primaryPrefixAst.length === 1 && primaryPrefixAst[0].kind === 'ThisKeyword') {
        return [
            toPropertyAccessExpression([...primaryPrefixAst, ...primarySuffixAst], false, []),
        ];
    }
    if (primarySuffixAst.every(e => e.kind === 'Identifier') && primarySuffixAst.every(e => e.kind === 'Identifier')) {
        return [
            toPropertyAccessExpression([...primaryPrefixAst, ...primarySuffixAst], false, []),
        ];
    }
    return [
        ...primaryPrefixAst,
        ...primarySuffixAst
    ];
}

/**
 * @param  {any} cstNode
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 * @param  {any} methodInvocationSuffix
 */
function handleMethodInvocationSuffix(cstNode: any, primaryPrefixAst: any, primarySuffixAst: any, methodInvocationSuffix: any) {
    const identifierSuffix = primarySuffixAst.filter(e => e.kind === 'Identifier');
    const thisKeyword = primaryPrefixAst.find(e => e.kind === 'ThisKeyword');
    let obj = {
        kind: 'CallExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
    };
    if (thisKeyword) {
        return getThisKeywordChildren(methodInvocationSuffix, thisKeyword, identifierSuffix, obj);
    }
    return getOtherCasesChildren(primaryPrefixAst, primarySuffixAst, methodInvocationSuffix, obj);
}

/**
 * @param  {any} methodInvocationSuffix
 * @param  {any} thisKeyword
 * @param  {any} identifierSuffix
 * @param  {any} obj
 * @returns any
 */
function getThisKeywordChildren(methodInvocationSuffix: any, thisKeyword: any, identifierSuffix: any, obj: any): any[] {
    return {
        ...obj,
        children: [
            toPropertyAccessExpression([
                thisKeyword,
                ...identifierSuffix,
            ], true, clone(methodInvocationSuffix)),
            ...getMethodInvocationSuffixChildren(methodInvocationSuffix),
        ]
    };
}


/**
 * @param  {any} primaryPrefixAst
 * @param  {any} primarySuffixAst
 * @param methodInvocationSuffix
 * @param  {any} obj
 * @returns any
 */
function getOtherCasesChildren(primaryPrefixAst: any, primarySuffixAst: any, methodInvocationSuffix: any, obj: any): any[] {
    return {
        ...obj,
        children: [
            toPropertyAccessExpression([
                ...getNewExpression(primaryPrefixAst),
                ...primaryPrefixAst.filter(e => e.kind === 'Identifier'),
                ...primarySuffixAst.filter(e => e.kind === 'Identifier')
            ], true, clone(methodInvocationSuffix)),
            ...primarySuffixAst.filter(e => e.kind === 'ClassLiteralSuffix'),
            ...getMethodInvocationSuffixChildren(methodInvocationSuffix),
        ]
    };
}

/** Get all MethodInvocationSuffix with children
 * @param  {} methodInvocationSuffixList
 */
function getMethodInvocationSuffixChildren(methodInvocationSuffixList) {
    let childrenList = [];
    if (Array.isArray(methodInvocationSuffixList)) {
        methodInvocationSuffixList.forEach(methodInvocationSuffix => {
            if (Array.isArray(methodInvocationSuffix.children) && methodInvocationSuffix.children.length > 0) {
                childrenList.push(...methodInvocationSuffix.children);
            }
        });
    }
    return childrenList;
}

/** Get newExpression Ast node
 * @param  {any} primaryPrefixAst
 * @returns any
 */
function getNewExpression(primaryPrefixAst: any): any[] {
    const newExpression = primaryPrefixAst.filter(e => e.kind === 'NewExpression');
    if (Array.isArray(newExpression) && newExpression.length) {
        return [
            ...primaryPrefixAst.find(e => e.kind === 'NewExpression').children
        ];
    }
    return [];
}

/**
 * @param  {} primaryPrefixAst
 * @param primarySuffixAst
 * @param  {} arrayAccessSuffixList
 * @returns any
 */
function createElementAccess(cstNode, primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList): any {
    if (arrayAccessSuffixList.length === 1) {
        return singleAccessCase(cstNode, primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList);
    }
    const arrayAccessSuffix = arrayAccessSuffixList.pop();
    const last = arrayAccessSuffix.children?.find(e => e.kind === 'Identifier' || 'Literal');
    return {
        kind: 'ElementAccessExpression',
        start: primaryPrefixAst[0]?.start,
        pos: primaryPrefixAst[0]?.pos,
        end: arrayAccessSuffix?.end,
        children: [
            {
                ...createElementAccess(cstNode, primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList),
            },
            last
        ]
    };
}

function singleAccessCase(cstNode, primaryPrefixAst, primarySuffixAst, arrayAccessSuffixList) {
    primarySuffixAst.pop();
    return {
        kind: 'ElementAccessExpression',
        start: primaryPrefixAst[0]?.start,
        end: arrayAccessSuffixList[0]?.end,
        pos: primaryPrefixAst[0]?.pos,
        children: [
            ...[].concat(...[process(cstNode, primaryPrefixAst, primarySuffixAst)]),
            ...arrayAccessSuffixList[0].children.filter(e => e.kind === 'Identifier' || 'Literal')
        ]
    };
}

/**
 * @param  {any[]} identifiers
 * @param  {} isFunctionCall=false
 * @param  {any[]} methodInvocationSuffix
 * @returns any
 */
function toPropertyAccessExpression(identifiers: any[], isFunctionCall = false, methodInvocationSuffix: any[]): any {
    if (!identifiers || identifiers.length === 0) return undefined;

    if (identifiers.length === 1 && methodInvocationSuffix.length === 0) {
        return identifiers[0];
    }
    if (identifiers.length === 1) {
        return {type: 'function', ...identifiers[0]};
    }
    const last = identifiers.pop();

    if (isFunctionCall) {
        return isFunctionCallCase(identifiers, last, methodInvocationSuffix);
    }
    return {
        kind: 'PropertyAccessExpression',
        start: identifiers[0]?.start,
        end: last?.end,
        pos: identifiers[0]?.pos,
        children: [
            toPropertyAccessExpression(identifiers, false, methodInvocationSuffix),
            last
        ].filter(e => e)
    };
}

function isFunctionCallCase(identifiers, last, methodInvocationSuffix) {
    methodInvocationSuffix.pop();

    let start: number, pos: number;
    if (identifiers.length === 0) {
        start = last?.start;
        pos = last?.pos;
    } else {
        start = identifiers[0]?.start;
        pos = identifiers[0]?.pos;
    }

    return {
        kind: 'PropertyAccessExpression',
        start: start,
        end: last?.end,
        pos: pos,
        children: [
            toPropertyAccessExpression(identifiers, methodInvocationSuffix.length > 0, methodInvocationSuffix),
            {...last, type: 'function'}
        ].filter(e => e)
    };
}
