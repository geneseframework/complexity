import { SyntaxKind } from 'ts-morph';

export type FunctionKind = SyntaxKind.FunctionDeclaration | SyntaxKind.ArrowFunction | SyntaxKind.MethodDeclaration | SyntaxKind.FunctionExpression;

export function isFunctionKind(kind: SyntaxKind): kind is FunctionKind {
    return [SyntaxKind.FunctionDeclaration, SyntaxKind.ArrowFunction, SyntaxKind.MethodDeclaration, SyntaxKind.FunctionExpression].includes(kind);
}
