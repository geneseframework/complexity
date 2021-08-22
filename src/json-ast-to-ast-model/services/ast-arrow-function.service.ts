import { AstFile } from '../models/ast-file.model';
import { AstArrowFunction } from '../models/ast-arrow-function.model';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import { AstFunction } from '../models/ast-function.model';
import { AstClass } from '../models/ast-class.model';
import { AstFileOrClass, isAstFile } from '../../core/types/ast/ast-file-or-class.type';
import { AstFuncOrArrowFuncService } from './ast-func-or-arrow-func.service';

export class AstArrowFunctionService {

    static generate(astFile: AstFile): AstFunction[]
    static generate(astClass: AstClass): AstFunction[]
    static generate(astFileOrClass: AstFileOrClass): AstFunction[] {
        const jsonArrowFunctionsVarDeclarations: JsonAstNodeInterface[] = this.getArrowFunctions(astFileOrClass);
        const astArrowFunction: AstArrowFunction[] = [];
        for (const jsonArrowFunctionsVarDeclaration of jsonArrowFunctionsVarDeclarations) {
            astArrowFunction.push(AstFuncOrArrowFuncService.create(jsonArrowFunctionsVarDeclaration, astFileOrClass.text, astFileOrClass.jsonAstNode.pos));
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
        }
        return declarations;
    }

    private static setNames(propertyDeclarations: JsonAstNodeInterface[]): JsonAstNodeInterface[] {
        for (const propertyDeclaration of propertyDeclarations) {
            propertyDeclaration.name = propertyDeclaration.children.find(c => c.kind === SyntaxKind.Identifier)?.name;
        }
        return propertyDeclarations;
    }

}
