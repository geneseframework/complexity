import { LanguageToJsonAst } from '../languages-to-json-ast/language-to-json-ast';
import { Options } from '../core/models/options.model';

const { workerData, parentPort } = require('worker_threads')

async function run() {
    Options.setOptions(workerData.pathCommand, workerData.modifiedPath, workerData.pathGeneseNodeJs);
    LanguageToJsonAst.start(Options.pathFolderToAnalyze, workerData.language)
    parentPort.postMessage('End of main process')
}

run()
