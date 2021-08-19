import { AstFile } from '../../core/models/ast/ast-file.model';
import { AstFunction } from '../../core/models/ast/ast-function.model';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import * as chalk from 'chalk';
import { AstFileOrClass, isAstFile } from '../../core/types/ast/ast-file-or-class.type';
import { AstClass } from '../../core/models/ast/ast-class.model';
import { AstArrowFunctionService } from './ast-arrow-function.service';

export class AstFunctionService {

    static generate(astFile: AstFile): AstFunction[]
    static generate(astClass: AstClass): AstFunction[]
    static generate(astFileOrClass: AstFileOrClass): AstFunction[] {
        // console.log(chalk.magentaBright('AST FUNCCCCC 1 = '), astFileOrClass);
        const jsonAstFunctions: JsonAstNodeInterface[] = this.getFunctionDeclarations(astFileOrClass);
        const astFunctions: AstFunction[] = [];
        for (const jsonAstFunction of jsonAstFunctions) {
            astFunctions.push(this.generateAstFunctions(jsonAstFunction, astFileOrClass.text, astFileOrClass.jsonAstNode.pos));
        }
        return astFunctions;
    }

    protected static getFunctionDeclarations(astFileOrClass: AstFileOrClass): JsonAstNodeInterface[] {
        if (isAstFile(astFileOrClass)) {
            return astFileOrClass.jsonAstNode.children.filter(c => c.kind === SyntaxKind.FunctionDeclaration);
        } else {
            return astFileOrClass.jsonAstNode.children.filter(c => c.kind === SyntaxKind.MethodDeclaration);
        }
    }

    private static generateAstFunctions(jsonAstFunction: JsonAstNodeInterface, astClassText: string, astClassPos: number): AstFunction {
        // console.log(chalk.cyanBright('AST FUNCSSSS 1 = '), astClassText, astClassPos);
        const astFunction = new AstFunction(jsonAstFunction);
        astFunction.name = jsonAstFunction.name;
        astFunction.astFunctions = AstFunctionService.generate(astFunction);
        astFunction.astArrowFunctions = AstArrowFunctionService.generate(astFunction);
        astFunction.text = astClassText.slice(jsonAstFunction.pos - astClassPos, jsonAstFunction.end - astClassPos);
        // console.log(chalk.cyanBright('AST FUNCSSSS = '), astFunction);
        return astFunction;
    }
}
