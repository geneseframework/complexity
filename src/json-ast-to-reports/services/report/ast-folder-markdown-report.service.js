"use strict";
exports.__esModule = true;
exports.AstFolderMarkdownReportService = void 0;
var fs = require("fs-extra");
var eol = require("eol");
var Handlebars = require("handlebars");
var file_service_1 = require("../../../core/services/file.service");
var ast_folder_service_1 = require("../ast/ast-folder.service");
var options_model_1 = require("../../../core/models/options.model");
/**
 * Service generating folders reports
 */
var AstFolderMarkdownReportService = /** @class */ (function () {
    function AstFolderMarkdownReportService(astFolder) {
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
    AstFolderMarkdownReportService.prototype.generateReport = function () {
        this.methodsArrayReport = this.astFolderService.getMethodsArraySortedByDecreasingCognitiveCpx(this.astFolder);
        var reportTemplate = eol.auto(fs.readFileSync(options_model_1.Options.pathGeneseNodeJs + "/src/complexity/json-ast-to-reports/templates/handlebars/folder-markdown-report.handlebars", 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    };
    /**
     * Fills the HandleBar's template
     */
    AstFolderMarkdownReportService.prototype.writeReport = function () {
        var template = this.template({
            rowFile: this.methodsArrayReport
        });
        if (this.astFolder.relativePath) {
            file_service_1.createRelativeDir(this.astFolder.relativePath);
        }
        var pathOutDir = file_service_1.constructLink(options_model_1.Options.pathOutDir);
        var relativePath = file_service_1.constructLink(this.astFolder.relativePath);
        var pathReport = file_service_1.deleteLastSlash(pathOutDir) + "/" + file_service_1.deleteLastSlash(relativePath) + "/folder-report.md";
        try {
            fs.writeFileSync(pathReport, template, { encoding: "utf-8" });
        }
        catch (err) {
            console.log(err);
        }
    };
    return AstFolderMarkdownReportService;
}());
exports.AstFolderMarkdownReportService = AstFolderMarkdownReportService;
