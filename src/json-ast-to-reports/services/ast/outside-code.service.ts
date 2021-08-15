import { AstMethod } from '../../models/ast/ast-method.model';
import { AstNode } from '../../models/ast/ast-node.model';
import { AstNodeService } from './ast-node.service';
import { AstOutsideNodes } from '../../models/ast/ast-outside-code.model';
import { Ast } from './ast.service';
import * as chalk from 'chalk';

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

    /**
     * Returns the children of a given AstNode which are statements which are arrow function declarations or function assignments
     * Examples :
     *   -> const someFunction = () => {}
     *   -> someVar.func = () => {}
     * @param astFileNode       // The node of the astFile
     * @private
     */
    private static getAstFileChildrenOutsideClassesAndFunctions(astFileNode: AstNode): AstNode[] {
        // console.log(chalk.cyanBright('ASTFILENODEEEE CHILDREN'), astFileNode?.children.map(a => a.kind));
        const zzz: AstNode[] = astFileNode.children?.filter(n => n.isCodeOutsideClassesAndFunctions);
        // console.log(chalk.blueBright('NODES OUTSIDEEEEEE'), zzz?.map(a => a.kind));
        return zzz;
    }

    /**
     * Creates and returns a new AstMethod corresponding to the arrow function in some given VarStatement
     * @param statement     // The VarStatement containing the arrow function
     * @private
     */
    private static getVarStatementArrowFunction(statement: AstNode): AstMethod {
        const variableDeclarationList: AstNode = statement.children?.[0];
        const variableDeclaration: AstNode = variableDeclarationList?.children?.[0];
        return variableDeclaration ? this.createArrowFunction(statement, variableDeclaration.children[0]?.name) : undefined;
    }

    /**
     * Creates and returns a new AstMethod corresponding to the arrow function in some given ExpressionStatement
     * @param statement     // The ExpressionStatement containing the arrow function
     * @private
     */
    private static getExprStatementArrowFunction(statement: AstNode): AstMethod {
        const expression: AstNode = statement.children[0];
        const identifiers: AstNode[] = expression.children[0]?.children?.filter(c => c.isIdentifier);
        const name: string = identifiers.map(i => i.name).join('.');
        return this.createArrowFunction(expression, name);
    }

    /**
     * Creates and returns a new AstMethod corresponding to a VarStatement or ExpressionStatement containing some arrow function
     * @param astNode       // The VarStatement or ExpressionStatement
     * @param name          // The name to give to the AstMethod
     * @private
     */
    private static createArrowFunction(astNode: AstNode, name: string): AstMethod {
        const arrowFunction = new AstMethod();
        arrowFunction.name = name;
        arrowFunction.astNode = astNode;
        const astNodeService = new AstNodeService();
        arrowFunction.astNode.text = astNodeService.getCode(astNode);
        arrowFunction.isArrowFunction = true;
        arrowFunction.codeLines = astNode.astFile?.code?.lines?.slice(astNode.linePos - 1, astNode.lineEnd);
        return arrowFunction;
    }

}
