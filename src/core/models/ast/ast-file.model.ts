import { JsonAstFileInterface } from '../../interfaces/json-ast/json-ast-file.interface';
import { AstFunction } from './ast-function.model';
import { AstArrowFunction } from './ast-arrow-function.model';
import { AstClass } from './ast-class.model';
import { AstAbstract } from './ast-abstract.model';

export class AstFile extends AstAbstract {

    astArrowFunctions: AstArrowFunction[] = [];
    astClasses: AstClass[] = [];
    astFunctions: AstFunction[] = [];
    jsonAstFile: JsonAstFileInterface = undefined;

    constructor(jsonAstFile: JsonAstFileInterface) {
        super(jsonAstFile.astNode);
        this.jsonAstFile = jsonAstFile;
    }

    get name(): string {
        return this.jsonAstFile.name;
    }

    get text(): string {
        return this.jsonAstFile.text;
    }

}
