import { AstNode } from '../../models/ast/ast-node.model';

/**
 * Service specific to ArrowFunctions AstNodes
 */
export class OutsideCodeService {

    /**
     * Returns the astNodes of the code which is not inside classes or functions
     * @param astFileNode       // The node of the AstFile
     */
    static getOutsideNodes(astFileNode: AstNode): AstNode[] {
        return astFileNode.children?.filter(n => n.isCodeOutsideClassesAndFunctions);
    }

}
