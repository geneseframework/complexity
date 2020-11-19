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
var _astFolder, _astMethods, _astNode, _astNodes, _code, _complexitiesByStatus, _cpxFactors, _cyclomaticCpx, _end, _name, _stats;
exports.__esModule = true;
exports.AstFile = void 0;
var ast_file_service_1 = require("../../services/ast/ast-file.service");
var cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
var ast_method_service_1 = require("../../services/ast/ast-method.service");
var chalk = require("chalk");
var AstFile = /** @class */ (function () {
    function AstFile() {
        _astFolder.set(this, undefined); // The AstFolder which includes this AstFile
        _astMethods.set(this, []); // The AstMethods included in this AstFile
        _astNode.set(this, undefined); // The AstNode corresponding to the file itself
        _astNodes.set(this, undefined); // Array of all the AstNodes which are children of this.AstNode (including itself)
        _code.set(this, undefined); // The Code object corresponding to the AstFile
        _complexitiesByStatus.set(this, undefined); // The file complexities spread by complexity status
        _cpxFactors.set(this, undefined); // The complexity factors of the AstFile
        _cyclomaticCpx.set(this, 0); // The complexity factors of the AstFile
        _end.set(this, undefined); // The pos of the end of the source code
        _name.set(this, undefined); // The name of the AstFile
        _stats.set(this, undefined); // The statistics of the AstFile
    }
    Object.defineProperty(AstFile.prototype, "astFolder", {
        // ---------------------------------------------------------------------------------
        //                                Getters and setters
        // ---------------------------------------------------------------------------------
        get: function () {
            return __classPrivateFieldGet(this, _astFolder);
        },
        set: function (astFolder) {
            __classPrivateFieldSet(this, _astFolder, astFolder);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "astMethods", {
        get: function () {
            if (__classPrivateFieldGet(this, _astMethods)) {
                return __classPrivateFieldGet(this, _astMethods);
            }
            return [];
        },
        set: function (astMethods) {
            __classPrivateFieldSet(this, _astMethods, astMethods);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "astNode", {
        get: function () {
            return __classPrivateFieldGet(this, _astNode);
        },
        set: function (astNode) {
            __classPrivateFieldSet(this, _astNode, astNode);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "astNodes", {
        get: function () {
            return __classPrivateFieldGet(this, _astNodes);
        },
        set: function (astNodes) {
            __classPrivateFieldSet(this, _astNodes, astNodes);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "code", {
        get: function () {
            return __classPrivateFieldGet(this, _code);
        },
        set: function (code) {
            __classPrivateFieldSet(this, _code, code);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "complexitiesByStatus", {
        get: function () {
            return __classPrivateFieldGet(this, _complexitiesByStatus);
        },
        set: function (cpxByStatus) {
            __classPrivateFieldSet(this, _complexitiesByStatus, cpxByStatus);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "cpxFactors", {
        get: function () {
            return __classPrivateFieldGet(this, _cpxFactors);
        },
        set: function (cpxFactors) {
            __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "cyclomaticCpx", {
        get: function () {
            return __classPrivateFieldGet(this, _cyclomaticCpx);
        },
        set: function (cyclomaticCpx) {
            __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "end", {
        get: function () {
            var _a, _b;
            return (_a = __classPrivateFieldGet(this, _end)) !== null && _a !== void 0 ? _a : (_b = __classPrivateFieldGet(this, _astNode)) === null || _b === void 0 ? void 0 : _b.end;
        },
        set: function (end) {
            __classPrivateFieldSet(this, _end, end);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "name", {
        get: function () {
            return __classPrivateFieldGet(this, _name);
        },
        set: function (name) {
            __classPrivateFieldSet(this, _name, name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "stats", {
        get: function () {
            if (!__classPrivateFieldGet(this, _stats)) {
                __classPrivateFieldSet(this, _stats, new ast_file_service_1.AstFileService().getStats(this));
            }
            return __classPrivateFieldGet(this, _stats);
        },
        set: function (stats) {
            __classPrivateFieldSet(this, _stats, stats);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFile.prototype, "text", {
        get: function () {
            return __classPrivateFieldGet(this, _code).text;
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
_astFolder = new WeakMap(), _astMethods = new WeakMap(), _astNode = new WeakMap(), _astNodes = new WeakMap(), _code = new WeakMap(), _complexitiesByStatus = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _end = new WeakMap(), _name = new WeakMap(), _stats = new WeakMap();
