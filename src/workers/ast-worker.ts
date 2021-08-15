import { StartJsonAstCreationService } from '../json-ast-creation/start-json-ast-creation.service';
import { Options } from '../core/models/options.model';

const { workerData, parentPort } = require('worker_threads')

async function run() {
    Options.setOptions(workerData.pathCommand, workerData.modifiedPath, workerData.pathGeneseNodeJs, workerData.framework);
    StartJsonAstCreationService.start(Options.pathFolderToAnalyze, workerData.language)
    parentPort.postMessage('End of main process')
}

run()
