"use strict";
exports.__esModule = true;
exports.AstFolder = void 0;
var complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
var cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
var ast_folder_service_1 = require("../../services/ast/ast-folder.service");
var chalk = require("chalk");
var AstFolder = /** @class */ (function () {
    function AstFolder() {
        this._astFiles = []; // The array of files of this folder (not in the subfolders)
        this._astFolderService = new ast_folder_service_1.AstFolderService(); // The service managing AstFolders
        this._children = []; // The subfolders of this folder
        this._complexitiesByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus(); // The folder complexities spread by complexity status
        this._cpxFactors = undefined; // The complexity factors of the AstFolder
        this._cyclomaticCpx = 0; // The cyclomatic complexity of the AstFolder
        this._numberOfFiles = undefined; // The number of files of the AstFolder
        this._numberOfMethods = undefined; // The number of methods of the AstFolder
        this._parent = undefined; // The AstFolder corresponding to the parent folder of this AstFolder
        this._path = undefined; // The absolute path of this folder
        this._relativePath = undefined; // The relative path of this folder compared to the root folder of the analyse
        this._stats = undefined; // The stats corresponding to this folder
    }
    Object.defineProperty(AstFolder.prototype, "astFiles", {
        // ---------------------------------------------------------------------------------
        //                                Getters and setters
        // ---------------------------------------------------------------------------------
        get: function () {
            return this._astFiles;
        },
        set: function (astFiles) {
            this._astFiles = astFiles;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "children", {
        get: function () {
            return this._children;
        },
        set: function (children) {
            this._children = children;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "complexitiesByStatus", {
        get: function () {
            return this._complexitiesByStatus;
        },
        set: function (complexitiesByStatus) {
            this._complexitiesByStatus = complexitiesByStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "cpxFactors", {
        get: function () {
            if (this._cpxFactors) {
                return this._cpxFactors;
            }
            this.evaluate();
            return this._cpxFactors;
        },
        set: function (cpxFactors) {
            this._cpxFactors = cpxFactors;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "cyclomaticCpx", {
        get: function () {
            return this._cyclomaticCpx;
        },
        set: function (cyclomaticCpx) {
            this._cyclomaticCpx = cyclomaticCpx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "numberOfFiles", {
        get: function () {
            var _a;
            return (_a = this._numberOfFiles) !== null && _a !== void 0 ? _a : this._astFolderService.getNumberOfFiles(this);
        },
        set: function (numberOfFiles) {
            this._numberOfFiles = numberOfFiles;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "numberOfMethods", {
        get: function () {
            var _a;
            return (_a = this._numberOfMethods) !== null && _a !== void 0 ? _a : this._astFolderService.getNumberOfMethods(this);
        },
        set: function (numberOfMethods) {
            this._numberOfMethods = numberOfMethods;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (parent) {
            this._parent = parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (path) {
            this._path = path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "relativePath", {
        get: function () {
            var _a;
            return (_a = this._relativePath) !== null && _a !== void 0 ? _a : this._astFolderService.getRelativePath(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AstFolder.prototype, "stats", {
        get: function () {
            return this._stats;
        },
        set: function (stats) {
            this._stats = stats;
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
        this.numberOfMethods = this._astFolderService.getNumberOfMethods(this);
        this.stats = this._astFolderService.calculateStats(this);
    };
    /**
     * Evaluates and sets the complexities of the AstFiles of this AstFolder
     * But not based on methods
     */
    AstFolder.prototype.evaluateStandalone = function () {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        var astFile = this.astFiles[0];
        astFile.evaluateStandalone();
        this.addCpx(astFile);
        this.numberOfMethods = 0;
        this.stats = this._astFolderService.calculateStats(this);
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
