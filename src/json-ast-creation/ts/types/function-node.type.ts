import { ArrowFunction, FunctionDeclaration, FunctionExpression, MethodDeclaration } from 'ts-morph';

export type FunctionNode = FunctionDeclaration | ArrowFunction | MethodDeclaration | FunctionExpression;
