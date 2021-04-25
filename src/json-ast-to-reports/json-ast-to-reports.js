"use strict";
exports.__esModule = true;
exports.JsonAstToReports = void 0;
var init_service_1 = require("./services/init.service");
var reports_service_1 = require("./services/report/reports.service");
var terminalLink = require("terminal-link");
/**
 * Main process jsonAst analysis and reports
 */
var JsonAstToReports = /** @class */ (function () {
    function JsonAstToReports() {
    }
    /**
     * Starts the analysis
     * @param pathCommand
     * @param jsonAstPath
     * @param markdown
     * @param consoleMode
     */
    JsonAstToReports.start = function (pathCommand, jsonAstPath, markdown, consoleMode) {
        if (jsonAstPath === void 0) { jsonAstPath = '/json-ast.json'; }
        var result = undefined;
        var jsonAst = new init_service_1.InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        if (markdown) {
            reports_service_1.ReportsService.generateMarkdownReports(jsonAst);
        }
        else if (consoleMode) {
            result = reports_service_1.ReportsService.generateConsoleReports(jsonAst);
        }
        else {
            reports_service_1.ReportsService.generateAllReports(jsonAst);
            var link = terminalLink('folder-report.html', "file://" + pathCommand + "/genese/complexity/reports/folder-report.html");
            result = "Please open in your browser the file " + link + " located in your genese reports folder.";
        }
        this.astFolder = jsonAst.astFolder;
        return result;
    };
    /**
     * Get the complexity value of the given JsonAst
     * @param jsonAst
     * @returns {number}
     */
    JsonAstToReports.getTotalCpx = function (jsonAst) {
        var json = new init_service_1.InitService().generateAllFromJsonAst(jsonAst);
        json.astFolder.evaluateStandalone();
        return json.astFolder.stats.totalCognitiveComplexity;
    };
    /**
     * Returns the content of the JsonAst file
     * @param jsonAstPath
     */
    JsonAstToReports.getJsonAst = function (jsonAstPath) {
        return require(jsonAstPath);
    };
    return JsonAstToReports;
}());
exports.JsonAstToReports = JsonAstToReports;
