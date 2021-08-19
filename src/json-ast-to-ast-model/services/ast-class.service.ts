import { AstFile } from '../../core/models/ast/ast-file.model';
import { AstClass } from '../../core/models/ast/ast-class.model';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import { AstFunctionService } from './ast-function.service';
import { AstArrowFunctionService } from './ast-arrow-function.service';
import * as chalk from 'chalk';

export class AstClassService {

    static generate(astFile: AstFile): AstClass[] {
        const jsonAstClasses: JsonAstNodeInterface[] = astFile.jsonAstNode.children.filter(c => c.kind === SyntaxKind.ClassDeclaration);
        const astClasses: AstClass[] = [];
        for (const jsonAstClass of jsonAstClasses) {
            astClasses.push(this.generateAstClass(jsonAstClass, astFile.text));
        }
        return astClasses;
    }

    private static generateAstClass(jsonAstClass: JsonAstNodeInterface, astFileText: string): AstClass {
        const astClass = new AstClass(jsonAstClass);
        astClass.name = jsonAstClass.name;
        astClass.text = astFileText.slice(jsonAstClass.pos, jsonAstClass.end);
        astClass.astFunctions = AstFunctionService.generate(astClass);
        astClass.astArrowFunctions = AstArrowFunctionService.generate(astClass);
        // console.log(chalk.blueBright('AST CLAAAASSS'), astClass);
        return astClass;
    }

}
