import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import { AstFunction } from '../../core/models/ast/ast-function.model';
import { AstArrowFunction } from '../../core/models/ast/ast-arrow-function.model';
import { AstFunctionService } from './ast-function.service';
import { AstArrowFunctionService } from './ast-arrow-function.service';

export class AstFuncOrArrowFuncService {


    static create(jsonArrowFunctionsVarDeclaration: JsonAstNodeInterface, astClassText: string, astClassPos: number): AstFunction {
        const astArrowFunction = new AstArrowFunction(jsonArrowFunctionsVarDeclaration);
        astArrowFunction.name = jsonArrowFunctionsVarDeclaration.name;
        astArrowFunction.astFunctions = AstFunctionService.generate(astArrowFunction);
        astArrowFunction.astArrowFunctions = AstArrowFunctionService.generate(astArrowFunction);
        astArrowFunction.text = astClassText.slice(jsonArrowFunctionsVarDeclaration.pos - astClassPos, jsonArrowFunctionsVarDeclaration.end - astClassPos);
        return astArrowFunction;
    }


}
