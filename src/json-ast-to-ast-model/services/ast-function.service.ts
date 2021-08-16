import { AstFile } from '../../core/models/ast/ast-file.model';
import { AstFunction } from '../../core/models/ast/ast-function.model';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import * as chalk from 'chalk';

export class AstFunctionService {

    static generate(astFile: AstFile): AstFunction[] {
        const jsonAstFunctions: JsonAstNodeInterface[] = this.getFunctionDeclarations(astFile);
        const astFunctions: AstFunction[] = [];
        for (const jsonAstFunction of jsonAstFunctions) {
            astFunctions.push(this.generateAstFunctions(jsonAstFunction));
        }
        return astFunctions;
    }

    protected static getFunctionDeclarations(astFile: AstFile): JsonAstNodeInterface[] {
        return astFile.jsonAstNode.children.filter(c => c.kind === SyntaxKind.FunctionDeclaration);
    }

    private static generateAstFunctions(jsonAstFunction: JsonAstNodeInterface): AstFunction {
        const astFunction = new AstFunction(jsonAstFunction);
        console.log(chalk.cyanBright('AST FUNCSSSS = '), astFunction);
        return astFunction;
    }
}
