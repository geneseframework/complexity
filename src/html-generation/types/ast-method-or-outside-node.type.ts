import { AstMethod } from '../models/ast/ast-method.model';
import { AstNode } from '../models/ast/ast-node.model';

export type AstMethodOrOutsideNode = AstMethod | AstNode;

export function isAstMethod(astMethodOrAstNode: AstMethodOrOutsideNode): astMethodOrAstNode is AstMethodOrOutsideNode {
    return astMethodOrAstNode instanceof AstMethod;
}
