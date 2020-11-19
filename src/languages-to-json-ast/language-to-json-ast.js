"use strict";
exports.__esModule = true;
exports.LanguageToJsonAst = void 0;
var init_generation_service_1 = require("./init-generation.service");
var language_enum_1 = require("../core/enum/language.enum");
var chalk = require("chalk");
var json_service_1 = require("./json.service");
var file_service_1 = require("../core/services/file.service");
var globals_const_1 = require("./globals.const");
/**
 * Main process of the parsing to JsonAst format
 */
var LanguageToJsonAst = /** @class */ (function () {
    function LanguageToJsonAst() {
    }
    /**
     * Starts the parsing to Json Ast format
     * @param  {string} pathToAnalyze          // The path of the folder to analyse
     * @param  {Language} language?         // The language to parse and convert into JsonAst
     * @returns void
     */
    LanguageToJsonAst.start = function (pathToAnalyze, language) {
        console.log(chalk.blueBright('STARTS JSON AST GENERATION'));
        console.log('Please wait...');
        globals_const_1.project.addSourceFilesAtPaths(pathToAnalyze + "/**/*.ts");
        var jsonAst;
        switch (language) {
            case language_enum_1.Language.TS:
            case language_enum_1.Language.JAVA:
                jsonAst = LanguageToJsonAst.generateFromFiles(pathToAnalyze, language);
                break;
            default:
                jsonAst = LanguageToJsonAst.generateFromAllFiles(pathToAnalyze);
                break;
        }
        var ru = LanguageToJsonAst.findInObject(jsonAst, undefined);
        file_service_1.createFile("./json-ast.json", json_service_1.JsonService.prettifyJson(jsonAst));
        console.log(chalk.greenBright('JSON AST GENERATED SUCCESSFULLY'));
    };
    // TODO: implement for all languages
    LanguageToJsonAst.generateFromAllFiles = function (pathToAnalyze) {
        return LanguageToJsonAst.generateFromFiles(pathToAnalyze, language_enum_1.Language.TS);
    };
    /**
     * Generate AST for Ts or Java files
     * @param  {string} pathToAnalyze
     * @param  {Language} language
     * @returns JsonAstInterface
     */
    LanguageToJsonAst.generateFromFiles = function (pathToAnalyze, language) {
        var jsonAst = {
            astFolder: undefined
        };
        var astFolder = new init_generation_service_1.InitGenerationService().generateAll(pathToAnalyze, language).astFolder;
        astFolder = json_service_1.JsonService.astPropertyNames(astFolder);
        jsonAst.astFolder = astFolder;
        return jsonAst;
    };
    LanguageToJsonAst.findInObject = function (o, f) {
        return Object.keys(o).some(function (a) {
            if (Array.isArray(o[a]) || typeof o[a] === 'object' && o[a] !== null) {
                return LanguageToJsonAst.findInObject(o[a], f);
            }
            return o[a] === f;
        });
    };
    return LanguageToJsonAst;
}());
exports.LanguageToJsonAst = LanguageToJsonAst;
