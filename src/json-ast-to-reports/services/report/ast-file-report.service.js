"use strict";
exports.__esModule = true;
exports.AstFileReportService = void 0;
var fs = require("fs-extra");
var eol = require("eol");
var Handlebars = require("handlebars");
var file_service_1 = require("../../../core/services/file.service");
var options_model_1 = require("../../../core/models/options.model");
/**
 * Service generating files reports
 */
var AstFileReportService = /** @class */ (function () {
    function AstFileReportService(astFile) {
        this.methodReports = []; // The array of method reports
        this.relativeRootReports = ''; // The route between the pos of the current TsFile and the root of the analysis
        this.astFile = undefined; // The AstFile relative to this service
        this.astFile = astFile;
    }
    /**
     * Returns the array of methods with their analysis
     */
    AstFileReportService.prototype.getMethodsArray = function () {
        var _a;
        var report = [];
        for (var _i = 0, _b = this.astFile.astMethods; _i < _b.length; _i++) {
            var method = _b[_i];
            var methodReport = {
                code: (_a = method.displayedCode) === null || _a === void 0 ? void 0 : _a.text,
                cognitiveColor: method.cognitiveStatus.toLowerCase(),
                cpxIndex: method.cpxIndex,
                cyclomaticColor: method.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: method.cyclomaticCpx,
                methodName: method.name
            };
            report.push(methodReport);
        }
        return report;
    };
    /**
     * Generates the file's report
     */
    AstFileReportService.prototype.generateReport = function () {
        var _a;
        this.methodReports = this.getMethodsArray();
        this.relativeRootReports = file_service_1.getRouteToRoot((_a = this.astFile.astFolder) === null || _a === void 0 ? void 0 : _a.relativePath);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("method", 'methods');
        var reportTemplate = eol.auto(fs.readFileSync(options_model_1.Options.pathGeneseNodeJs + "/json-ast-to-reports/templates/handlebars/file-report.handlebars", 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    };
    /**
     * Creates the file of the report
     */
    AstFileReportService.prototype.writeReport = function () {
        var _a;
        var template = this.template({
            colors: options_model_1.Options.colors,
            methods: this.methodReports,
            relativeRootReports: file_service_1.getPathWithDotSlash(this.relativeRootReports),
            stats: this.astFile.stats,
            thresholds: options_model_1.Options.getThresholds()
        });
        var filenameWithoutExtension = file_service_1.getFilenameWithoutExtension(this.astFile.name);
        var RELATIVE_PATH = file_service_1.constructLink((_a = this.astFile.astFolder) === null || _a === void 0 ? void 0 : _a.relativePath);
        var OUT_DIR = file_service_1.constructLink(options_model_1.Options.pathOutDir);
        var pathReport = file_service_1.deleteLastSlash(OUT_DIR) + "/" + file_service_1.deleteLastSlash(RELATIVE_PATH) + "/" + filenameWithoutExtension + ".html";
        fs.writeFileSync(pathReport, template, { encoding: 'utf-8' });
    };
    /**
     * Registers a HandleBar's partial for a given partial's name and a given filename
     * @param partialName   // The name of the partial
     * @param filename      // The name of the file
     */
    AstFileReportService.prototype.registerPartial = function (partialName, filename) {
        var partial = eol.auto(fs.readFileSync(options_model_1.Options.pathGeneseNodeJs + "/json-ast-to-reports/templates/handlebars/" + filename + ".handlebars", 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    };
    return AstFileReportService;
}());
exports.AstFileReportService = AstFileReportService;
