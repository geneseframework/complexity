"use strict";
exports.__esModule = true;
exports.ReportsService = void 0;
var file_service_1 = require("../../../core/services/file.service");
var ast_folder_report_service_1 = require("./ast-folder-report.service");
var ast_file_report_service_1 = require("./ast-file-report.service");
var options_model_1 = require("../../../core/models/options.model");
var ast_folder_markdown_report_service_1 = require("./ast-folder-markdown-report.service");
/**
 * Service for reports generation
 */
var ReportsService = /** @class */ (function () {
    function ReportsService() {
    }
    /**
     * LanguageToJsonAst reports generation process
     * @param jsonAst
     */
    ReportsService.generateAllReports = function (jsonAst) {
        ReportsService.createStyleFiles();
        var parentFolder = jsonAst.astFolder;
        ReportsService.generateSubfoldersReports(parentFolder);
    };
    /**
     * LanguageToJsonAst markdown reports generation process
     * @param jsonAst
     */
    ReportsService.generateMarkdownReports = function (jsonAst) {
        var parentFolder = jsonAst.astFolder;
        var folderMakdownReport = new ast_folder_markdown_report_service_1.AstFolderMarkdownReportService(parentFolder);
        folderMakdownReport.generateReport();
    };
    /**
     * Generates reports of children recursively
     * @param astFolder        // The AstFolder to analyse
     */
    ReportsService.generateSubfoldersReports = function (astFolder) {
        ReportsService.generateFolderReport(astFolder);
        for (var _i = 0, _a = astFolder.children; _i < _a.length; _i++) {
            var subFolder = _a[_i];
            ReportsService.generateSubfoldersReports(subFolder);
        }
    };
    /**
     * Generates a report for a given folder
     * @param astFolder        // The AstFolder to analyse
     */
    ReportsService.generateFolderReport = function (astFolder) {
        var folderReportService = new ast_folder_report_service_1.AstFolderReportService(astFolder);
        folderReportService.generateReport();
        for (var _i = 0, _a = astFolder.astFiles; _i < _a.length; _i++) {
            var file = _a[_i];
            ReportsService.generateFileReport(file);
        }
    };
    /**
     * Generates a report for a given file
     * @param astFile        // The AstFile to analyse
     */
    ReportsService.generateFileReport = function (astFile) {
        var fileReportService = new ast_file_report_service_1.AstFileReportService(astFile);
        fileReportService.generateReport();
    };
    /**
     * Copy the css files, prism.js and chart.js to a subfolder of the outDir
     */
    ReportsService.createStyleFiles = function () {
        file_service_1.createRelativeDir('reports-styles');
        file_service_1.copyFile(options_model_1.Options.pathGeneseNodeJs + "/src/complexity/json-ast-to-reports/templates/styles/report.css", options_model_1.Options.pathOutDir + "/reports-styles/report.css");
        file_service_1.copyFile(options_model_1.Options.pathGeneseNodeJs + "/src/complexity/json-ast-to-reports/templates/styles/styles.css", options_model_1.Options.pathOutDir + "/reports-styles/styles.css");
        file_service_1.copyFile(options_model_1.Options.pathGeneseNodeJs + "/src/complexity/json-ast-to-reports/templates/styles/prettify.css", options_model_1.Options.pathOutDir + "/reports-styles/prettify.css");
        file_service_1.copyFile(options_model_1.Options.pathGeneseNodeJs + "/src/complexity/json-ast-to-reports/templates/styles/prism.css", options_model_1.Options.pathOutDir + "/reports-styles/prism.css");
        file_service_1.copyFile(options_model_1.Options.pathGeneseNodeJs + "/src/complexity/json-ast-to-reports/templates/styles/prism.js", options_model_1.Options.pathOutDir + "/reports-styles/prism.js");
        file_service_1.copyFile(options_model_1.Options.pathGeneseNodeJs + "/src/complexity/core/chartjs/Chart.js", options_model_1.Options.pathOutDir + "/reports-styles/Chart.js");
    };
    return ReportsService;
}());
exports.ReportsService = ReportsService;
