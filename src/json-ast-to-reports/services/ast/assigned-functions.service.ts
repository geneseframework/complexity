import { AstMethod } from '../../models/ast/ast-method.model';
import { AstNode } from '../../models/ast/ast-node.model';
import { AstNodeService } from './ast-node.service';

/**
 * Service specific to ArrowFunctions AstNodes
 */
export class AssignedFunctionsService {

    /**
     * Returns the ArrowFunctions which are children of a given AstNode
     * @param astNode       // The astNode to check
     */
    static getArrowFunctions(astNode: AstNode): AstMethod[] {
        const statements: AstNode[] = this.getStatementsDeclaringOrAssigningArrowFunctions(astNode);
        const arrowFunctions: AstMethod[] = [];
        for (const statement of statements) {
            const arrowFunction: AstMethod = statement.isExpressionStatement ? this.getExprStatementArrowFunction(statement) :  this.getVarStatementArrowFunction(statement);
            if (arrowFunction) {
                arrowFunctions.push(arrowFunction);
            }
        }
        return arrowFunctions;
    }

    /**
     * Returns the children of a given AstNode which are statements which are arrow function declarations or function assignments
     * Examples :
     *   -> const someFunction = () => {}
     *   -> someVar.func = () => {}
     * @param astNode       // The astNode to check
     * @private
     */
    private static getStatementsDeclaringOrAssigningArrowFunctions(astNode: AstNode): AstNode[] {
        return astNode.children?.filter(n => n.isVarStatement && n.isFunctionAssignation);
    }

    /**
     * Creates and returns a new AstMethod corresponding to the arrow function in some given VarStatement
     * @param statement     // The VarStatement containing the arrow function
     * @private
     */
    private static getVarStatementArrowFunction(statement: AstNode): AstMethod {
        const variableDeclarationList: AstNode = statement.children.find(c => c.isVarDeclarationList);
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
