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
var _code, _isEndingWithBlockComments;
exports.__esModule = true;
exports.CodeLine = void 0;
var cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
var nesting_cpx_model_1 = require("../../../core/models/cpx-factor/nesting-cpx.model");
var depth_cpx_model_1 = require("../../../core/models/cpx-factor/depth-cpx.model");
var tools_service_1 = require("../../../core/services/tools.service");
var code_service_1 = require("../../services/code.service");
var CodeLine = /** @class */ (function () {
    function CodeLine() {
        this.astNodes = []; // The array of AstNodes corresponding to AST nodes in this line of code
        _code.set(this, undefined);
        this.cpxFactors = new cpx_factors_model_1.CpxFactors(); // The complexity factors relative to this line (breakFlows, increments,...)
        this.end = 0; // The pos (in number of characters) of the end of the line
        _isEndingWithBlockComments.set(this, void 0);
        this.issue = 0; // The number of the line in its Code parentFunction (method)
        // pos ?= 0;                                               // The relative pos (in number of characters) of the start of the line in its Code
        this.start = 0; // The absolute pos (in number of characters) of the start of the line in the SourceFile
        this.text = ''; // The text of the line
    }
    Object.defineProperty(CodeLine.prototype, "code", {
        get: function () {
            return __classPrivateFieldGet(this, _code);
        },
        set: function (code) {
            __classPrivateFieldSet(this, _code, code);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodeLine.prototype, "isEndingWithBlockComments", {
        get: function () {
            if (__classPrivateFieldGet(this, _isEndingWithBlockComments) !== undefined) {
                return __classPrivateFieldGet(this, _isEndingWithBlockComments);
            }
            __classPrivateFieldSet(this, _isEndingWithBlockComments, new code_service_1.CodeService().isEndingWithBlockComments(this));
            return __classPrivateFieldGet(this, _isEndingWithBlockComments);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodeLine.prototype, "hasNode", {
        get: function () {
            return this.textWithoutComments.trim().length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodeLine.prototype, "isCommented", {
        /**
         * Checks if a line is commented
         */
        get: function () {
            return this.text.trim().slice(0, 2) === "//" || this.text.trim().slice(0, 2) === "/*";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodeLine.prototype, "previousLine", {
        get: function () {
            var _a, _b;
            return this.issue > 1 ? (_b = (_a = this.code) === null || _a === void 0 ? void 0 : _a.lines) === null || _b === void 0 ? void 0 : _b[this.issue - 2] : undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodeLine.prototype, "textWithoutComments", {
        get: function () {
            var _a;
            var text = this.textWithoutSlashComments;
            if ((_a = this.previousLine) === null || _a === void 0 ? void 0 : _a.isEndingWithBlockComments) {
                text = "/*" + text;
            }
            if (this.isEndingWithBlockComments) {
                text = text + "*/";
            }
            return text.split(/\/\*.*\*\//).join('');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CodeLine.prototype, "textWithoutSlashComments", {
        get: function () {
            var _a, _b;
            var splittedText = (_b = (_a = this.text) === null || _a === void 0 ? void 0 : _a.split(/\/\//)) !== null && _b !== void 0 ? _b : '';
            if (splittedText.length === 1) {
                return this.text;
            }
            return this.text.slice(0, splittedText[0].length - 1);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Add a comment at the end of a line of the code
     * @param comment   // The comment to add
     * @param maxLineLength
     */
    CodeLine.prototype.addComment = function (comment, maxLineLength) {
        var txt = this.text + " // ";
        this.text = txt.padEnd(maxLineLength + 10, '-') + " " + comment;
    };
    /**
     * Sets the depth and nesting complexity to this CodeLine
     */
    CodeLine.prototype.setDepthAndNestingCpx = function () {
        var _a, _b, _c, _d, _e;
        this.cpxFactors.nesting = new nesting_cpx_model_1.NestingCpx();
        this.cpxFactors.depth = new depth_cpx_model_1.DepthCpx();
        for (var _i = 0, _f = this.astNodes; _i < _f.length; _i++) {
            var astNode = _f[_i];
            if (astNode.intrinsicNestingCpx > 0) {
                this.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_a = astNode.cpxFactors) === null || _a === void 0 ? void 0 : _a.depth);
                this.cpxFactors.nesting = tools_service_1.addObjects(this.cpxFactors.nesting, (_c = (_b = astNode.parent) === null || _b === void 0 ? void 0 : _b.cpxFactors) === null || _c === void 0 ? void 0 : _c.nesting);
            }
            if (astNode.intrinsicDepthCpx > 0) {
                this.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_e = (_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.cpxFactors) === null || _e === void 0 ? void 0 : _e.depth);
            }
        }
    };
    return CodeLine;
}());
exports.CodeLine = CodeLine;
_code = new WeakMap(), _isEndingWithBlockComments = new WeakMap();
