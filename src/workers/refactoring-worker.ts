import { Options } from '../core/models/options.model';
import { AutomaticRefactoring } from '../automatic-refactoring/automatic-refactoring';

const { parentPort, workerData } = require('worker_threads')


function run() {
    Options.setOptions(workerData.pathCommand, workerData.modifiedPath, workerData.pathGeneseNodeJs);
    AutomaticRefactoring.start(workerData.astFolder)
    parentPort.postMessage(undefined)
}

run()
