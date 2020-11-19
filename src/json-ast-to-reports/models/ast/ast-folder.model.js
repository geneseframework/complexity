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
var _astFiles, _astFolderService, _children, _complexitiesByStatus, _cpxFactors, _cyclomaticCpx, _numberOfFiles, _numberOfMethods, _parent, _path, _relativePath, _stats;
exports.__esModule = true;
exports.AstFolder = void 0;
var complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
var cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
var ast_folder_service_1 = require("../../services/ast/ast-folder.service");
var chalk = require("chalk");
var AstFolder = /** @class */ (function () {
    function AstFolder() {
        _astFiles.set(this, []); // The array of files of this folder (not in the subfolders)
        _astFolderService.set(this, new ast_folder_service_1.AstFolderService()); // The service managing AstFolders
        _children.set(this, []); // The subfolders of this folder
        _complexitiesByStatus.set(this, new complexities_by_status_interface_1.ComplexitiesByStatus()); // The folder complexities spread by complexity status
        _cpxFactors.set(this, undefined); // The complexity factors of the AstFolder
        _cyclomaticCpx.set(this, 0); // The cyclomatic complexity of the AstFolder
        _numberOfFiles.set(this, undefined); // The number of files of the AstFolder
        _numberOfMethods.set(this, undefined); // The number of methods of the AstFolder
        _parent.set(this, undefined); // The AstFolder corresponding to the parent folder of this AstFolder
        _path.set(this, undefined); // The absolute path of this folder
        _relativePath.set(this, undefined); // The relative path of this folder compared to the root folder of the analyse
        _stats.set(this, undefined); // The stats corresponding to this folder
    }
    Object.defineProperty(AstFolder.prototype, "astFiles", {
        // ---------------------------------------------------------------------------------
        //                                Getters and setters
        // ---------------------------------------------------------------------------------
        get: function () {
            return __classPrivateFieldGet(this, _astFiles);
        },
        set: function (astFiles) {
            __classPrivateFieldSet(this, _astFiles, astFiles);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "children", {
        get: function () {
            return __classPrivateFieldGet(this, _children);
        },
        set: function (children) {
            __classPrivateFieldSet(this, _children, children);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "complexitiesByStatus", {
        get: function () {
            return __classPrivateFieldGet(this, _complexitiesByStatus);
        },
        set: function (complexitiesByStatus) {
            __classPrivateFieldSet(this, _complexitiesByStatus, complexitiesByStatus);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "cpxFactors", {
        get: function () {
            if (__classPrivateFieldGet(this, _cpxFactors)) {
                return __classPrivateFieldGet(this, _cpxFactors);
            }
            this.evaluate();
            return __classPrivateFieldGet(this, _cpxFactors);
        },
        set: function (cpxFactors) {
            __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "cyclomaticCpx", {
        get: function () {
            return __classPrivateFieldGet(this, _cyclomaticCpx);
        },
        set: function (cyclomaticCpx) {
            __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "numberOfFiles", {
        get: function () {
            var _a;
            return (_a = __classPrivateFieldGet(this, _numberOfFiles)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astFolderService).getNumberOfFiles(this);
        },
        set: function (numberOfFiles) {
            __classPrivateFieldSet(this, _numberOfFiles, numberOfFiles);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "numberOfMethods", {
        get: function () {
            var _a;
            return (_a = __classPrivateFieldGet(this, _numberOfMethods)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astFolderService).getNumberOfMethods(this);
        },
        set: function (numberOfMethods) {
            __classPrivateFieldSet(this, _numberOfMethods, numberOfMethods);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "parent", {
        get: function () {
            return __classPrivateFieldGet(this, _parent);
        },
        set: function (parent) {
            __classPrivateFieldSet(this, _parent, parent);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "path", {
        get: function () {
            return __classPrivateFieldGet(this, _path);
        },
        set: function (path) {
            __classPrivateFieldSet(this, _path, path);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "relativePath", {
        get: function () {
            var _a;
            return (_a = __classPrivateFieldGet(this, _relativePath)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astFolderService).getRelativePath(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "stats", {
        get: function () {
            return __classPrivateFieldGet(this, _stats);
        },
        set: function (stats) {
            __classPrivateFieldSet(this, _stats, stats);
        },
        enumerable: false,
        configurable: true
    });
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates and sets the complexities of the AstFiles of this AstFolder (including its subfolders)
     */
    AstFolder.prototype.evaluate = function () {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        this.evaluateCpxFactors(this);
        this.numberOfMethods = __classPrivateFieldGet(this, _astFolderService).getNumberOfMethods(this);
        this.stats = __classPrivateFieldGet(this, _astFolderService).calculateStats(this);
    };
    /**
     * Evaluates and sets the complexities of the AstFiles of a given AstFolder (including its subfolders)
     * @param astFolder     // The "parent" AstFolder
     */
    AstFolder.prototype.evaluateCpxFactors = function (astFolder) {
        for (var _i = 0, _a = astFolder.astFiles; _i < _a.length; _i++) {
            var astFile = _a[_i];
            astFile.evaluate();
            this.addCpx(astFile);
        }
        for (var _b = 0, _c = astFolder.children; _b < _c.length; _b++) {
            var childAstFolder = _c[_b];
            childAstFolder.evaluate();
            this.addCpx(childAstFolder);
        }
    };
    AstFolder.prototype.addCpx = function (element) {
        this.cpxFactors = this.cpxFactors.add(element.cpxFactors);
        this.cyclomaticCpx = this.cyclomaticCpx + element.cyclomaticCpx;
        this.complexitiesByStatus = this.complexitiesByStatus.add(element.complexitiesByStatus);
    };
    /**
     * Logs the main elements of the AstFolder
     * @param message       // An optional message
     */
    AstFolder.prototype.logg = function (message) {
        var _a, _b;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST_FOLDER'));
        console.log(this.path);
        console.log('-----------------------------');
        console.log(chalk.blueBright('parent :'), (_a = this.parent) === null || _a === void 0 ? void 0 : _a.path);
        for (var _i = 0, _c = this.astFiles; _i < _c.length; _i++) {
            var astFile = _c[_i];
            var name_1 = (_b = astFile === null || astFile === void 0 ? void 0 : astFile.name) !== null && _b !== void 0 ? _b : '';
            console.log(chalk.yellowBright("  " + name_1));
            this.loggChildren(astFile === null || astFile === void 0 ? void 0 : astFile.astNode, "  ");
        }
    };
    /**
     * Logs the main elements of the children of the AstFolder's AstNode
     * @param astNode       // The AstNode of the AstFolder
     * @param indent        // The indentation of the current AstNode (in the log)
     */
    AstFolder.prototype.loggChildren = function (astNode, indent) {
        var _a;
        if (indent === void 0) { indent = ''; }
        for (var _i = 0, _b = astNode === null || astNode === void 0 ? void 0 : astNode.children; _i < _b.length; _i++) {
            var childAstNode = _b[_i];
            var name_2 = (_a = childAstNode === null || childAstNode === void 0 ? void 0 : childAstNode.name) !== null && _a !== void 0 ? _a : '';
            console.log(chalk.blueBright("" + indent + childAstNode.kind), name_2);
            this.loggChildren(childAstNode, indent + "  ");
        }
    };
    return AstFolder;
}());
exports.AstFolder = AstFolder;
_astFiles = new WeakMap(), _astFolderService = new WeakMap(), _children = new WeakMap(), _complexitiesByStatus = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _numberOfFiles = new WeakMap(), _numberOfMethods = new WeakMap(), _parent = new WeakMap(), _path = new WeakMap(), _relativePath = new WeakMap(), _stats = new WeakMap();
