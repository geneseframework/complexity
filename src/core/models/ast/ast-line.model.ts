/**
 * A line of a Code object
 */
import { AstNode } from '../ast/ast-node.model';

export class AstLine {

    astNodes?: AstNode[] = [];                              // The array of AstNodes corresponding to AST nodes in this line of code
    end ?= 0;                                               // The pos (in number of characters) of the end of the line
    issue ?= 0;                                             // The number of the line in its Code parentFunction (method)
    start ?= 0;                                             // The absolute pos (in number of characters) of the extractHooksAndArrowFunctions of the line in the SourceFile
    text ?= '';                                             // The text of the line

}
