import { JsonAstFileInterface } from '../../interfaces/json-ast/json-ast-file.interface';
import { AstFunctionService } from '../../../json-ast-to-ast-model/services/ast-function.service';
import { AstFunction } from './ast-function.model';
import { AstArrowFunctionService } from '../../../json-ast-to-ast-model/services/ast-arrow-function.service';
import { AstArrowFunction } from './ast-arrow-function.model';
import { AstClass } from './ast-class.model';
import { AstClassService } from '../../../json-ast-to-ast-model/services/ast-class.service';
import { AstAbstract } from './ast-abstract.model';

export class AstFile extends AstAbstract {

    astArrowFunctions: AstArrowFunction[] = [];
    astClasses: AstClass[] = [];
    astFunctions: AstFunction[] = [];

    constructor(jsonAstFile: JsonAstFileInterface) {
        super(jsonAstFile);
        this.setAstClasses();
        this.setAstArrowFuncs();
        this.setAstFuncs();
    }

    private setAstClasses(): void {
        this.astClasses = AstClassService.generate(this);
    }

    private setAstFuncs(): void {
        this.astFunctions = AstFunctionService.generate(this);
    }

    private setAstArrowFuncs(): void {
        this.astArrowFunctions = AstArrowFunctionService.generate(this);
    }

}
