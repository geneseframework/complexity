"use strict";
exports.__esModule = true;
exports.AstFileGenerationJavaService = void 0;
var file_service_1 = require("../../../core/services/file.service");
var java_parser_1 = require("java-parser");
var fs = require("fs-extra");
var cst_to_ast_1 = require("../cst-to-ast");
/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
var AstFileGenerationJavaService = /** @class */ (function () {
    function AstFileGenerationJavaService() {
    }
    /**
     * Generates the AstFile corresponding to a given path and a given AstFolder
     * @param  {string} path
     * @param  {AstFolderInterface} astFolder
     * @returns AstFileInterface
     */
    AstFileGenerationJavaService.prototype.generate = function (path, astFolder) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        var fileContent = fs.readFileSync(path, 'utf8');
        var cst = java_parser_1.parse(fileContent);
        var classDeclaration = (_e = (_d = (_c = (_b = (_a = cst.children.ordinaryCompilationUnit[0].children) === null || _a === void 0 ? void 0 : _a.typeDeclaration) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.children) === null || _d === void 0 ? void 0 : _d.classDeclaration) === null || _e === void 0 ? void 0 : _e[0];
        var interfaceDeclaration = (_k = (_j = (_h = (_g = (_f = cst.children.ordinaryCompilationUnit[0].children) === null || _f === void 0 ? void 0 : _f.typeDeclaration) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.children) === null || _j === void 0 ? void 0 : _j.interfaceDeclaration) === null || _k === void 0 ? void 0 : _k[0];
        var ast = [];
        if (classDeclaration) {
            ast = cst_to_ast_1.cstToAst(classDeclaration);
        }
        else if (interfaceDeclaration) {
            ast = cst_to_ast_1.cstToAst(interfaceDeclaration);
        }
        return {
            name: file_service_1.getFilename(path),
            text: fileContent,
            astNode: {
                kind: 'SourceFile',
                start: 0,
                pos: 0,
                end: fileContent.length,
                children: [
                    ast,
                    {
                        "end": fileContent.length,
                        "kind": "EndOfFileToken",
                        "pos": fileContent.length,
                        "start": fileContent.length
                    }
                ]
            }
        };
    };
    return AstFileGenerationJavaService;
}());
exports.AstFileGenerationJavaService = AstFileGenerationJavaService;
