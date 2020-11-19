"use strict";
exports.__esModule = true;
exports.AstNodeService = void 0;
var ast_service_1 = require("./ast.service");
var syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
/**
 * Service managing AstNodes
 */
var AstNodeService = /** @class */ (function () {
    function AstNodeService() {
    }
    /**
     * Returns the source code of a given AstNode
     * @param astNode       // The AstNode to analyse
     */
    AstNodeService.prototype.getCode = function (astNode) {
        var _a;
        if (!((_a = astNode === null || astNode === void 0 ? void 0 : astNode.astFile) === null || _a === void 0 ? void 0 : _a.text) || (astNode === null || astNode === void 0 ? void 0 : astNode.pos) === undefined || (astNode === null || astNode === void 0 ? void 0 : astNode.end) === undefined) {
            return '';
        }
        var text = astNode.astFile.text.replace(/\\/g, '\\');
        return text.slice(astNode.pos, astNode.end);
    };
    /**
     * Gets the javascript context of the AST node of a AstNode
     * @param astNode      // The AstNode for which we search the context
     */
    AstNodeService.prototype.getContext = function (astNode) {
        var _a, _b, _c, _d;
        if (!astNode) {
            return undefined;
        }
        switch (astNode.kind) {
            case syntax_kind_enum_1.SyntaxKind.SourceFile:
                return astNode;
            case syntax_kind_enum_1.SyntaxKind.Identifier:
                return this.getIdentifierContext(astNode);
            case syntax_kind_enum_1.SyntaxKind.ThisKeyword:
                return (_b = (_a = astNode.parent) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.context;
            default:
                if ((_c = astNode.parent) === null || _c === void 0 ? void 0 : _c.mayDefineContext) {
                    return astNode.parent;
                }
                else {
                    return (_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.context;
                }
        }
    };
    /**
     * Gets the javascript context of an Identifier AST node of a given AstNode
     * @param astNode      // The concerned AstNode
     */
    AstNodeService.prototype.getIdentifierContext = function (astNode) {
        var _a, _b, _c, _d, _e;
        if (this.isSecondSonOfPropertyAccessExpression(astNode)) {
            return ((_b = (_a = astNode.parent) === null || _a === void 0 ? void 0 : _a.firstSon) === null || _b === void 0 ? void 0 : _b.mayDefineContext) ? (_c = astNode.parent) === null || _c === void 0 ? void 0 : _c.firstSon : (_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.firstSon.context;
        }
        else {
            return (_e = astNode.parent) === null || _e === void 0 ? void 0 : _e.context;
        }
    };
    /**
     * Checks if a AstNode is the second son of an AST node "PropertyAccessExpression"
     * (the first son is the object and the second is its property)
     * @param astNode
     */
    AstNodeService.prototype.isSecondSonOfPropertyAccessExpression = function (astNode) {
        return ast_service_1.Ast.isPropertyAccessExpression(astNode === null || astNode === void 0 ? void 0 : astNode.parent) && astNode === (astNode === null || astNode === void 0 ? void 0 : astNode.parent.secondSon);
    };
    /**
     * Checks if a AstNode is a Callback (ie a parameter which is used later in a CallExpression)
     * @param astNode      // The AstNode to check
     */
    AstNodeService.prototype.isCallback = function (astNode) {
        if (!astNode.isParam) {
            return false;
        }
        return this.hasCallBack(astNode, astNode.parent);
    };
    /**
     * Checks if a Parameter AstNode is used in a CallExpression of its method
     * @param astNodeParam     // The Parameter AstNode
     * @param astNode          // Parameter used for recursion
     */
    AstNodeService.prototype.hasCallBack = function (astNodeParam, astNode) {
        for (var _i = 0, _a = astNode === null || astNode === void 0 ? void 0 : astNode.children; _i < _a.length; _i++) {
            var childAstNode = _a[_i];
            if (childAstNode.name === astNodeParam.name && childAstNode.context === astNodeParam.context && childAstNode.isCallIdentifier) {
                return true;
            }
            if (this.hasCallBack(astNodeParam, childAstNode)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Checks if a AstNode is a recursive method (ie a MethodDeclaration or a FunctionDeclaration which is called from inside)
     * @param astNode      // The AstNode to check
     */
    AstNodeService.prototype.isRecursiveMethod = function (astNode) {
        if (!astNode.isFunctionOrMethodDeclaration) {
            return false;
        }
        return this.hasRecursiveNode(astNode.astMethod, astNode);
    };
    /**
     * Checks if a MethodDeclaration or a FunctionDeclaration AstNode is called by one of its children
     * @param astNodeMethod     // The MethodDeclaration or FunctionDeclaration AstNode
     * @param astNode          // Parameter used for recursion
     */
    AstNodeService.prototype.hasRecursiveNode = function (astNodeMethod, astNode) {
        for (var _i = 0, _a = astNode === null || astNode === void 0 ? void 0 : astNode.children; _i < _a.length; _i++) {
            var childAstNode = _a[_i];
            if (childAstNode.name === astNodeMethod.name && childAstNode.context === astNodeMethod.astNode.context && !astNode.isFunctionOrMethodDeclaration) {
                return true;
            }
            if (this.hasRecursiveNode(astNodeMethod, childAstNode)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Returns an array of AstNodes with all the AstNode children of the first param concatenated with the second param
     * @param astNode      // The "parent" node to parse
     * @param astNodes     // The "accumulator"
     */
    AstNodeService.prototype.flatMapAstNodes = function (astNode, astNodes) {
        for (var _i = 0, _a = astNode === null || astNode === void 0 ? void 0 : astNode.children; _i < _a.length; _i++) {
            var childAstNode = _a[_i];
            astNodes.push(childAstNode);
            if (childAstNode.children.length > 0) {
                astNodes = astNodes.concat(this.flatMapAstNodes(childAstNode, []));
            }
        }
        return astNodes;
    };
    return AstNodeService;
}());
exports.AstNodeService = AstNodeService;
