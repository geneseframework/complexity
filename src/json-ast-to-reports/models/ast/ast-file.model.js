"use strict";
exports.__esModule = true;
exports.AstFile = void 0;
var ast_file_service_1 = require("../../services/ast/ast-file.service");
var cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
var ast_method_service_1 = require("../../services/ast/ast-method.service");
var chalk = require("chalk");
var nesting_cpx_model_1 = require("../../../core/models/cpx-factor/nesting-cpx.model");
var depth_cpx_model_1 = require("../../../core/models/cpx-factor/depth-cpx.model");
var tools_service_1 = require("../../../core/services/tools.service");
var AstFile = /** @class */ (function () {
    function AstFile() {
        this._astFolder = undefined; // The AstFolder which includes this AstFile
        this._astMethods = []; // The AstMethods included in this AstFile
        this._astNode = undefined; // The AstNode corresponding to the file itself
        this._astNodes = undefined; // Array of all the AstNodes which are children of this.AstNode (including itself)
        this._code = undefined; // The Code object corresponding to the AstFile
        this._complexitiesByStatus = undefined; // The file complexities spread by complexity status
        this._cpxFactors = undefined; // The complexity factors of the AstFile
        this._cyclomaticCpx = 0; // The complexity factors of the AstFile
        this._end = undefined; // The pos of the end of the source code
        this._name = undefined; // The name of the AstFile
        this._stats = undefined; // The statistics of the AstFile
    }
    Object.defineProperty(AstFile.prototype, "astFolder", {
        // ---------------------------------------------------------------------------------
        //                                Getters and setters
        // ---------------------------------------------------------------------------------
        get: function () {
            return this._astFolder;
        },
        set: function (astFolder) {
            this._astFolder = astFolder;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "astMethods", {
        get: function () {
            if (this._astMethods) {
                return this._astMethods;
            }
            return [];
        },
        set: function (astMethods) {
            this._astMethods = astMethods;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "astNode", {
        get: function () {
            return this._astNode;
        },
        set: function (astNode) {
            this._astNode = astNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "astNodes", {
        get: function () {
            return this._astNodes;
        },
        set: function (astNodes) {
            this._astNodes = astNodes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "code", {
        get: function () {
            return this._code;
        },
        set: function (code) {
            this._code = code;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "complexitiesByStatus", {
        get: function () {
            return this._complexitiesByStatus;
        },
        set: function (cpxByStatus) {
            this._complexitiesByStatus = cpxByStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "cpxFactors", {
        get: function () {
            return this._cpxFactors;
        },
        set: function (cpxFactors) {
            this._cpxFactors = cpxFactors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "cyclomaticCpx", {
        get: function () {
            return this._cyclomaticCpx;
        },
        set: function (cyclomaticCpx) {
            this._cyclomaticCpx = cyclomaticCpx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "end", {
        get: function () {
            var _a, _b;
            return (_a = this._end) !== null && _a !== void 0 ? _a : (_b = this._astNode) === null || _b === void 0 ? void 0 : _b.end;
        },
        set: function (end) {
            this._end = end;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "stats", {
        get: function () {
            if (!this._stats) {
                this._stats = new ast_file_service_1.AstFileService().getStats(this);
            }
            return this._stats;
        },
        set: function (stats) {
            this._stats = stats;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "text", {
        get: function () {
            return this._code.text;
        },
        enumerable: false,
        configurable: true
    });
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates the complexities of the AstNodes and the AstMethods of this AstFile
     */
    AstFile.prototype.evaluate = function () {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        var astMethodService = new ast_method_service_1.AstMethodService();
        this.astNode.evaluate();
        for (var _i = 0, _a = this.astMethods; _i < _a.length; _i++) {
            var method = _a[_i];
            method.evaluate();
            this.cpxFactors = this.cpxFactors.add(method.cpxFactors);
            this.cyclomaticCpx = this.cyclomaticCpx + method.cyclomaticCpx;
            this.complexitiesByStatus = astMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        }
    };
    /**
     * Evaluates the complexities of the AstNodes of this AstFile
     * But not based on methods
     */
    AstFile.prototype.evaluateStandalone = function () {
        var _a, _b, _c, _d, _e;
        this.astMethods = [];
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        this.astNode.evaluate();
        for (var _i = 0, _f = this.astNodes; _i < _f.length; _i++) {
            var node = _f[_i];
            node.cpxFactors.nesting = new nesting_cpx_model_1.NestingCpx();
            node.cpxFactors.depth = new depth_cpx_model_1.DepthCpx();
            for (var _g = 0, _h = node.children; _g < _h.length; _g++) {
                var astNode = _h[_g];
                if (astNode.intrinsicNestingCpx > 0) {
                    node.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_a = astNode.cpxFactors) === null || _a === void 0 ? void 0 : _a.depth);
                    node.cpxFactors.nesting = tools_service_1.addObjects(this.cpxFactors.nesting, (_c = (_b = astNode.parent) === null || _b === void 0 ? void 0 : _b.cpxFactors) === null || _c === void 0 ? void 0 : _c.nesting);
                }
                if (astNode.intrinsicDepthCpx > 0) {
                    node.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_e = (_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.cpxFactors) === null || _e === void 0 ? void 0 : _e.depth);
                }
            }
            this.cpxFactors = this.cpxFactors.add(node.cpxFactors);
        }
    };
    /**
     * Logs the main elements of an AstFile
     * @param message       // Optional message
     */
    AstFile.prototype.logg = function (message) {
        var _a, _b;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST_FILE'));
        console.log(this.name);
        console.log('-----------------------------');
        console.log(chalk.blueBright('end :'), this.end);
        console.log(chalk.blueBright('text :'), this.text);
        console.log(chalk.blueBright('astNode :'), (_a = this.astNode) === null || _a === void 0 ? void 0 : _a.kind);
        console.log(chalk.blueBright('astFolder :'), (_b = this.astFolder) === null || _b === void 0 ? void 0 : _b.path);
    };
    return AstFile;
}());
exports.AstFile = AstFile;
