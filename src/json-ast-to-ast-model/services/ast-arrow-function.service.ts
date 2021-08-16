import { AstFile } from '../../core/models/ast/ast-file.model';
import { AstArrowFunction } from '../../core/models/ast/ast-arrow-function.model';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import * as chalk from 'chalk';

export class AstArrowFunctionService {

    static generate(astFile: AstFile): AstArrowFunction[] {
        const jsonArrowFunctionsVarDeclarations: JsonAstNodeInterface[] = this.getArrowFunctions(astFile);
        const astArrowFunction: AstArrowFunction[] = [];
        for (const jsonArrowFunctionsVarDeclaration of jsonArrowFunctionsVarDeclarations) {
            astArrowFunction.push(this.generateAstArrowFunctions(jsonArrowFunctionsVarDeclaration));
        }
        return astArrowFunction;
    }

    protected static getArrowFunctions(astFile: AstFile): JsonAstNodeInterface[] {
        const varStatements: JsonAstNodeInterface[] = astFile.jsonAstNode?.children
            .filter(c => c?.kind === SyntaxKind.VariableStatement
                && c.children?.[0]?.kind === SyntaxKind.VariableDeclarationList
                && c.children?.[0]?.children?.[0].kind === SyntaxKind.VariableDeclaration
                && !!c.children?.[0]?.children?.[0]?.children.find(a => a.kind === SyntaxKind.ArrowFunction))
            ?? [];
        const varDeclarations: JsonAstNodeInterface[] = varStatements.map(v => v.children[0]?.children?.[0]);
        console.log(chalk.greenBright('VARSSSSS = '), varDeclarations);
        return varDeclarations;
    }

    private static generateAstArrowFunctions(jsonArrowFunctionsVarDeclaration: JsonAstNodeInterface): AstArrowFunction {
        const astArrowFunction = new AstArrowFunction(jsonArrowFunctionsVarDeclaration);
        console.log(chalk.cyanBright('AST FUNCSSSS = '), astArrowFunction);
        return astArrowFunction;
    }

}
