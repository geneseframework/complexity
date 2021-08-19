import { JsonAstFileInterface } from '../../interfaces/json-ast/json-ast-file.interface';
import { AstAbstract } from './ast-abstract.model';

export class AstFile extends AstAbstract {

    jsonAstFile: JsonAstFileInterface = undefined;

    constructor(jsonAstFile: JsonAstFileInterface) {
        super(jsonAstFile.astNode);
        this.jsonAstFile = jsonAstFile;
    }

    // get name(): string {
    //     return this.jsonAstFile.name;
    // }

    // get text(): string {
    //     return this.jsonAstFile.text;
    // }

}
