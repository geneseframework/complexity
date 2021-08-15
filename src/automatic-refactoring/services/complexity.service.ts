import { InitGenerationService } from '../../json-ast-creation/init-generation.service';
import { JsonAstInterface } from '../../core/interfaces/ast/json-ast.interface';
import { JsonService } from '../../json-ast-creation/json.service';
import { HtmlGenerationService } from '../../html-generation/html-generation.service';
import { JsonAst } from '../../html-generation/models/ast/json-ast.model';

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

        return HtmlGenerationService.getTotalCpx(jsonAst as JsonAst);
    }
}
