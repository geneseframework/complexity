"use strict";
exports.__esModule = true;
exports.Ts = void 0;
var globals_const_1 = require("../../globals.const");
var ts_morph_1 = require("ts-morph");
/**
 * Service for operations on Node elements (ts-morph nodes)
 */
var Ts = /** @class */ (function () {
    function Ts() {
    }
    /**
     * Returns the SyntaxKind of an AST node or its alias if exists
     * @param node
     */
    Ts.getKindAlias = function (node) {
        var kind = node.getKindName();
        for (var _i = 0, KindAliases_1 = globals_const_1.KindAliases; _i < KindAliases_1.length; _i++) {
            var alias = KindAliases_1[_i];
            if (alias.aliases.includes(kind)) {
                kind = alias.name;
                break;
            }
        }
        return kind;
    };
    /**
     * Gets the name of a Node
     * @param node // The AST node
     */
    Ts.getName = function (node) {
        var _a, _b;
        switch (node.getKind()) {
            case ts_morph_1.SyntaxKind.ClassDeclaration:
            case ts_morph_1.SyntaxKind.FunctionDeclaration:
            case ts_morph_1.SyntaxKind.MethodDeclaration:
            case ts_morph_1.SyntaxKind.Parameter:
                return (_b = (_a = node.compilerNode['name']) === null || _a === void 0 ? void 0 : _a['escapedText']) !== null && _b !== void 0 ? _b : '';
            case ts_morph_1.SyntaxKind.Identifier:
                return node.compilerNode['escapedText'];
            default:
                return undefined;
        }
    };
    /**
     * Checks if a node is a call to a function or method
     * Example : a.slice(1)
     * @param node      // The node to check
     */
    Ts.isFunctionCall = function (node) {
        if (node.getKind() === ts_morph_1.SyntaxKind.PropertyAccessExpression) {
            return false;
        }
        var parent = node === null || node === void 0 ? void 0 : node.getParent();
        if (!parent) {
            return false;
        }
        var grandParent = parent === null || parent === void 0 ? void 0 : parent.getParent();
        if (!grandParent) {
            return false;
        }
        var grandParentCall = grandParent.getKind() === ts_morph_1.SyntaxKind.CallExpression && grandParent.compilerNode['expression'].end === node.getEnd();
        var parentCall = parent.getKind() === ts_morph_1.SyntaxKind.CallExpression && parent.compilerNode['expression'].end === node.getEnd();
        return parentCall || grandParentCall;
    };
    return Ts;
}());
exports.Ts = Ts;
