"use strict";
exports.__esModule = true;
var json_ast_to_reports_1 = require("../json-ast-to-reports/json-ast-to-reports");
var options_model_1 = require("../core/models/options.model");
var _a = require('worker_threads'), parentPort = _a.parentPort, workerData = _a.workerData;
function run() {
    options_model_1.Options.setOptions(workerData.pathCommand, workerData.modifiedPath, workerData.pathGeneseNodeJs);
    var result = json_ast_to_reports_1.JsonAstToReports.start(options_model_1.Options.pathCommand, undefined, workerData.markdown, workerData.consoleMode);
    parentPort.postMessage({ message: result, astFolder: json_ast_to_reports_1.JsonAstToReports.astFolder });
}
run();
