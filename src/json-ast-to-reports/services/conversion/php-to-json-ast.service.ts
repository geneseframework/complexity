import { JsonAst } from '../../models/ast/json-ast.model';

export class PhpToJsonAstService {

    static convert(path: string): JsonAst {
        const jsonAst = new JsonAst();
        console.log('PHP TO JSON AST path', path)
        return jsonAst;
    }

}
