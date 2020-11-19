"use strict";
exports.__esModule = true;
exports.JsonAst = void 0;
var chalk = require("chalk");
var JsonAst = /** @class */ (function () {
    function JsonAst() {
        this.astFolder = undefined; // The root of the JsonAST : the first AstFolder at the root of the folders to analyse
    }
    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Logs the main information about the JsonAst
     * @param message       // An optional message
     */
    JsonAst.prototype.logg = function (message) {
        var _a, _b, _c, _d, _e, _f;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'JSON_AST'));
        console.log((_a = this.astFolder) === null || _a === void 0 ? void 0 : _a.path);
        console.log('-----------------------------');
        for (var _i = 0, _g = (_c = (_b = this.astFolder) === null || _b === void 0 ? void 0 : _b.astFiles) !== null && _c !== void 0 ? _c : []; _i < _g.length; _i++) {
            var astFile = _g[_i];
            console.log(chalk.blueBright('astFile'), astFile === null || astFile === void 0 ? void 0 : astFile.name);
            console.log(chalk.blueBright('astFile astNode'), (_d = astFile === null || astFile === void 0 ? void 0 : astFile.astNode) === null || _d === void 0 ? void 0 : _d.kind);
            console.log(chalk.blueBright('astFile children'), (_e = astFile === null || astFile === void 0 ? void 0 : astFile.astNode) === null || _e === void 0 ? void 0 : _e.children);
            this.loggChildren(astFile.astNode);
        }
        console.log(chalk.blueBright('children'), (_f = this.astFolder) === null || _f === void 0 ? void 0 : _f.children);
    };
    /**
     * Logs the main information of an AstNode of the JsonAst
     * @param astNode       // The AstNode to analyse
     * @param indent        // The current indentation in the log
     */
    JsonAst.prototype.loggChildren = function (astNode, indent) {
        var _a;
        if (indent === void 0) { indent = ''; }
        for (var _i = 0, _b = astNode === null || astNode === void 0 ? void 0 : astNode.children; _i < _b.length; _i++) {
            var childAstNode = _b[_i];
            var name_1 = (_a = childAstNode === null || childAstNode === void 0 ? void 0 : childAstNode.name) !== null && _a !== void 0 ? _a : '';
            console.log(chalk.blueBright(indent + "node"), childAstNode.kind, name_1);
            this.loggChildren(childAstNode, indent + "  ");
        }
    };
    return JsonAst;
}());
exports.JsonAst = JsonAst;
