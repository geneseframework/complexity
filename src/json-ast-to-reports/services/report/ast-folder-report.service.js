"use strict";
exports.__esModule = true;
exports.AstFolderReportService = void 0;
var fs = require("fs-extra");
var eol = require("eol");
var Handlebars = require("handlebars");
var file_service_1 = require("../../../core/services/file.service");
var ast_folder_model_1 = require("../../models/ast/ast-folder.model");
var ast_folder_service_1 = require("../ast/ast-folder.service");
var options_model_1 = require("../../../core/models/options.model");
/**
 * Service generating folders reports
 */
var AstFolderReportService = /** @class */ (function () {
    function AstFolderReportService(astFolder) {
        this.astFolder = undefined; // The AstFolder relative to this service
        this.astFolderService = new ast_folder_service_1.AstFolderService(); // The service relative to AstFolders
        this.filesArray = []; // The array of files reports
        this.foldersArray = []; // The array of subFolders reports
        this.isRootFolder = false; // True if the AstFolder relative to this service is the root folder of the analysis
        this.methodsArray = []; // The array of methods reports
        this.relativeRootReports = ''; // The route between the pos of the current TsFolder and the root of the analysis
        this.template = undefined; // The HandleBar template used to generate the report
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }
    /**
     * Generates the folder's report
     */
    AstFolderReportService.prototype.generateReport = function () {
        var parentFolder = new ast_folder_model_1.AstFolder();
        parentFolder.children.push(this.astFolder);
        this.relativeRootReports = file_service_1.getRouteToRoot(this.astFolder.relativePath);
        this.setFilesArray(this.astFolder);
        this.setFoldersArray(parentFolder);
        this.methodsArray = this.astFolderService.getMethodsArraySortedByDecreasingCognitiveCpx(parentFolder);
        this.setPartials();
        var reportTemplate = eol.auto(fs.readFileSync(options_model_1.Options.pathGeneseNodeJs + "/src/complexity/json-ast-to-reports/templates/handlebars/folder-report.handlebars", 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    };
    /**
     * Sets the array of subFolders with their analysis
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderReportService.prototype.setFoldersArray = function (astFolder) {
        if (file_service_1.getPathWithSlash(this.astFolder.path) !== file_service_1.getPathWithSlash(options_model_1.Options.pathFolderToAnalyze)) {
            this.foldersArray.push(this.getFolderReportRow(astFolder, true));
        }
        this.setSubFoldersArray(astFolder);
    };
    /**
     * Recursion setting the array of subFolders reports
     * @param astFolder        // The AstFolder to analyse
     * @param iSubFolder       // True if astFolder is a subFolder (used for recursivity)
     */
    AstFolderReportService.prototype.setSubFoldersArray = function (astFolder, isSubFolder) {
        if (isSubFolder === void 0) { isSubFolder = false; }
        for (var _i = 0, _a = astFolder.children; _i < _a.length; _i++) {
            var subFolder = _a[_i];
            if (subFolder.relativePath !== '') {
                this.foldersArray.push(this.getFolderReportRow(subFolder));
            }
            if (!isSubFolder) {
                this.setSubFoldersArray(subFolder, true);
            }
        }
    };
    /**
     * Gets the folder report row
     * @param subFolder         // The subFolder to parse
     * @param parentFolder      // Is the folder the root
     */
    AstFolderReportService.prototype.getFolderReportRow = function (subFolder, parentFolder) {
        var _a, _b, _c;
        if (parentFolder === void 0) { parentFolder = false; }
        if (parentFolder) {
            return {
                complexitiesByStatus: undefined,
                numberOfFiles: undefined,
                numberOfMethods: undefined,
                path: '../',
                routeFromCurrentFolder: '..'
            };
        }
        var routeFromCurrentFolderBase = this.astFolderService.getRouteFromFolderToSubFolder(this.astFolder, subFolder);
        return {
            complexitiesByStatus: (_a = subFolder.stats) === null || _a === void 0 ? void 0 : _a.numberOfMethodsByStatus,
            numberOfFiles: (_b = subFolder.stats) === null || _b === void 0 ? void 0 : _b.numberOfFiles,
            numberOfMethods: (_c = subFolder.stats) === null || _c === void 0 ? void 0 : _c.numberOfMethods,
            path: subFolder.relativePath,
            routeFromCurrentFolder: file_service_1.deleteLastSlash(routeFromCurrentFolderBase)
        };
    };
    /**
     * Sets the array of files with their analysis
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderReportService.prototype.setFilesArray = function (astFolder) {
        for (var _i = 0, _a = astFolder.astFiles; _i < _a.length; _i++) {
            var tsFile = _a[_i];
            this.setAstMethodReport(tsFile);
        }
        this.filesArray.sort(function (a, b) { return b.cpxIndex - a.cpxIndex; });
    };
    /**
     * Sets the astMethodReport
     * @param astFile       // The file to analyse
     */
    AstFolderReportService.prototype.setAstMethodReport = function (astFile) {
        for (var _i = 0, _a = astFile.astMethods; _i < _a.length; _i++) {
            var astMethod = _a[_i];
            this.filesArray.push({
                cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                cpxIndex: astMethod.cpxIndex,
                cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: astMethod.cyclomaticCpx,
                filename: astFile.name,
                linkFile: this.getFileLink(astFile),
                methodName: astMethod.name
            });
        }
    };
    /**
     * Returns the path to the report's page of a given AstFile
     * @param astFile
     */
    AstFolderReportService.prototype.getFileLink = function (astFile) {
        var _a;
        if (this.astFolder.relativePath === ((_a = astFile.astFolder) === null || _a === void 0 ? void 0 : _a.relativePath)) {
            return "./" + file_service_1.getFilenameWithoutExtension(astFile.name) + ".html";
        }
        var route = this.astFolderService.getRouteFromFolderToFile(this.astFolder, astFile);
        return file_service_1.deleteLastSlash(route) + "/" + file_service_1.getFilenameWithoutExtension(astFile.name) + ".html";
    };
    /**
     * Fills the HandleBar's template
     */
    AstFolderReportService.prototype.writeReport = function () {
        var template = this.template({
            colors: options_model_1.Options.colors,
            filesArray: this.filesArray,
            foldersArray: this.foldersArray,
            isRootFolder: this.isRootFolder,
            methodsArray: this.methodsArray,
            relativeRootReports: this.relativeRootReports,
            stats: this.astFolder.stats,
            thresholds: options_model_1.Options.getThresholds()
        });
        if (this.astFolder.relativePath) {
            file_service_1.createRelativeDir(this.astFolder.relativePath);
        }
        var pathOutDir = file_service_1.constructLink(options_model_1.Options.pathOutDir);
        var relativePath = file_service_1.constructLink(this.astFolder.relativePath);
        var pathReport = file_service_1.deleteLastSlash(pathOutDir) + "/" + file_service_1.deleteLastSlash(relativePath) + "/folder-report.html";
        try {
            fs.writeFileSync(pathReport, template, { encoding: "utf-8" });
        }
        catch (err) {
            console.log(err);
        }
    };
    /**
     * Sets the HandleBar's partials
     */
    AstFolderReportService.prototype.setPartials = function () {
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
    };
    /**
     * Registers a HandleBar's partial
     * @param partialName
     * @param filename
     */
    AstFolderReportService.prototype.registerPartial = function (partialName, filename) {
        var partial = eol.auto(fs.readFileSync(options_model_1.Options.pathGeneseNodeJs + "/src/complexity/json-ast-to-reports/templates/handlebars/" + filename + ".handlebars", 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    };
    return AstFolderReportService;
}());
exports.AstFolderReportService = AstFolderReportService;
