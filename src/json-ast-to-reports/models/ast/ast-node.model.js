"use strict";
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
        this._astFile = undefined; // The AstFile containing the AST node of the AstNode
        this._astMethod = undefined; // The method at the root of the current ast (if this ast is inside a method)
        this._astNodeService = new ast_node_service_1.AstNodeService(); // The service managing AstNodes
        this._children = []; // The children AstNodes of the AstNode
        this._context = undefined; // The context of the AstNode
        this._cpxFactors = undefined; // The complexity factors of the AstNode
        this._cpxFactorsFromJsonAST = undefined; // The complexity factors added manually in JsonAST (have priority on calculated cpxFactors)
        this._cyclomaticCpx = 0; // The cyclomatic complexity of the AstNode
        this._end = 0; // The pos of the end of the source code of the AstNode in the source code of the AstFile
        this._factorCategory = undefined; // The NodeFeature of the node of the AstNode
        this._intrinsicDepthCpx = undefined; // The depth of the AstNode inside its method (not including its parent's depth)
        this._intrinsicNestingCpx = undefined; // The nesting of the AstNode inside its method (not including its parent's nesting)
        this._isCallback = undefined; // True if the astNode is a method with a Callback, false if not
        this._isRecursiveMethod = undefined; // True if the astNode is a recursive method, false if not
        this._kind = undefined; // The kind of the node ('MethodDeclaration, IfStatement, ...)
        this._lineEnd = undefined; // The issue of the line containing the character at the AstNode.end
        this._linePos = undefined; // The issue of the line containing the character at the AstNode.pos
        this._lineStart = undefined; // The issue of the line containing the character at the AstNode.start
        this._name = undefined; // The name of the AstNode
        this._pos = 0; // The pos of the beginning of the AST node, including spaces and comments before it. (start <= start)
        this._start = 0; // The pos of the beginning of the AST node, without spaces and comments before it. (start >= start)
        this._text = undefined; // The code of the AstNode
        this._type = undefined; // The type of the AstNode (if given)
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
            return this._astFile;
        },
        set: function (astFile) {
            this._astFile = astFile;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "astMethod", {
        get: function () {
            return this._astMethod;
        },
        set: function (astMethod) {
            this._astMethod = astMethod;
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
            return this._children;
        },
        set: function (children) {
            this._children = children;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "context", {
        get: function () {
            var _a;
            return (_a = this._context) !== null && _a !== void 0 ? _a : this._astNodeService.getContext(this);
        },
        set: function (treeNode) {
            this._context = treeNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "cpxFactors", {
        get: function () {
            return this._cpxFactors;
        },
        set: function (cpxFactors) {
            this._cpxFactors = cpxFactors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "cpxFactorsFromJsonAST", {
        get: function () {
            return this._cpxFactorsFromJsonAST;
        },
        set: function (cpxFactorsFromJsonAST) {
            this._cpxFactorsFromJsonAST = cpxFactorsFromJsonAST;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "cyclomaticCpx", {
        get: function () {
            return this._cyclomaticCpx;
        },
        set: function (cyclomaticCpx) {
            this._cyclomaticCpx = cyclomaticCpx;
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
            return this._end;
        },
        set: function (end) {
            this._end = end;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "factorCategory", {
        get: function () {
            var _a;
            return (_a = this._factorCategory) !== null && _a !== void 0 ? _a : new factor_category_service_1.FactorCategoryService().getNodeFeature(this.kind);
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
            return this._intrinsicDepthCpx;
        },
        set: function (cpx) {
            this._intrinsicDepthCpx = cpx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "intrinsicNestingCpx", {
        get: function () {
            return this._intrinsicNestingCpx;
        },
        set: function (cpx) {
            this._intrinsicNestingCpx = cpx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "isCallback", {
        get: function () {
            if (this._isCallback) {
                return this._isCallback;
            }
            this._isCallback = this._astNodeService.isCallback(this);
            return this._isCallback;
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
            if (this._isRecursiveMethod) {
                return this._isRecursiveMethod;
            }
            this._isRecursiveMethod = this._astNodeService.isRecursiveMethod(this);
            return this._isRecursiveMethod;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        set: function (kind) {
            this._kind = kind;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "lineEnd", {
        get: function () {
            var _a;
            if (this._lineEnd) {
                return this._lineEnd;
            }
            this._lineEnd = code_service_1.CodeService.getLineIssue((_a = this.astFile) === null || _a === void 0 ? void 0 : _a.code, this.end);
            return this._lineEnd;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "linePos", {
        get: function () {
            var _a;
            if (this._linePos) {
                return this._linePos;
            }
            this._linePos = code_service_1.CodeService.getLineIssue((_a = this.astFile) === null || _a === void 0 ? void 0 : _a.code, this.pos);
            return this._linePos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "lineStart", {
        get: function () {
            var _a;
            if (this._lineStart) {
                return this._lineStart;
            }
            this._lineStart = code_service_1.CodeService.getLineIssue((_a = this.astFile) === null || _a === void 0 ? void 0 : _a.code, this.start);
            return this._lineStart;
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
            return (_a = this._name) !== null && _a !== void 0 ? _a : '';
        },
        set: function (name) {
            this._name = name;
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
            return this._parent;
        },
        set: function (treeNode) {
            this._parent = treeNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (pos) {
            this._pos = pos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "start", {
        get: function () {
            return this._start;
        },
        set: function (start) {
            this._start = start;
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
            return (_a = this._text) !== null && _a !== void 0 ? _a : this._astNodeService.getCode(this);
        },
        set: function (text) {
            this._text = text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstNode.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
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
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
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
        return this._cpxFactors;
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
