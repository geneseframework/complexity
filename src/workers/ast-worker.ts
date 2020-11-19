import { LanguageToJsonAst } from '../languages-to-json-ast/language-to-json-ast';
import { Options } from '../core/models/options.model';

const { parentPort, workerData } = require('worker_threads')


function run() {
    Options.setOptions(workerData.pathCommand, workerData.modifiedPath, workerData.pathGeneseNodeJs);
    LanguageToJsonAst.start(Options.pathFolderToAnalyze, workerData.language)
    parentPort.postMessage(undefined)
}

run()
