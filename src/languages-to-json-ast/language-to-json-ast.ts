import { InitGenerationService } from './init-generation.service';
import { Language } from '../core/enum/language.enum';
import { JsonService } from './json.service';
import { createFile } from '../core/services/file.service';
import { JsonAstInterface } from '../core/interfaces/ast/json-ast.interface';
import { project } from './globals.const';

/**
 * Main process of the parsing to JsonAst format
 */
export class LanguageToJsonAst {

    /**
     * Starts the parsing to Json Ast format
     * @param  {string} pathToAnalyze           // The path of the folder to analyse
     * @param  {Language} language              // The language to parse and convert into JsonAst
     * @returns void
     */
    static start(pathToAnalyze: string, language?: Language): void {
        let jsonAst: JsonAstInterface;
        switch (language) {
            case Language.TS:
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.ts`);
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.tsx`);
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.js`);
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.jsx`);
                jsonAst = LanguageToJsonAst.generateFromFiles(pathToAnalyze, language);
                break
            case Language.JAVA:
                console.log('JAVA PROJECT', project.getSourceFiles().map(s => s.getBaseName()))
                jsonAst = LanguageToJsonAst.generateFromFiles(pathToAnalyze, language);
                break;
            case Language.JS:
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.js`);
                jsonAst = LanguageToJsonAst.generateFromFiles(pathToAnalyze, language);
                break;
            case Language.TSX:
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.tsx`);
                jsonAst = LanguageToJsonAst.generateFromFiles(pathToAnalyze, language);
                break;
            case Language.JSX:
                project.addSourceFilesAtPaths(`${pathToAnalyze}**/*.jsx`);
                jsonAst = LanguageToJsonAst.generateFromFiles(pathToAnalyze, language);
                break;
            default:
                jsonAst = LanguageToJsonAst.generateFromAllFiles(pathToAnalyze);
                break;
        }
        createFile(`./ast.json`, JsonService.prettifyJson(jsonAst));
    }


    // TODO: implement for all languages
    private static generateFromAllFiles(pathToAnalyze: string): JsonAstInterface {
        return LanguageToJsonAst.generateFromFiles(pathToAnalyze, Language.TS);
    }

    /**
     * Generate AST for Ts or Java files
     * @param  {string} pathToAnalyze
     * @param  {Language} language
     * @returns JsonAstInterface
     */
    private static generateFromFiles(pathToAnalyze: string, language: Language): JsonAstInterface {
        const jsonAst: JsonAstInterface = {
            astFolder: undefined
        };
        let astFolder = new InitGenerationService().generateAll(pathToAnalyze, language).astFolder as any;
        astFolder = JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    }


    private static findInObject(o, f) {
        return Object.keys(o).some(function (a) {
            if (Array.isArray(o[a]) || typeof o[a] === 'object' && o[a] !== null) {
                return LanguageToJsonAst.findInObject(o[a], f);
            }
            return o[a] === f;
        });
    }


}
