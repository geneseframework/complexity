import { AstFile } from '../../core/models/ast/ast-file.model';
import { AstArrowFunction } from '../../core/models/ast/ast-arrow-function.model';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import * as chalk from 'chalk';
import { AstFunction } from '../../core/models/ast/ast-function.model';
import { AstClass } from '../../core/models/ast/ast-class.model';
import { AstFileOrClass, isAstFile } from '../../core/types/ast/ast-file-or-class.type';
import { PropertyDeclaration } from 'ts-morph';

export class AstArrowFunctionService {

    static generate(astFile: AstFile): AstFunction[]
    static generate(astClass: AstClass): AstFunction[]
    static generate(astFileOrClass: AstFileOrClass): AstFunction[] {
        const jsonArrowFunctionsVarDeclarations: JsonAstNodeInterface[] = this.getArrowFunctions(astFileOrClass);
        const astArrowFunction: AstArrowFunction[] = [];
        for (const jsonArrowFunctionsVarDeclaration of jsonArrowFunctionsVarDeclarations) {
            astArrowFunction.push(this.generateAstArrowFunctions(jsonArrowFunctionsVarDeclaration));
        }
        return astArrowFunction;
    }

    protected static getArrowFunctions(astFileOrClass: AstFileOrClass): JsonAstNodeInterface[] {
        let varDeclarations: JsonAstNodeInterface[] = [];
        if (isAstFile(astFileOrClass)) {
            const varStatements: JsonAstNodeInterface[] = astFileOrClass.jsonAstNode?.children
                ?.filter(c => c.kind === SyntaxKind.VariableStatement
                    && c.children?.[0]?.kind === SyntaxKind.VariableDeclarationList
                    && c.children?.[0]?.children?.[0].kind === SyntaxKind.VariableDeclaration
                    && !!c.children?.[0]?.children?.[0]?.children.find(a => a.kind === SyntaxKind.ArrowFunction))
                ?? [];
            varDeclarations = varStatements.map(v => v.children[0]?.children?.[0]);
        } else {
            const propertyDeclarations: JsonAstNodeInterface[] = astFileOrClass.jsonAstNode.children
                ?.filter(c => c.kind === SyntaxKind.PropertyDeclaration
                    && !!c.children?.find(a => a.kind === SyntaxKind.ArrowFunction))
                ?? [];
            varDeclarations = propertyDeclarations.map(p => p.children.find(a => a.kind === SyntaxKind.ArrowFunction));
        }
        // console.log(chalk.greenBright('VARSSSSS = '), varDeclarations);
        return varDeclarations;
    }

    private static generateAstArrowFunctions(jsonArrowFunctionsVarDeclaration: JsonAstNodeInterface): AstArrowFunction {
        const astArrowFunction = new AstArrowFunction(jsonArrowFunctionsVarDeclaration);
        // console.log(chalk.cyanBright('AST FUNCSSSS = '), astArrowFunction);
        return astArrowFunction;
    }

}
