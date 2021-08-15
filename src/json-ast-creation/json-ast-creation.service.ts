import { InitGenerationService } from './init-generation.service';
import { Language } from '../core/enum/language.enum';
import { JsonService } from './json.service';
import { createFile } from '../core/utils/file-system.util';
import { JsonAstInterface } from '../core/interfaces/ast/json-ast.interface';
import { project } from './globals.const';
import { Options } from '../core/models/options.model';

/**
 * Main process of the parsing to JsonAst format
 */
export class JsonAstCreationService {

    /**
     * Starts the parsing to Json Ast format and returns JsonAst object
     * @param  {string} pathToAnalyze           // The path of the folder to analyse
     * @param  {Language} language              // The language to parse and convert into JsonAst
     * @returns void
     */
    static start(pathToAnalyze: string, language?: Language): JsonAstInterface {
        let jsonAst: JsonAstInterface;
        switch (language) {
            case Language.TS:
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.ts`);
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.tsx`);
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.js`);
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.jsx`);
                jsonAst = JsonAstCreationService.generateFromFiles(pathToAnalyze, language);
                break
            case Language.JAVA:
                jsonAst = JsonAstCreationService.generateFromFiles(pathToAnalyze, language);
                break;
            case Language.JS:
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.js`);
                jsonAst = JsonAstCreationService.generateFromFiles(pathToAnalyze, language);
                break;
            case Language.TSX:
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.tsx`);
                jsonAst = JsonAstCreationService.generateFromFiles(pathToAnalyze, language);
                break;
            case Language.JSX:
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.jsx`);
                jsonAst = JsonAstCreationService.generateFromFiles(pathToAnalyze, language);
                break;
            default:
                jsonAst = JsonAstCreationService.generateFromAllFiles(pathToAnalyze);
                break;
        }
        createFile(Options.jsonAstPath, JsonService.prettifyJson(jsonAst));
        return jsonAst;
    }

    private static generateFromAllFiles(pathToAnalyze: string): JsonAstInterface {
        return JsonAstCreationService.generateFromFiles(pathToAnalyze, Language.TS);
    }

    /**
     * Generate AST for Ts or Java files
     * @param  {string} pathToAnalyze
     * @param  {Language} language
     * @returns JsonAstInterface
     */
    private static generateFromFiles(pathToAnalyze: string, language: Language): JsonAstInterface {
        const jsonAst: JsonAstInterface = {
            astFolder: undefined,
            metrics: Options.metrics
        };
        let astFolder = new InitGenerationService().generateAll(pathToAnalyze, language).astFolder as any;
        astFolder = JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    }

}
