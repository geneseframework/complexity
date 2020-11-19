"use strict";
exports.__esModule = true;
exports.AstFileGenerationService = void 0;
var file_service_1 = require("../../../core/services/file.service");
var syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
var globals_const_1 = require("../../globals.const");
var ts_service_1 = require("./ts.service");
/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
var AstFileGenerationService = /** @class */ (function () {
    function AstFileGenerationService() {
    }
    /**
     * Generates the AstFile corresponding to a given path and a given AstFolder
     * @param path          // The path of the file
     * @param astFolder     // The AstFolder containing the AstFile
     */
    AstFileGenerationService.prototype.generate = function (path, astFolder) {
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        var sourceFile = globals_const_1.project.getSourceFileOrThrow(path);
        return {
            name: file_service_1.getFilename(path),
            text: sourceFile.getFullText(),
            astNode: this.createAstNodeChildren(sourceFile)
        };
    };
    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyse
     */
    AstFileGenerationService.prototype.createAstNodeChildren = function (node) {
        var _this = this;
        var astNode = {
            end: node.getEnd(),
            kind: ts_service_1.Ts.getKindAlias(node),
            name: ts_service_1.Ts.getName(node),
            pos: node.getPos(),
            start: node.getStart()
        };
        astNode = this.addTypeAndCpxFactors(node, astNode);
        node.forEachChild(function (childNode) {
            if (!astNode.children) {
                astNode.children = [];
            }
            astNode.children.push(_this.createAstNodeChildren(childNode));
        });
        return astNode;
    };
    /**
     * Adds the type to identifiers or parameters and calculates the CpxFactors of identifiers
     * @param node          // The Node to analyse
     * @param astNode       // The AstNode which will be updated with its type and CpxFactors
     */
    AstFileGenerationService.prototype.addTypeAndCpxFactors = function (node, astNode) {
        if (ts_service_1.Ts.isFunctionCall(node)) {
            astNode.type = 'function';
            if (globals_const_1.WEIGHTED_METHODS.includes(astNode.name)) {
                var cpxFactors = this.getCpxFactors(node);
                if (cpxFactors) {
                    astNode.cpxFactors = cpxFactors;
                }
            }
        }
        return astNode;
    };
    /**
     * Returns the CpxFactors of a given Node (Identifier)
     * @param node      // The Node to analyse
     */
    AstFileGenerationService.prototype.getCpxFactors = function (node) {
        var _a;
        if (node.getKindName() !== syntax_kind_enum_1.SyntaxKind.Identifier) {
            return undefined;
        }
        var identifier = node;
        var definition = (_a = identifier.getDefinitions()) === null || _a === void 0 ? void 0 : _a[0];
        return this.useWeight(definition, ts_service_1.Ts.getName(node));
    };
    /**
     * Returns the cpxFActors relative to method usage.
     * @param definition        // The DefinitionInfo of the Node corresponding to a method
     * @param nodeName          // The name of the Node (redundant, but avoids new calculation of this value)
     */
    AstFileGenerationService.prototype.useWeight = function (definition, nodeName) {
        if (!definition) {
            return undefined;
        }
        var lib = this.library(definition);
        var method = lib ? Object.keys(globals_const_1.WEIGHTS[lib]).find(function (e) { return e === nodeName; }) : undefined;
        return method ?
            {
                use: {
                    method: globals_const_1.WEIGHTS[lib][method]
                }
            }
            : undefined;
    };
    // TODO: implement this method for libraries different than TypeScript itself
    /**
     * Returns the library corresponding to the DefinitionInfo of a method's Node.
     * @param definition
     */
    AstFileGenerationService.prototype.library = function (definition) {
        var path = definition.getSourceFile().getFilePath();
        return path.match(/typescript\/lib/) ? 'typescript' : undefined;
    };
    return AstFileGenerationService;
}());
exports.AstFileGenerationService = AstFileGenerationService;
