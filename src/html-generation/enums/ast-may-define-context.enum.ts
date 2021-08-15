import { SyntaxKind } from '../../core/enum/syntax-kind.enum';

export enum AstMayDefineContext {

    CLASS_DECLARATION = SyntaxKind.ClassDeclaration,
    FUNCTION_EXPRESSION = SyntaxKind.FunctionExpression,
    IDENTIFIER = SyntaxKind.Identifier,
    METHOD_DECLARATION = SyntaxKind.MethodDeclaration,
    SOURCE_FILE = SyntaxKind.SourceFile,
    VARIABLE_DECLARATION = SyntaxKind.VariableDeclaration,

}
