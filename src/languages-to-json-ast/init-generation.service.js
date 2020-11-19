"use strict";
exports.__esModule = true;
exports.InitGenerationService = void 0;
var fs = require("fs-extra");
var ast_file_generation_java_service_1 = require("./java/services/ast-file-generation-java.service");
var file_service_1 = require("../core/services/file.service");
var options_model_1 = require("../core/models/options.model");
var globals_const_1 = require("./globals.const");
var language_enum_1 = require("../core/enum/language.enum");
var ast_file_generation_service_1 = require("./java/services/ast-file-generation.service");
/**
 * - AstFolders generation from Abstract Syntax Tree (AST) of its files (including files in subfolders)
 * - Conversion in JsonAst format
 */
var InitGenerationService = /** @class */ (function () {
    function InitGenerationService() {
    }
    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param  {string} path    // The path of the folder
     * @param  {Language} language
     * @returns JsonAstInterface
     */
    InitGenerationService.prototype.generateAll = function (path, language) {
        if (!path) {
            console.log('ERROR: no path.');
            return undefined;
        }
        return {
            astFolder: this.generateAstFolder(path, language)
        };
    };
    /**
     * Generates the AstFolder corresponding to a given path and to its potential AstFolder parent
     * @param  {string} path              // The path of the AstFolder
     * @param  {Language} language
     * @returns AstFolderInterface
     */
    InitGenerationService.prototype.generateAstFolder = function (path, language) {
        var _this = this;
        var astFolder = {
            path: file_service_1.platformPath(path),
            astFiles: []
        };
        var initService = language === language_enum_1.Language.TS ? new ast_file_generation_service_1.AstFileGenerationService() : new ast_file_generation_java_service_1.AstFileGenerationJavaService();
        var filesOrDirs = fs.readdirSync(path);
        var currentFile = undefined;
        try {
            filesOrDirs.forEach(function (elementName) {
                var _a;
                var pathElement = path + elementName;
                currentFile = pathElement;
                if (!options_model_1.Options.isIgnored(pathElement)) {
                    if (fs.statSync(pathElement).isDirectory() && !globals_const_1.LIMIT_GENERATIONS) {
                        astFolder.children = (_a = astFolder.children) !== null && _a !== void 0 ? _a : [];
                        astFolder.children.push(_this.generateAstFolder(pathElement + "/", language));
                    }
                    else if (_this.isFileToGenerate(pathElement, language)) {
                        astFolder.astFiles.push(initService.generate(pathElement, astFolder));
                    }
                }
            });
        }
        catch (e) {
            var _a = e.message.split('!!!'), err = _a[0], lines = _a[1];
            if (lines) {
                console.log("Error in file: " + currentFile + "\nAt line " + lines);
            }
            var error = new Error(err);
            error.stack = e.stack;
            throw error;
        }
        return astFolder;
    };
    /**
     * Returns true if a path corresponds to a file to generate in JsonAst
     * @param  {string} path  // The path of the file
     * @param  {Language} language
     * @returns boolean
     */
    InitGenerationService.prototype.isFileToGenerate = function (path, language) {
        return (file_service_1.getFileExtension(path) === language && !globals_const_1.LIMIT_GENERATIONS) || path === globals_const_1.DEV_MOCK;
    };
    return InitGenerationService;
}());
exports.InitGenerationService = InitGenerationService;
