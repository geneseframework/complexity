"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _astFile, _astMethod, _astNodeService, _children, _context, _cpxFactors, _cpxFactorsFromJsonAST, _cyclomaticCpx, _end, _factorCategory, _intrinsicDepthCpx, _intrinsicNestingCpx, _isCallback, _isRecursiveMethod, _kind, _lineEnd, _linePos, _lineStart, _name, _parent, _pos, _start, _text, _type;
exports.__esModule = true;
exports.AstNode = void 0;
var syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
var ast_service_1 = require("../../services/ast/ast.service");
var factor_category_service_1 = require("../../services/factor-category.service");
var cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
var node_feature_enum_1 = require("../../enums/node-feature.enum");
var cpx_factors_1 = require("../../../core/const/cpx-factors");
var tools_service_1 = require("../../../core/services/tools.service");
var ast_node_service_1 = require("../../services/ast/ast-node.service");
var chalk = require("chalk");
var code_service_1 = require("../../services/code.service");
var AstNode = /** @class */ (function () {
    function AstNode() {
        _astFile.set(this, undefined); // The AstFile containing the AST node of the AstNode
        _astMethod.set(this, undefined); // The method at the root of the current ast (if this ast is inside a method)
        _astNodeService.set(this, new ast_node_service_1.AstNodeService()); // The service managing AstNodes
        _children.set(this, []); // The children AstNodes of the AstNode
        _context.set(this, undefined); // The context of the AstNode
        _cpxFactors.set(this, undefined); // The complexity factors of the AstNode
        _cpxFactorsFromJsonAST.set(this, undefined); // The complexity factors added manually in JsonAST (have priority on calculated cpxFactors)
        _cyclomaticCpx.set(this, 0); // The cyclomatic complexity of the AstNode
        _end.set(this, 0); // The pos of the end of the source code of the AstNode in the source code of the AstFile
        _factorCategory.set(this, undefined); // The NodeFeature of the node of the AstNode
        _intrinsicDepthCpx.set(this, undefined); // The depth of the AstNode inside its method (not including its parent's depth)
        _intrinsicNestingCpx.set(this, undefined); // The nesting of the AstNode inside its method (not including its parent's nesting)
        _isCallback.set(this, undefined); // True if the astNode is a method with a Callback, false if not
        _isRecursiveMethod.set(this, undefined); // True if the astNode is a recursive method, false if not
        _kind.set(this, undefined); // The kind of the node ('MethodDeclaration, IfStatement, ...)
        _lineEnd.set(this, undefined); // The issue of the line containing the character at the AstNode.end
        _linePos.set(this, undefined); // The issue of the line containing the character at the AstNode.pos
        _lineStart.set(this, undefined); // The issue of the line containing the character at the AstNode.start
        _name.set(this, undefined); // The name of the AstNode
        _parent.set(this, void 0); // The ast of the parent of the current node
        _pos.set(this, 0); // The pos of the beginning of the AST node, including spaces and comments before it. (start <= start)
        _start.set(this, 0); // The pos of the beginning of the AST node, without spaces and comments before it. (start >= start)
        _text.set(this, undefined); // The code of the AstNode
        _type.set(this, undefined); // The type of the AstNode (if given)
    }
    Object.defineProperty(AstNode.prototype, "aggregationCpx", {
        // ---------------------------------------------------------------------------------
        //                                Getters and setters
        // ---------------------------------------------------------------------------------
        get: function () {
            var _a;
            return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalAggregation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "astFile", {
        get: function () {
            return __classPrivateFieldGet(this, _astFile);
        },
        set: function (astFile) {
            __classPrivateFieldSet(this, _astFile, astFile);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "astMethod", {
        get: function () {
            return __classPrivateFieldGet(this, _astMethod);
        },
        set: function (astMethod) {
            __classPrivateFieldSet(this, _astMethod, astMethod);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "atomicCpx", {
        get: function () {
            var _a;
            return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalAtomic;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "children", {
        get: function () {
            return __classPrivateFieldGet(this, _children);
        },
        set: function (children) {
            __classPrivateFieldSet(this, _children, children);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "context", {
        get: function () {
            var _a;
            return (_a = __classPrivateFieldGet(this, _context)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astNodeService).getContext(this);
        },
        set: function (treeNode) {
            __classPrivateFieldSet(this, _context, treeNode);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "cpxFactors", {
        get: function () {
            return __classPrivateFieldGet(this, _cpxFactors);
        },
        set: function (cpxFactors) {
            __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "cpxFactorsFromJsonAST", {
        get: function () {
            return __classPrivateFieldGet(this, _cpxFactorsFromJsonAST);
        },
        set: function (cpxFactorsFromJsonAST) {
            __classPrivateFieldSet(this, _cpxFactorsFromJsonAST, cpxFactorsFromJsonAST);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "cyclomaticCpx", {
        get: function () {
            return __classPrivateFieldGet(this, _cyclomaticCpx);
        },
        set: function (cyclomaticCpx) {
            __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "depthCpx", {
        get: function () {
            var _a;
            return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalDepth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "end", {
        get: function () {
            return __classPrivateFieldGet(this, _end);
        },
        set: function (end) {
            __classPrivateFieldSet(this, _end, end);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "factorCategory", {
        get: function () {
            var _a;
            return (_a = __classPrivateFieldGet(this, _factorCategory)) !== null && _a !== void 0 ? _a : new factor_category_service_1.FactorCategoryService().getNodeFeature(this.kind);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "firstSon", {
        get: function () {
            return this.getSon(0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "intrinsicDepthCpx", {
        get: function () {
            return __classPrivateFieldGet(this, _intrinsicDepthCpx);
        },
        set: function (cpx) {
            __classPrivateFieldSet(this, _intrinsicDepthCpx, cpx);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "intrinsicNestingCpx", {
        get: function () {
            return __classPrivateFieldGet(this, _intrinsicNestingCpx);
        },
        set: function (cpx) {
            __classPrivateFieldSet(this, _intrinsicNestingCpx, cpx);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "isCallback", {
        get: function () {
            if (__classPrivateFieldGet(this, _isCallback)) {
                return __classPrivateFieldGet(this, _isCallback);
            }
            __classPrivateFieldSet(this, _isCallback, __classPrivateFieldGet(this, _astNodeService).isCallback(this));
            return __classPrivateFieldGet(this, _isCallback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "isCallIdentifier", {
        get: function () {
            return ast_service_1.Ast.isCallIdentifier(this) && this === this.parent.firstSon;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "isFunctionOrMethodDeclaration", {
        get: function () {
            return this.factorCategory === node_feature_enum_1.NodeFeature.DECLARATION;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "isParam", {
        get: function () {
            return ast_service_1.Ast.isParam(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "isRecursiveMethod", {
        get: function () {
            if (__classPrivateFieldGet(this, _isRecursiveMethod)) {
                return __classPrivateFieldGet(this, _isRecursiveMethod);
            }
            __classPrivateFieldSet(this, _isRecursiveMethod, __classPrivateFieldGet(this, _astNodeService).isRecursiveMethod(this));
            return __classPrivateFieldGet(this, _isRecursiveMethod);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "kind", {
        get: function () {
            return __classPrivateFieldGet(this, _kind);
        },
        set: function (kind) {
            __classPrivateFieldSet(this, _kind, kind);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "lineEnd", {
        get: function () {
            var _a;
            if (__classPrivateFieldGet(this, _lineEnd)) {
                return __classPrivateFieldGet(this, _lineEnd);
            }
            __classPrivateFieldSet(this, _lineEnd, code_service_1.CodeService.getLineIssue((_a = this.astFile) === null || _a === void 0 ? void 0 : _a.code, this.end));
            return __classPrivateFieldGet(this, _lineEnd);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "linePos", {
        get: function () {
            var _a;
            if (__classPrivateFieldGet(this, _linePos)) {
                return __classPrivateFieldGet(this, _linePos);
            }
            __classPrivateFieldSet(this, _linePos, code_service_1.CodeService.getLineIssue((_a = this.astFile) === null || _a === void 0 ? void 0 : _a.code, this.pos));
            return __classPrivateFieldGet(this, _linePos);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "lineStart", {
        get: function () {
            var _a;
            if (__classPrivateFieldGet(this, _lineStart)) {
                return __classPrivateFieldGet(this, _lineStart);
            }
            __classPrivateFieldSet(this, _lineStart, code_service_1.CodeService.getLineIssue((_a = this.astFile) === null || _a === void 0 ? void 0 : _a.code, this.start));
            return __classPrivateFieldGet(this, _lineStart);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "mayDefineContext", {
        get: function () {
            return ast_service_1.Ast.mayDefineContext(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "name", {
        get: function () {
            var _a;
            return (_a = __classPrivateFieldGet(this, _name)) !== null && _a !== void 0 ? _a : '';
        },
        set: function (name) {
            __classPrivateFieldSet(this, _name, name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "nestingCpx", {
        get: function () {
            var _a;
            return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalNesting;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "parent", {
        get: function () {
            return __classPrivateFieldGet(this, _parent);
        },
        set: function (treeNode) {
            __classPrivateFieldSet(this, _parent, treeNode);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "pos", {
        get: function () {
            return __classPrivateFieldGet(this, _pos);
        },
        set: function (pos) {
            __classPrivateFieldSet(this, _pos, pos);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "start", {
        get: function () {
            return __classPrivateFieldGet(this, _start);
        },
        set: function (start) {
            __classPrivateFieldSet(this, _start, start);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "recursionCpx", {
        get: function () {
            var _a;
            return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalRecursion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "secondSon", {
        get: function () {
            return this.getSon(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "structuralCpx", {
        get: function () {
            var _a;
            return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalStructural;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "text", {
        get: function () {
            var _a;
            return (_a = __classPrivateFieldGet(this, _text)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astNodeService).getCode(this);
        },
        set: function (text) {
            __classPrivateFieldSet(this, _text, text);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "type", {
        get: function () {
            return __classPrivateFieldGet(this, _type);
        },
        set: function (type) {
            __classPrivateFieldSet(this, _type, type);
        },
        enumerable: false,
        configurable: true
    });
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates the complexity factors of this AstNode and its children
     */
    AstNode.prototype.evaluate = function () {
        this.calculateAndSetCpxFactors();
        this.addParentCpx();
        for (var _i = 0, _a = __classPrivateFieldGet(this, _children); _i < _a.length; _i++) {
            var child = _a[_i];
            child.evaluate();
        }
    };
    /**
     * Gets the xth son of this AstNode
     * @param sonNumber     // The number of the son (0 for the first one)
     */
    AstNode.prototype.getSon = function (sonNumber) {
        return this.children[sonNumber];
    };
    /**
     * Calculates the complexity factors of the AstNode
     */
    AstNode.prototype.calculateAndSetCpxFactors = function () {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        this.setGeneralCaseCpxFactors();
        this.setFunctionStructuralCpx();
        this.setRecursionOrCallbackCpxFactors();
        this.setElseCpxFactors();
        this.setRegexCpxFactors();
        this.setDepthCpxFactors();
        this.setAggregationCpxFactors();
        this.intrinsicNestingCpx = this.cpxFactors.totalNesting;
        this.intrinsicDepthCpx = this.cpxFactors.totalDepth;
        this.forceCpxFactors();
        return __classPrivateFieldGet(this, _cpxFactors);
    };
    /**
     * Sets the nesting and structural complexities for "usual" cases
     */
    AstNode.prototype.setGeneralCaseCpxFactors = function () {
        var _a;
        this.cpxFactors.nesting[this.factorCategory] = cpx_factors_1.cpxFactors.nesting[this.factorCategory];
        this.cpxFactors.structural[this.factorCategory] = cpx_factors_1.cpxFactors.structural[this.factorCategory];
        this.cpxFactors.atomic.node = (_a = cpx_factors_1.cpxFactors.atomic[this.factorCategory]) !== null && _a !== void 0 ? _a : cpx_factors_1.cpxFactors.atomic.node;
    };
    AstNode.prototype.setFunctionStructuralCpx = function () {
        var _a;
        if (this.type === 'function' && ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.kind) !== syntax_kind_enum_1.SyntaxKind.MethodDeclaration) {
            this.cpxFactors.structural.method = cpx_factors_1.cpxFactors.structural.method;
        }
    };
    AstNode.prototype.forceCpxFactors = function () {
        if (this.cpxFactorsFromJsonAST) {
            for (var _i = 0, _a = Object.keys(this.cpxFactorsFromJsonAST); _i < _a.length; _i++) {
                var category = _a[_i];
                for (var _b = 0, _c = Object.keys(this.cpxFactorsFromJsonAST[category]); _b < _c.length; _b++) {
                    var factor = _c[_b];
                    this.cpxFactors[category][factor] = this.cpxFactorsFromJsonAST[category][factor];
                }
            }
        }
    };
    /**
     * Sets depth complexity factor
     * Example : array in array, like a[b[c]]
     */
    AstNode.prototype.setDepthCpxFactors = function () {
        if (ast_service_1.Ast.isArrayIndex(this)) {
            this.cpxFactors.depth.arr = cpx_factors_1.cpxFactors.depth.arr;
        }
    };
    /**
     * Sets aggregation complexity factor
     */
    AstNode.prototype.setAggregationCpxFactors = function () {
        if (ast_service_1.Ast.isArrayOfArray(this)) {
            this.cpxFactors.aggregation.arr = cpx_factors_1.cpxFactors.aggregation.arr;
        }
        else if (ast_service_1.Ast.isDifferentLogicDoor(this)) {
            this.cpxFactors.aggregation.differentLogicDoor = cpx_factors_1.cpxFactors.aggregation.differentLogicDoor;
        }
    };
    /**
     * Sets complexity factor for "else" case
     */
    AstNode.prototype.setElseCpxFactors = function () {
        if (ast_service_1.Ast.isElseStatement(this)) {
            this.cpxFactors.structural.conditional = cpx_factors_1.cpxFactors.structural.conditional;
        }
        if (ast_service_1.Ast.isElseIfStatement(this)) {
            this.cpxFactors.nesting.conditional = 0;
        }
    };
    /**
     * Sets complexity factor for callbacks and recursions
     */
    AstNode.prototype.setRecursionOrCallbackCpxFactors = function () {
        this.cpxFactors.recursion.recursivity = this.isRecursiveMethod ? cpx_factors_1.cpxFactors.recursion.recursivity : 0;
        this.cpxFactors.recursion.callback = this.isCallback ? cpx_factors_1.cpxFactors.recursion.callback : 0;
    };
    /**
     * Sets complexity factor for regex
     */
    AstNode.prototype.setRegexCpxFactors = function () {
        if (this.factorCategory === node_feature_enum_1.NodeFeature.REGEX) {
            this.cpxFactors.aggregation.regex = +((this['text'].length - 2) * cpx_factors_1.cpxFactors.aggregation.regex).toFixed(2);
        }
    };
    /**
     * Sets the global nesting cpx of the node (the cpx from the node itself and from its parents)
     */
    AstNode.prototype.addParentCpx = function () {
        var _a, _b, _c, _d, _e;
        if (this && this.parent && ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.cpxFactors) === null || _b === void 0 ? void 0 : _b.nesting)) {
            this.cpxFactors.nesting = tools_service_1.addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
        if (this && ((_c = this.parent) === null || _c === void 0 ? void 0 : _c.parent) && ((_e = (_d = this.parent) === null || _d === void 0 ? void 0 : _d.cpxFactors) === null || _e === void 0 ? void 0 : _e.depth)) {
            this.cpxFactors.depth = tools_service_1.addObjects(this.parent.cpxFactors.depth, this.cpxFactors.depth);
        }
    };
    /**
     * Logs the main information about the AstNode
     * @param message
     */
    AstNode.prototype.logg = function (message) {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST NODE'));
        console.log(this.kind, this.name);
        console.log('-----------------------------');
        console.log('pos', this.pos, 'end', this.end);
        console.log('text', this.text);
    };
    return AstNode;
}());
exports.AstNode = AstNode;
_astFile = new WeakMap(), _astMethod = new WeakMap(), _astNodeService = new WeakMap(), _children = new WeakMap(), _context = new WeakMap(), _cpxFactors = new WeakMap(), _cpxFactorsFromJsonAST = new WeakMap(), _cyclomaticCpx = new WeakMap(), _end = new WeakMap(), _factorCategory = new WeakMap(), _intrinsicDepthCpx = new WeakMap(), _intrinsicNestingCpx = new WeakMap(), _isCallback = new WeakMap(), _isRecursiveMethod = new WeakMap(), _kind = new WeakMap(), _lineEnd = new WeakMap(), _linePos = new WeakMap(), _lineStart = new WeakMap(), _name = new WeakMap(), _parent = new WeakMap(), _pos = new WeakMap(), _start = new WeakMap(), _text = new WeakMap(), _type = new WeakMap();
