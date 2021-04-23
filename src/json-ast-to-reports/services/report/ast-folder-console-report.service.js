"use strict";
exports.__esModule = true;
exports.AstFolderConsoleReportService = void 0;
var ast_folder_service_1 = require("../ast/ast-folder.service");
var options_model_1 = require("../../../core/models/options.model");
var ast_method_service_1 = require("../ast/ast-method.service");
/**
 * Service generating folders reports
 */
var AstFolderConsoleReportService = /** @class */ (function () {
    function AstFolderConsoleReportService(astFolder) {
        this.astFolder = undefined; // The AstFolder relative to this service
        this.astFolderService = new ast_folder_service_1.AstFolderService(); // The service relative to AstFolders
        this.methodsArrayReport = []; // The array of methods reports
        this.template = undefined; // The HandleBar template used to generate the report
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }
    /**
     * Generates the folder's report
     */
    AstFolderConsoleReportService.prototype.generateReport = function () {
        this.setMethodsArraySortedByDecreasingCognitiveCpx(this.astFolder);
        return this.methodsArrayReport;
        // this.writeReport();
    };
    /**
     * Set the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderConsoleReportService.prototype.setMethodsArraySortedByDecreasingCognitiveCpx = function (astFolder) {
        this.setTsFileReport(astFolder);
        this.setMethodsArrayReport(astFolder);
        this.methodsArrayReport = ast_method_service_1.AstMethodService.sortByDecreasingCognitiveCpx(this.methodsArrayReport);
        this.methodsArrayReport = this.methodsArrayReport.filter(function (e) { return e.cpxIndex >= options_model_1.Options.getThresholds().cognitive.warning; });
    };
    /**
     * Recursion setting the array of methods reports of each subFolder
     * @param astFolder    // The AstFolder to analyse
     */
    AstFolderConsoleReportService.prototype.setMethodsArrayReport = function (astFolder) {
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
    AstFolderConsoleReportService.prototype.setTsFileReport = function (astFolder) {
        for (var _i = 0, _a = astFolder.astFiles; _i < _a.length; _i++) {
            var tsFile = _a[_i];
            this.setAstMethodReport(tsFile);
        }
    };
    /**
     * Recursion setting the array of methods reports of each file's methods
     * @param astFile    // The AstFile to analyse
     */
    AstFolderConsoleReportService.prototype.setAstMethodReport = function (astFile) {
        for (var _i = 0, _a = astFile.astMethods; _i < _a.length; _i++) {
            var astMethod = _a[_i];
            this.methodsArrayReport.push({
                cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                cpxIndex: astMethod.cpxIndex,
                cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: astMethod.cyclomaticCpx,
                filename: "file://" + astFile.astFolder.path + "/" + astFile.name,
                linkFile: astFile.astFolder.path + "/" + astFile.name,
                methodName: astMethod.name
            });
        }
    };
    /**
     * Fills the HandleBar's template
     */
    AstFolderConsoleReportService.prototype.writeReport = function () {
        console.table(this.methodsArrayReport, ['file', 'methodName', 'cpxIndex']);
    };
    return AstFolderConsoleReportService;
}());
exports.AstFolderConsoleReportService = AstFolderConsoleReportService;
