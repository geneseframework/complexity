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
var _astNode, _codeLines, _cognitiveStatus, _cpxFactors, _cyclomaticCpx, _cpxIndex, _cyclomaticStatus, _displayedCode, _maxLineLength, _name;
exports.__esModule = true;
exports.AstMethod = void 0;
var cyclomatic_cpx_service_1 = require("../../services/cyclomatic-cpx.service");
var code_model_1 = require("../code/code.model");
var ast_service_1 = require("../../services/ast/ast.service");
var evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
var cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
var complexity_type_enum_1 = require("../../enums/complexity-type.enum");
var code_line_model_1 = require("../code/code-line.model");
var cpx_factors_1 = require("../../../core/const/cpx-factors");
var factor_category_enum_1 = require("../../enums/factor-category.enum");
var options_model_1 = require("../../../core/models/options.model");
/**
 * Element of the AstNode structure corresponding to a given method
 */
var AstMethod = /** @class */ (function () {
    function AstMethod() {
        _astNode.set(this, undefined); // The AST of the method itself
        _codeLines.set(this, []); // The array of CodeLine of the AstMethod (elements of the array of CodeLine of the corresponding AstFile)
        _cognitiveStatus.set(this, evaluation_status_enum_1.MethodStatus.CORRECT); // The cognitive status of the method
        _cpxFactors.set(this, undefined); // The complexity factors of the AstMethod
        _cyclomaticCpx.set(this, 0); // The cyclomatic complexity of the AstMethod
        _cpxIndex.set(this, undefined); // The complexity index of the method
        _cyclomaticStatus.set(this, evaluation_status_enum_1.MethodStatus.CORRECT); // The cyclomatic status of the method
        _displayedCode.set(this, undefined); // The code to display in the report
        _maxLineLength.set(this, 0); // The max length of the lines of the code
        _name.set(this, undefined); // The name of the method
    }
    Object.defineProperty(AstMethod.prototype, "astNode", {
        // ---------------------------------------------------------------------------------
        //                                Getters and setters
        // ---------------------------------------------------------------------------------
        get: function () {
            return __classPrivateFieldGet(this, _astNode);
        },
        set: function (astNode) {
            __classPrivateFieldSet(this, _astNode, astNode);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "codeLines", {
        get: function () {
            return __classPrivateFieldGet(this, _codeLines);
        },
        set: function (codeLines) {
            __classPrivateFieldSet(this, _codeLines, codeLines);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "cognitiveStatus", {
        get: function () {
            return __classPrivateFieldGet(this, _cognitiveStatus);
        },
        set: function (cognitiveStatus) {
            __classPrivateFieldSet(this, _cognitiveStatus, cognitiveStatus);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "cpxFactors", {
        get: function () {
            return __classPrivateFieldGet(this, _cpxFactors);
        },
        set: function (cpxFactors) {
            __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "cpxIndex", {
        get: function () {
            var _a;
            return (_a = __classPrivateFieldGet(this, _cpxIndex)) !== null && _a !== void 0 ? _a : this.cpxFactors.total;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "cyclomaticCpx", {
        get: function () {
            return __classPrivateFieldGet(this, _cyclomaticCpx);
        },
        set: function (cyclomaticCpx) {
            __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "cyclomaticStatus", {
        get: function () {
            return __classPrivateFieldGet(this, _cyclomaticStatus);
        },
        set: function (cyclomaticStatus) {
            __classPrivateFieldSet(this, _cyclomaticStatus, cyclomaticStatus);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "displayedCode", {
        get: function () {
            return __classPrivateFieldGet(this, _displayedCode);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "end", {
        get: function () {
            return this.astNode.end;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "maxLineLength", {
        get: function () {
            var _a;
            if (__classPrivateFieldGet(this, _maxLineLength)) {
                return __classPrivateFieldGet(this, _maxLineLength);
            }
            __classPrivateFieldSet(this, _maxLineLength, Math.max.apply(Math, (_a = this.codeLines) === null || _a === void 0 ? void 0 : _a.map(function (l) { return l.end - l.start; })));
            return __classPrivateFieldGet(this, _maxLineLength);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "name", {
        get: function () {
            if (__classPrivateFieldGet(this, _name)) {
                return __classPrivateFieldGet(this, _name);
            }
            __classPrivateFieldSet(this, _name, __classPrivateFieldGet(this, _astNode).name);
            return __classPrivateFieldGet(this, _name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "pos", {
        get: function () {
            var _a;
            return (_a = this.astNode) === null || _a === void 0 ? void 0 : _a.pos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstMethod.prototype, "start", {
        get: function () {
            var _a;
            return (_a = this.astNode) === null || _a === void 0 ? void 0 : _a.start;
        },
        enumerable: false,
        configurable: true
    });
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Creates the displayed code of this AstMethod and evaluates its complexity
     */
    AstMethod.prototype.evaluate = function () {
        this.createDisplayedCode();
        // LogService.logMethod(this);
        this.cognitiveStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.cyclomaticCpx = cyclomatic_cpx_service_1.CyclomaticCpxService.calculateCyclomaticCpx(this.astNode);
        this.cyclomaticStatus = this.getComplexityStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
    };
    /**
     * Calculates the Complexity Factors of the method
     */
    AstMethod.prototype.calculateCpxFactors = function () {
        var _a, _b, _c;
        if (!(((_b = (_a = __classPrivateFieldGet(this, _displayedCode)) === null || _a === void 0 ? void 0 : _a.lines) === null || _b === void 0 ? void 0 : _b.length) > 0)) {
            this.createDisplayedCode();
        }
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        for (var _i = 0, _d = (_c = __classPrivateFieldGet(this, _displayedCode)) === null || _c === void 0 ? void 0 : _c.lines; _i < _d.length; _i++) {
            var line = _d[_i];
            this.cpxFactors = this.cpxFactors.add(line.cpxFactors);
        }
    };
    /**
     * Gets the complexity status of the method for a given complexity type
     * @param cpxType
     */
    AstMethod.prototype.getComplexityStatus = function (cpxType) {
        var status = evaluation_status_enum_1.MethodStatus.WARNING;
        if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && this.cpxIndex <= options_model_1.Options.cognitiveCpx.warningThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticCpx <= options_model_1.Options.cyclomaticCpx.warningThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.CORRECT;
        }
        else if ((cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE && Math.round(this.cpxIndex) > options_model_1.Options.cognitiveCpx.errorThreshold)
            ||
                (cpxType === complexity_type_enum_1.ComplexityType.CYCLOMATIC && this.cyclomaticCpx > options_model_1.Options.cyclomaticCpx.errorThreshold)) {
            status = evaluation_status_enum_1.MethodStatus.ERROR;
        }
        return status;
    };
    /**
     * Creates the method's code to display, with comments
     * @param astNode  // The AstNode to analyse (by default: the AstNode associated to this AstMethod)
     */
    AstMethod.prototype.createDisplayedCode = function (astNode) {
        if (astNode === void 0) { astNode = this.astNode; }
        this.setDisplayedCodeLines();
        this.setDeclarationCpxFactors();
        this.setCpxFactorsToDisplayedCode(astNode, false);
        __classPrivateFieldGet(this, _displayedCode).setLinesDepthAndNestingCpx();
        this.addCommentsToDisplayedCode();
        this.calculateCpxFactors();
        __classPrivateFieldGet(this, _displayedCode).setTextWithLines();
    };
    /**
     * Creates the Code object corresponding to the code to display
     */
    AstMethod.prototype.setDisplayedCodeLines = function () {
        __classPrivateFieldSet(this, _displayedCode, new code_model_1.Code());
        for (var _i = 0, _a = this.codeLines; _i < _a.length; _i++) {
            var line = _a[_i];
            var displayedLine = new code_line_model_1.CodeLine();
            displayedLine.issue = line.issue;
            displayedLine.end = line.end;
            displayedLine.start = line.start;
            displayedLine.text = line.text;
            displayedLine.text = this.getDisplayedLineText(displayedLine);
            __classPrivateFieldGet(this, _displayedCode).lines.push(displayedLine);
        }
    };
    /**
     * Returns the text to display for a given line. Removes characters of the first and the last lines which are not inside the AstMethod
     * @param line      // The line to display
     */
    AstMethod.prototype.getDisplayedLineText = function (line) {
        var _a, _b;
        var text = line.text;
        if (line.issue === ((_a = this.codeLines[0]) === null || _a === void 0 ? void 0 : _a.issue)) {
            var firstCharPosition = this.start - line.start;
            var indentation = text.slice(0, text.length - text.trimLeft().length);
            text = "\n" + indentation + text.slice(firstCharPosition);
        }
        if (line.issue === ((_b = this.codeLines[this.codeLines.length - 1]) === null || _b === void 0 ? void 0 : _b.issue)) {
            var lastCharPosition = this.end - line.start;
            text = text.slice(0, lastCharPosition);
        }
        return text;
    };
    AstMethod.prototype.setDeclarationCpxFactors = function () {
        this.increaseLineCpxFactors(this.astNode, __classPrivateFieldGet(this, _displayedCode).getLine(this.astNode.lineStart));
        __classPrivateFieldGet(this, _displayedCode).getLine(this.astNode.lineStart).astNodes.push(this.astNode);
    };
    /**
     * Calculates the complexity factors of each CodeLine
     * @param astNode                   // The AstNode of the method
     * @param startedUncommentedLines   // Param for recursion (checks if the current line is the first uncommented one)
     */
    AstMethod.prototype.setCpxFactorsToDisplayedCode = function (astNode, startedUncommentedLines) {
        var _a;
        if (startedUncommentedLines === void 0) { startedUncommentedLines = false; }
        var _loop_1 = function (childAst) {
            var issue = Math.max(childAst.lineStart, (_a = this_1.codeLines[0]) === null || _a === void 0 ? void 0 : _a.issue);
            var codeLine = __classPrivateFieldGet(this_1, _displayedCode).lines.find(function (l) { return l.issue === issue; });
            if (ast_service_1.Ast.isElseStatement(childAst)) {
                childAst.cpxFactors.atomic.node = cpx_factors_1.cpxFactors.atomic.node;
                issue--;
            }
            this_1.increaseLineCpxFactors(childAst, codeLine);
            __classPrivateFieldGet(this_1, _displayedCode).getLine(issue).astNodes.push(childAst);
            this_1.setCpxFactorsToDisplayedCode(childAst, startedUncommentedLines);
        };
        var this_1 = this;
        for (var _i = 0, _b = astNode.children; _i < _b.length; _i++) {
            var childAst = _b[_i];
            _loop_1(childAst);
        }
    };
    /**
     * Adds the Complexity of a AstNode to its CodeLine
     * @param astNode      // The AstNode inside the line of code
     * @param codeLine      // The CodeLine containing the AstNode
     */
    AstMethod.prototype.increaseLineCpxFactors = function (astNode, codeLine) {
        if (!codeLine.isCommented) {
            codeLine.cpxFactors = codeLine.cpxFactors.add(astNode === null || astNode === void 0 ? void 0 : astNode.cpxFactors);
        }
    };
    /**
     * Adds information about complexity factors for each line of the displayed code
     */
    AstMethod.prototype.addCommentsToDisplayedCode = function () {
        var _this = this;
        __classPrivateFieldGet(this, _displayedCode).lines
            .filter(function (line) { return line.cpxFactors.total > 0; })
            .forEach(function (line) {
            var comment = "+" + line.cpxFactors.total.toFixed(1) + " Complexity index (+" + line.cpxFactors.totalAtomic.toFixed(1) + " " + factor_category_enum_1.FactorCategory.ATOMIC;
            comment = line.cpxFactors.totalAggregation > 0 ? comment + ", +" + line.cpxFactors.totalAggregation + " " + factor_category_enum_1.FactorCategory.AGGREGATION : comment;
            comment = line.cpxFactors.totalNesting > 0 ? comment + ", +" + line.cpxFactors.totalNesting + " nesting" : comment;
            comment = line.cpxFactors.totalDepth > 0 ? comment + ", +" + line.cpxFactors.totalDepth + " depth" : comment;
            comment = line.cpxFactors.totalRecursion > 0 ? comment + ", +" + line.cpxFactors.totalRecursion + " recursivity" : comment;
            comment = line.cpxFactors.totalStructural > 0 ? comment + ", +" + line.cpxFactors.totalStructural + " " + factor_category_enum_1.FactorCategory.STRUCTURAL : comment;
            comment = line.cpxFactors.totalUse > 0 ? comment + ", +" + line.cpxFactors.totalUse + " " + factor_category_enum_1.FactorCategory.USE : comment;
            comment = comment + ")";
            __classPrivateFieldGet(_this, _displayedCode).getLine(line.issue).addComment(comment, _this.maxLineLength);
        });
    };
    return AstMethod;
}());
exports.AstMethod = AstMethod;
_astNode = new WeakMap(), _codeLines = new WeakMap(), _cognitiveStatus = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _cpxIndex = new WeakMap(), _cyclomaticStatus = new WeakMap(), _displayedCode = new WeakMap(), _maxLineLength = new WeakMap(), _name = new WeakMap();
