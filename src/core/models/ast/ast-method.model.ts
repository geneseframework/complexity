import { AstNode } from './ast-node.model';
import { JsonAstNodeInterface } from '../../interfaces/json-ast/json-ast-node.interface';

export class AstMethod {

    astNode: AstNode = undefined;
    childrenAstNodes: AstNode[] = [];
    code: string = undefined;
    jsonAstNode: JsonAstNodeInterface = undefined;
    name: string = undefined;

}
