import { AstFile } from '../../core/models/ast/ast-file.model';
import { AstArrowFunction } from '../../core/models/ast/ast-arrow-function.model';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import { AstFunction } from '../../core/models/ast/ast-function.model';
import { AstClass } from '../../core/models/ast/ast-class.model';
import { AstFileOrClass, isAstFile } from '../../core/types/ast/ast-file-or-class.type';
import { AstFunctionService } from './ast-function.service';
import * as chalk from 'chalk';

export class AstArrowFunctionService {

    static generate(astFile: AstFile): AstFunction[]
    static generate(astClass: AstClass): AstFunction[]
    static generate(astFileOrClass: AstFileOrClass): AstFunction[] {
        const jsonArrowFunctionsVarDeclarations: JsonAstNodeInterface[] = this.getArrowFunctions(astFileOrClass);
        const astArrowFunction: AstArrowFunction[] = [];
        for (const jsonArrowFunctionsVarDeclaration of jsonArrowFunctionsVarDeclarations) {
            astArrowFunction.push(this.generateAstArrowFunctions(jsonArrowFunctionsVarDeclaration, astFileOrClass.text, astFileOrClass.jsonAstNode.pos));
        }
        return astArrowFunction;
    }

    protected static getArrowFunctions(astFileOrClass: AstFileOrClass): JsonAstNodeInterface[] {
        let declarations: JsonAstNodeInterface[] = [];
        if (isAstFile(astFileOrClass)) {
            const varStatements: JsonAstNodeInterface[] = astFileOrClass.jsonAstNode?.children
                ?.filter(c => c.kind === SyntaxKind.VariableStatement
                    && c.children?.[0]?.kind === SyntaxKind.VariableDeclarationList
                    && c.children?.[0]?.children?.[0].kind === SyntaxKind.VariableDeclaration
                    && !!c.children?.[0]?.children?.[0]?.children.find(a => a.kind === SyntaxKind.ArrowFunction))
                ?? [];
            declarations = varStatements.map(v => v.children[0]?.children?.[0]);
        } else {
            const propertyDeclarations: JsonAstNodeInterface[] = astFileOrClass.jsonAstNode.children
                ?.filter(c => c.kind === SyntaxKind.PropertyDeclaration
                    && !!c.children?.find(a => a.kind === SyntaxKind.ArrowFunction))
                ?? [];
            declarations = this.setNames(propertyDeclarations);
            // declarations = propertyDeclarations.map(p => p.children.find(a => a.kind === SyntaxKind.ArrowFunction));
        }
        console.log(chalk.greenBright('VARSSSSS = '), declarations);
        return declarations;
    }

    private static setNames(propertyDeclarations: JsonAstNodeInterface[]): JsonAstNodeInterface[] {
        for (const propertyDeclaration of propertyDeclarations) {
            console.log(chalk.redBright('PROPPPPPP'), propertyDeclaration);
            propertyDeclaration.name = propertyDeclaration.children.find(c => c.kind === SyntaxKind.Identifier)?.name;
        }
        return propertyDeclarations;
    }

    private static generateAstArrowFunctions(jsonArrowFunctionsVarDeclaration: JsonAstNodeInterface, astClassText: string, astClassPos: number): AstFunction {
        // console.log(chalk.cyanBright('AST FUNCSSSS 1 = '), astClassText, astClassPos);
        const astArrowFunction = new AstArrowFunction(jsonArrowFunctionsVarDeclaration);
        astArrowFunction.name = jsonArrowFunctionsVarDeclaration.name;
        astArrowFunction.astFunctions = AstFunctionService.generate(astArrowFunction);
        astArrowFunction.astArrowFunctions = AstArrowFunctionService.generate(astArrowFunction);
        astArrowFunction.text = astClassText.slice(jsonArrowFunctionsVarDeclaration.pos - astClassPos, jsonArrowFunctionsVarDeclaration.end - astClassPos);
        // console.log(chalk.cyanBright('AST FUNCSSSS = '), astArrowFunction);
        return astArrowFunction;
    }

}
