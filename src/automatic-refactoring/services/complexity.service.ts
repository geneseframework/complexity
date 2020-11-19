import { InitGenerationService } from '../../languages-to-json-ast/init-generation.service';
import { JsonAstInterface } from '../../core/interfaces/ast/json-ast.interface';
import { JsonService } from '../../languages-to-json-ast/json.service';
import { JsonAstToReports } from '../../json-ast-to-reports/json-ast-to-reports';
import { JsonAst } from '../../json-ast-to-reports/models/ast/json-ast.model';

export class ComplexityService {
    /**
     * Get the cognitive complexity of the given source code
     * @param sourceCode
     * @returns {number}
     */
    static getCpxFromSourceCode(sourceCode: string): number {
        const initGenerationService = new InitGenerationService();
        const jsonAst: JsonAstInterface = {
            astFolder: undefined
        };
        let astFolder = initGenerationService.generateAstFolderFromString(sourceCode).astFolder as any
        astFolder = JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;

        return JsonAstToReports.getTotalCpx(jsonAst as JsonAst);
    }
}
