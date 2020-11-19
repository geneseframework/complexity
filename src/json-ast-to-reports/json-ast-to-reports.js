"use strict";
exports.__esModule = true;
exports.JsonAstToReports = void 0;
var init_service_1 = require("./services/init.service");
var reports_service_1 = require("./services/report/reports.service");
var chalk = require("chalk");
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
     */
    JsonAstToReports.start = function (pathCommand, jsonAstPath, markdown) {
        if (jsonAstPath === void 0) { jsonAstPath = '/json-ast.json'; }
        if (markdown === void 0) { markdown = false; }
        console.log(chalk.blueBright('STARTS REPORTS GENERATION FROM JSON_AST'));
        console.log('Please wait...');
        var jsonAst = new init_service_1.InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        if (markdown) {
            reports_service_1.ReportsService.generateMarkdownReports(jsonAst);
        }
        else {
            reports_service_1.ReportsService.generateAllReports(jsonAst);
        }
        console.log(chalk.greenBright('REPORTS GENERATED SUCCESSFULLY'));
        console.log('Please open in your browser the file "folder-report.html" located in your genese reports folder.');
        this.astFolder = jsonAst.astFolder;
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
