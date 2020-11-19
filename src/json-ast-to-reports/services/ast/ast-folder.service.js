"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AstFolderService = void 0;
var stats_service_1 = require("../report/stats.service");
var stats_model_1 = require("../../models/stats.model");
var complexity_type_enum_1 = require("../../enums/complexity-type.enum");
var barchart_service_1 = require("../report/barchart.service");
var file_service_1 = require("../../../core/services/file.service");
var os_enum_1 = require("../../enums/os.enum");
var ast_method_service_1 = require("./ast-method.service");
/**
 * - AstFolders generation from Abstract Syntax AstNode of a folder
 * - Other services for AstFolders
 */
var AstFolderService = /** @class */ (function (_super) {
    __extends(AstFolderService, _super);
    function AstFolderService() {
        var _this = _super.call(this) || this;
        _this._stats = undefined; // The statistics of the AstFolder
        _this.astFolder = undefined; // The AstFolder corresponding to this service
        _this.methodsArrayReport = [];
        return _this;
    }
    /**
     * Get the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderService.prototype.getMethodsArraySortedByDecreasingCognitiveCpx = function (astFolder) {
        this.setMethodsArrayReport(astFolder);
        return ast_method_service_1.AstMethodService.sortByDecreasingCognitiveCpx(this.methodsArrayReport);
    };
    /**
     * Calculates the statistics of the AstFolder
     * @param astFolder        // The AstFolder to analyse
     */
    AstFolderService.prototype.calculateStats = function (astFolder) {
        this._stats = new stats_model_1.Stats();
        this._stats.subject = astFolder.relativePath === '' ? astFolder.path : astFolder.relativePath;
        this._stats.numberOfFiles = astFolder.numberOfFiles;
        this._stats.numberOfMethods = astFolder.numberOfMethods;
        this._stats.totalCognitiveComplexity = astFolder.cpxFactors.total;
        this._stats.totalCyclomaticComplexity = astFolder.cyclomaticCpx;
        this.calculateAstFolderCpxByStatus(astFolder);
        this._stats.setPercentages();
        return this._stats;
    };
    /**
     * Recursion setting the array of methods reports of each subFolder
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderService.prototype.setMethodsArrayReport = function (astFolder) {
        for (var _i = 0, _a = astFolder.children; _i < _a.length; _i++) {
            var subFolder = _a[_i];
            this.setTsFileReport(subFolder);
            this.setMethodsArrayReport(subFolder);
        }
    };
    /**
     * Recursion setting the array of methods reports of each subFolder's files
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderService.prototype.setTsFileReport = function (astFolder) {
        for (var _i = 0, _a = astFolder.astFiles; _i < _a.length; _i++) {
            var tsFile = _a[_i];
            this.setAstMethodReport(tsFile);
        }
    };
    /**
     * Recursion setting the array of methods reports of each file's methods
     * @param astFile    // The AstFile to analyse
     */
    AstFolderService.prototype.setAstMethodReport = function (astFile) {
        for (var _i = 0, _a = astFile.astMethods; _i < _a.length; _i++) {
            var astMethod = _a[_i];
            this.methodsArrayReport.push({
                cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                cpxIndex: astMethod.cpxIndex,
                cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: astMethod.cyclomaticCpx,
                filename: astFile.name,
                linkFile: undefined,
                methodName: astMethod.name
            });
        }
    };
    /**
     * Calculates and sets to _stats the Complexities by Status of a given AstFolder
     * @param astFolder        // The AstFolder to analyse
     */
    AstFolderService.prototype.calculateAstFolderCpxByStatus = function (astFolder) {
        for (var _i = 0, _a = astFolder.astFiles; _i < _a.length; _i++) {
            var astFile = _a[_i];
            this.calculateAstFileCpxByStatus(astFile);
        }
        for (var _b = 0, _c = astFolder.children; _b < _c.length; _b++) {
            var childAstFolder = _c[_b];
            this.calculateAstFolderCpxByStatus(childAstFolder);
        }
    };
    /**
     * Increments AstFolder statistics for a given astFile
     * @param astFile       // The AstFile to analyse
     */
    AstFolderService.prototype.calculateAstFileCpxByStatus = function (astFile) {
        this.incrementMethodsByStatus(complexity_type_enum_1.ComplexityType.COGNITIVE, astFile.stats);
        this.incrementMethodsByStatus(complexity_type_enum_1.ComplexityType.CYCLOMATIC, astFile.stats);
        this._stats.barChartCognitive = barchart_service_1.BarchartService.concat(this._stats.barChartCognitive, astFile.stats.barChartCognitive);
        this._stats.barChartCyclomatic = barchart_service_1.BarchartService.concat(this._stats.barChartCyclomatic, astFile.stats.barChartCyclomatic);
    };
    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param type              // The complexity type
     * @param tsFileStats
     */
    AstFolderService.prototype.incrementMethodsByStatus = function (type, tsFileStats) {
        this._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
        this._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
        this._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    };
    /**
     * Sets the relative path of an AstFolder
     */
    AstFolderService.prototype.setNameOrPath = function (astFolder) {
        this._stats.subject = astFolder.relativePath;
    };
    /**
     * Returns the number of files of an astFolder and its subfolders
     * @param astFolder     // The astFolder to analyse
     */
    AstFolderService.prototype.getNumberOfFiles = function (astFolder) {
        if (!(astFolder === null || astFolder === void 0 ? void 0 : astFolder.astFiles)) {
            return 0;
        }
        var nbFiles = astFolder.astFiles.length;
        nbFiles += this.getChildrenFoldersNumberOfFiles(astFolder);
        return nbFiles;
    };
    /**
     * Returns the number of files of the subfolders of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    AstFolderService.prototype.getChildrenFoldersNumberOfFiles = function (astFolder) {
        var _a;
        var nbFiles = 0;
        for (var _i = 0, _b = astFolder.children; _i < _b.length; _i++) {
            var childAstFolder = _b[_i];
            nbFiles += (_a = childAstFolder.astFiles) === null || _a === void 0 ? void 0 : _a.length;
            nbFiles += this.getChildrenFoldersNumberOfFiles(childAstFolder);
        }
        return nbFiles;
    };
    /**
     * Returns the number of methods of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    AstFolderService.prototype.getNumberOfMethods = function (astFolder) {
        if (!(astFolder === null || astFolder === void 0 ? void 0 : astFolder.astFiles)) {
            return 0;
        }
        var nbMethods = this.getCurrentFolderNumberOfMethods(astFolder);
        nbMethods += this.getChildrenFoldersNumberOfMethods(astFolder);
        return nbMethods;
    };
    /**
     * Returns the number of methods of a given AstFolder without its subfolders
     * @param astFolder     // The astFolder to analyse
     */
    AstFolderService.prototype.getCurrentFolderNumberOfMethods = function (astFolder) {
        var _a, _b;
        var nbMethods = 0;
        for (var _i = 0, _c = astFolder.astFiles; _i < _c.length; _i++) {
            var astFile = _c[_i];
            nbMethods += (_b = (_a = astFile.astMethods) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        }
        return nbMethods;
    };
    /**
     * Returns the number of methods of the subfolders of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    AstFolderService.prototype.getChildrenFoldersNumberOfMethods = function (astFolder) {
        var nbMethods = 0;
        for (var _i = 0, _a = astFolder.children; _i < _a.length; _i++) {
            var childAstFolder = _a[_i];
            nbMethods += this.getCurrentFolderNumberOfMethods(childAstFolder);
            nbMethods += this.getChildrenFoldersNumberOfMethods(childAstFolder);
        }
        return nbMethods;
    };
    /**
     * Returns the route from the root ancestor to the folder of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    AstFolderService.prototype.getRelativePath = function (astFolder) {
        var _a;
        return (_a = astFolder === null || astFolder === void 0 ? void 0 : astFolder.path) === null || _a === void 0 ? void 0 : _a.slice(this.getRootPath(astFolder).length);
    };
    /**
     * Returns the ancestor of all the astFolders
     * @param astFolder     // The astFolder to analyse
     */
    AstFolderService.prototype.getAstFolderRoot = function (astFolder) {
        if (!(astFolder === null || astFolder === void 0 ? void 0 : astFolder.parent)) {
            return astFolder;
        }
        return this.getAstFolderRoot(astFolder.parent);
    };
    /**
     * Returns the path of the ancestor of all the astFolders
     * @param astFolder     // The astFolder to analyse
     */
    AstFolderService.prototype.getRootPath = function (astFolder) {
        var _a;
        return (_a = this.getAstFolderRoot(astFolder)) === null || _a === void 0 ? void 0 : _a.path;
    };
    /**
     * Returns the path between a AstFolder's path and a AstFile's path which is inside it or inside one of its subfolders
     * @param astFolder      // The path of the AstFolder
     * @param astFile        // The path of the AstFile
     */
    AstFolderService.prototype.getRouteFromFolderToFile = function (astFolder, astFile) {
        if ((astFile === null || astFile === void 0 ? void 0 : astFile.astFolder.path.slice(0, astFolder === null || astFolder === void 0 ? void 0 : astFolder.path.length)) === (astFolder === null || astFolder === void 0 ? void 0 : astFolder.path)) {
            var linkStarter = this.getLinkStarter(astFolder);
            return "" + linkStarter + astFile.astFolder.path.slice(astFolder.path.length);
        }
        else {
            console.log("The file " + astFile.name + " is not inside the folder " + astFolder.path);
            return undefined;
        }
    };
    /**
     * Get the starter link
     * @param astFolder         // The concerned astFolder
     */
    AstFolderService.prototype.getLinkStarter = function (astFolder) {
        return file_service_1.getOS() !== os_enum_1.OS.WINDOWS ? (astFolder === null || astFolder === void 0 ? void 0 : astFolder.relativePath) === "" ? "./" : "." : (astFolder === null || astFolder === void 0 ? void 0 : astFolder.relativePath) === "" ? "./" : "";
    };
    /**
     * Returns the route from the folder of a AstFolder to one of its subfolders
     * @param astFolder
     * @param astSubfolder
     */
    AstFolderService.prototype.getRouteFromFolderToSubFolder = function (astFolder, astSubfolder) {
        if (!astFolder || !astSubfolder || astSubfolder.path === astFolder.path) {
            return undefined;
        }
        if (astSubfolder.path.slice(0, astFolder.path.length) !== astFolder.path) {
            console.log("The folder " + astSubfolder.path + " is not a subfolder of " + astFolder.path);
            return undefined;
        }
        else {
            var linkStarter = this.getLinkStarter(astFolder);
            var finalLink = "" + linkStarter + this.linkSlicer(astSubfolder.path, astFolder.path);
            return finalLink;
        }
    };
    /**
     * Return if slash exists on string
     * @param text          // Text to analyse
     * @param parentText    // Parent text to analyse
     */
    AstFolderService.prototype.isSlashExist = function (text, parentText) {
        return file_service_1.constructLink(text[parentText.length + 1]) === file_service_1.constructLink("/");
    };
    /**
     * Return string section separate by a slash from a string
     * @param text          // Text to analyse
     * @param parentText    // Parent text to analyse
     */
    AstFolderService.prototype.linkSlicer = function (text, parentText) {
        return this.isSlashExist(text, parentText)
            ? text.slice(parentText.length + 1)
            : text.slice(parentText.length);
    };
    return AstFolderService;
}(stats_service_1.StatsService));
exports.AstFolderService = AstFolderService;
