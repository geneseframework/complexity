import { AstFile } from '../../core/models/ast/ast-file.model';
import { AstClass } from '../../core/models/ast/ast-class.model';
import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import { AstAbstract } from '../../core/models/ast/ast-abstract.model';

export class AstAbstractService {


    // static generate(astAbstract: AstAbstract): AstClass[] {
    //     const jsonAstClasses: JsonAstNodeInterface[] = astAbstract.jsonAstNode.children.filter(c => c.kind === SyntaxKind.ClassDeclaration);
    //     const astClasses: AstClass[] = [];
    //     for (const jsonAstClass of jsonAstClasses) {
    //         astClasses.push(this.generateAstClass(jsonAstClass, astAbstract.text));
    //     }
    //     return astClasses;
    // }


}
