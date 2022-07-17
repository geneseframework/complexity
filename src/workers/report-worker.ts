import { JsonAstToReports } from '../json-ast-to-reports/json-ast-to-reports';
import { Options } from '../core/models/options.model';

const { parentPort, workerData } = require('worker_threads')


function run() {
    Options.setOptions(workerData.pathCommand, workerData.modifiedPath, workerData.pathGeneseNodeJs, workerData.framework);
    const result = JsonAstToReports.start(Options.pathCommand, workerData.markdown, workerData.consoleMode, undefined)
    parentPort.postMessage({message: result, astFolder: JsonAstToReports.astFolder})
}

run()
