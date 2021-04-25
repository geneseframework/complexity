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
        this.foldersArray = []; // The array of subfolders reports
        this.isRootFolder = false; // True if the AstFolder relative to this service is the root folder of the analysis
        this.methodsArray = []; // The array of methods reports
        this.relativeRootReports = ''; // The route between the pos of the current TsFolder and the root of the analysis
        this.template = undefined; // The HandleBar template used to generate the report
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }
    /**
     * Returns the array of subfolders with their analysis
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderReportService.prototype.getFoldersArray = function (astFolder) {
        var report = [];
        if (file_service_1.getPathWithSlash(this.astFolder.path) !== file_service_1.getPathWithSlash(options_model_1.Options.pathFolderToAnalyze)) {
            report.push(this.addRowBackToParentFolder());
        }
        return report.concat(this.getSubfoldersArray(astFolder));
    };
    /**
     * Recursion returning the array of subfolders reports
     * @param astFolder        // The AstFolder to analyse
     * @param isSubfolder       // True if astFolder is a subfolder (used for recursivity)
     */
    AstFolderReportService.prototype.getSubfoldersArray = function (astFolder, isSubfolder) {
        var _a, _b, _c;
        if (isSubfolder === void 0) { isSubfolder = false; }
        var report = [];
        for (var _i = 0, _d = astFolder.children; _i < _d.length; _i++) {
            var subfolder = _d[_i];
            if (subfolder.relativePath !== '') {
                var routeFromCurrentFolderBase = this.astFolderService.getRouteFromFolderToSubFolder(this.astFolder, subfolder);
                var subfolderReport = {
                    complexitiesByStatus: (_a = subfolder.stats) === null || _a === void 0 ? void 0 : _a.numberOfMethodsByStatus,
                    numberOfFiles: (_b = subfolder.stats) === null || _b === void 0 ? void 0 : _b.numberOfFiles,
                    numberOfMethods: (_c = subfolder.stats) === null || _c === void 0 ? void 0 : _c.numberOfMethods,
                    path: subfolder.relativePath,
                    routeFromCurrentFolder: file_service_1.deleteLastSlash(routeFromCurrentFolderBase)
                };
                report.push(subfolderReport);
            }
            if (!isSubfolder) {
                report = report.concat(this.getSubfoldersArray(subfolder, true));
            }
        }
        return report;
    };
    /**
     * Adds a backLink to the parent folder
     */
    AstFolderReportService.prototype.addRowBackToParentFolder = function () {
        return {
            complexitiesByStatus: undefined,
            numberOfFiles: undefined,
            numberOfMethods: undefined,
            path: '../',
            routeFromCurrentFolder: '..'
        };
    };
    /**
     * Returns the array of files with their analysis
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderReportService.prototype.getFilesArray = function (astFolder) {
        var report = [];
        for (var _i = 0, _a = astFolder.astFiles; _i < _a.length; _i++) {
            var tsFile = _a[_i];
            for (var _b = 0, _c = tsFile.astMethods; _b < _c.length; _b++) {
                var astMethod = _c[_b];
                report.push({
                    cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                    cpxIndex: astMethod.cpxIndex,
                    cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                    cyclomaticValue: astMethod.cyclomaticCpx,
                    filename: tsFile.name,
                    linkFile: this.getFileLink(tsFile),
                    methodName: astMethod.name
                });
            }
        }
        return report.sort(function (a, b) { return b.cpxIndex - a.cpxIndex; });
    };
    /**
     * Returns the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderReportService.prototype.getMethodsArraySortedByDecreasingCognitiveCpx = function (astFolder) {
        var report = this.getMethodsArray(astFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    };
    /**
     * Recursion returning the array of methods reports of each subfolder
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderReportService.prototype.getMethodsArray = function (astFolder) {
        var report = [];
        for (var _i = 0, _a = astFolder.children; _i < _a.length; _i++) {
            var subfolder = _a[_i];
            for (var _b = 0, _c = subfolder.astFiles; _b < _c.length; _b++) {
                var tsFile = _c[_b];
                for (var _d = 0, _e = tsFile.astMethods; _d < _e.length; _d++) {
                    var astMethod = _e[_d];
                    report.push({
                        cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                        cpxIndex: astMethod.cpxIndex,
                        cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                        cyclomaticValue: astMethod.cyclomaticCpx,
                        filename: tsFile.name,
                        linkFile: this.getFileLink(tsFile),
                        methodName: astMethod.name
                    });
                }
            }
            report = report.concat(this.getMethodsArray(subfolder));
        }
        return report;
    };
    /**
     * The method sorting the rows of the methods report by decreasing cognitive complexity
     * @param methodsReport     // The array to sort
     */
    AstFolderReportService.prototype.sortByDecreasingCognitiveCpx = function (methodsReport) {
        return methodsReport.sort(function (a, b) { return b.cpxIndex - a.cpxIndex; });
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
     * Generates the folder's report
     */
    AstFolderReportService.prototype.generateReport = function () {
        var parentFolder = new ast_folder_model_1.AstFolder();
        parentFolder.children.push(this.astFolder);
        this.relativeRootReports = file_service_1.getRouteToRoot(this.astFolder.relativePath);
        this.filesArray = this.getFilesArray(this.astFolder);
        this.foldersArray = this.getFoldersArray(parentFolder);
        this.methodsArray = this.getMethodsArraySortedByDecreasingCognitiveCpx(parentFolder);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
        var reportTemplate = eol.auto(fs.readFileSync(options_model_1.Options.pathGeneseNodeJs + "/json-ast-to-reports/templates/handlebars/folder-report.handlebars", 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
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
     * Registers a HandleBar's partial
     * @param partialName
     * @param filename
     */
    AstFolderReportService.prototype.registerPartial = function (partialName, filename) {
        var partial = eol.auto(fs.readFileSync(options_model_1.Options.pathGeneseNodeJs + "/json-ast-to-reports/templates/handlebars/" + filename + ".handlebars", 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    };
    return AstFolderReportService;
}());
exports.AstFolderReportService = AstFolderReportService;
